'use strict';

//import "/@progress/kendo-ui/js/kendo.grid";
//import { Grid, GridInstaller } from '@progress/kendo-grid-vue-wrapper';

//import "./test";

//const {GridInstaller} = require("@progress/kendo-grid-vue-wrapper");

//Vue.use(GridInstaller);

Vue.component('register', {
    props: {
        regId: Number,
        regValue: Number,
    },
    template: `<div class="register">
            <div class="container">
                <div class="regHeading row justify-content-center">
                    {{ regId }}
                </div>
                <div class="regContent row justify-content-center">
                    <h2>{{ value }}</h2>
                </div>
                <div class="regFooter row">
                    <div class="col btn-group btn-group-sm" role="group">
                        <button type="button" class="btn btn-outline-primary"
                            @click="decReg"
                            >-</button>
                        <button type="button" class="btn btn-outline-primary"
                            @click="incReg"
                            >+</button>
                    </div>
                </div>
            </div>
        </div>`,
    data: function() {
        return {
            value: this.regValue
        }
    },
    methods: {
        decReg: function () {
            this.value ? this.value-- : 0;
        },
        incReg: function () {
            this.value++;
        }
    },
    watch: {
        value: function() {this.$emit("update:reg-value", this.value)},
        regValue: function() {this.value = this.regValue;}
    }
});

Vue.component('program', {
    props: {
        program: Array,
        fields: Array,
        currentStepId: Number
    },
    template : `<table class="table" id="tabProgram">
                <thead>
                <tr>
                    <th scope="col">Step</th>
                    <th scope="col">Instruction</th>
                    <th scope="col">Register</th>
                    <th scope="col">Go to</th>
                    <th scope="col">Branch to</th>
                    <!--<th scope="col"></th>-->
                </tr>
                </thead>
                <tbody>
                    <step v-for="(step, ind) in program"
                          :prog-step="step"
                          :edit-mode="false"
                          :curr-step-id="currentStepId"
                          :key="ind"
                          :fields="fields"
                          >
                    </step>
                </tbody>
            </table>`,
    methods: {

    },
    created: function() {

    }

});


Vue.component('program-grid', {
    props: {
        program: Array,
        fields: Array
    },
    template: `<kendo-grid :data-source="program" :fields="fields">
            </kendo-grid>`
});

Vue.component('step', {
    props: {
        progStep: Object,
        currStepId: Number,
        fields: Array
    },
    template: `<tr v-bind:class="{ currStep: step.id === currStepId}">
                <td scope="row">
                    {{ step.id }} <a v-if="step.editable" href="#"
                        class="badge badge-primary"
                        @click="toggleEdit">Edit</a>
                </td>
                <dropdown v-for="(field, ind) in fields"
                    :key="ind"
                    :editMode="step.editMode"
                    :field="field.field"
                    :value="step[field.field]"
                    :options="field.options"
                ></dropdown>
            </tr>`,
    data: function() {
        return {
            step: this.progStep
        }
    },
    methods: {
        toggleEdit: function() {
            //this.editMode = !this.editMode;
            this.$emit("toggle-edit");
        }
    }
});

Vue.component('dropdown', {
    props: {
        editMode: Boolean,
        field: String,
        value: Number | String,
        options: Array
    },
    template: `<td>
                    <span v-if="editMode">
                        <select class="form-control">
                            <option v-for="(opt, ind) in options"
                                    :key="ind">
                                    {{ opt }}
                            </option>
                        </select>
                    </span>
                    <span v-else>{{value}}</span>
                </td>`,
    methods: {

    }
});

var app = new Vue({
    el: '#app',
    data: {
        program: [{id: 1, instruction: "deb", register: 1, goTo: 2, branchTo: 3, editable: false, editMode: false},
            {id: 2, instruction: "inc", register: 2, goTo: 1, branchTo: null, editable: true, editMode: false},
            {id: 3, instruction: "end", register: null, goTo: null, branchTo: null, editable: false, editMode: false},],
        registers: [{id: 1, value: 0},
            {id: 2, value: 1},
            {id: 3, value: 2},
            {id: 4, value: 3},
            {id: 5, value: 4},
            {id: 6, value: 5},
            {id: 7, value: 6},
            {id: 8, value: 7}],
        instructions: [{instruction: "inc", description: "Increment register", fields: ["register", "goTo"]},
            {instruction: "deb", description: "Decrement register or branch", fields: ["register", "goTo"]},
            {instruction: "end", description: "End", fields: []}],
        currentStepId: 1,
        running: false,
        rmInterval: null,
        fields: [{field: "instruction", optionFn: function() {return this.instructions.map(x => {return this.instruction})}},
                {field: "register", optionFn: function() {return this.registers.map(x => {return x.id})}},
                {field: "goTo", optionFn: function() {return this.program.map(x => {return x.id})}},
                {field: "branchTo", optionFn: function() {return this.program.map(x => {return x.id})}}
        ]
    },
    components: {
        //Grid
    },
    methods: {
        resetRegisters: function () {
            console.log("resetting registers");
            this.registers.forEach(function(item) {
                console.log(`${item.id}`);
                item.value = 0;
            });
        },
        resetProgram: function () {
            if (this.rmInterval) {
                this.rmInterval = clearInterval(this.rmInterval);
            }
            this.running = false;
            this.currentStepId = 1;
        },
        executeProgramStep: function () {
            console.log("executeProgramStep");
            let currStep = this.program.find(x => x.id === this.currentStepId);
            if (currStep.instruction !== "end") {
                var regInd = this.registers.findIndex(x => x.id === currStep.register);
            }
            if (currStep.instruction === "inc") {
                // find register whose steps correspond to
                this.registers[regInd].value++;
                this.currentStepId = currStep.goTo;
            } else if (currStep.instruction === "deb") {
                if (this.registers[regInd].value === 0) {
                    this.currentStepId = currStep.branchTo;
                } else {
                    this.registers[regInd].value--;
                    this.currentStepId = currStep.goTo;
                }
            } else if (currStep.instruction === "end") {
                this.running = false;
                if (this.rmInterval) {
                    clearInterval(this.rmInterval);
                    this.rmInterval = null;
                    document.querySelector("#btnStep").disabled = false;
                }
            }
        },
        runRegMachine: function() {
            this.running = true;
            this.rmInterval = setInterval(this.executeProgramStep, 500);
            document.querySelector("#btnStep").disabled = true;
        },
        stepRegMachine: function() {
            this.executeProgramStep();
        },
        pauseRegMachine: function() {
            this.running = false;
            if (this.rmInterval) {
                this.rmInterval = clearInterval(this.rmInterval);
            }
            document.querySelector("#btnStep").disabled = false;
        },
        registerOpts: function(inst) {
            //return [for (reg of this.registers) reg.id]
            return this.registers.map(x => {return x.id})
        },
        goToOpts: function(inst) {
            //return [for (step of this.program) step.id]
            return this.program.map(x => {return x.id})
        },
        branchToOpts: function(inst) {
            return this.program.map(x => {return x.id})
        },
        instOpts: function() {
            //return [for (inst of this.instructions) inst.description]
            return this.program.map(x => {return this.instruction})
        }
    }
});
