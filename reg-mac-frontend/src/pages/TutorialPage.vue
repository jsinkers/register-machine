Component<template>
    <div class="row flex-grow-1 debug2 ">
        <div class="container-fluid d-flex flex-column carousel slide debug" id="lightbox"
             data-interval="false">
            <ol class="row carousel-indicators d-none d-sm-flex">
                <li data-target="#lightbox" data-slide-to="0" class="active"></li>
                <li data-target="#lightbox" data-slide-to="1"></li>
                <li data-target="#lightbox" data-slide-to="2"></li>
                <li data-target="#lightbox" data-slide-to="3"></li>
                <li data-target="#lightbox" data-slide-to="4"></li>
                <li data-target="#lightbox" data-slide-to="5"></li>
                <li data-target="#lightbox" data-slide-to="6"></li>
                <li data-target="#lightbox" data-slide-to="7"></li>
                <li data-target="#lightbox" data-slide-to="8"></li>
            </ol>
            <div>
                <a class="carousel-control-prev" href="#lightbox" role="button"
                   data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
            </div>
            <div class="row align-items-center flex-grow-1">
                <div class="col h-100">
                    <div class="carousel-inner container-fluid h-100">
                        <TutorialComponent :is-active="true">
                          <span slot="header">Register machine</span>
                            <div slot="content">
                                <p>This site gives you a series of challenges to solve using a register
                                    machine, a kind of idealised computer. This is a useful tool to explore how
                                    computers
                                    work.
                                    But first, let's look at what makes up a register machine.</p>
                                <p>This content is based on Daniel Dennett's description of the register
                                    machine in <a
                                            href="https://www.goodreads.com/en/book/show/18378002-intuition-pumps-and-other-tools-for-thinking">
                                        Intuition Pumps and Other Tools for Thinking</a>.</p>
                            </div>
                        </TutorialComponent>
                        <TutorialComponent>
                            <span slot="header">Registers</span>
                            <div slot="content">
                                <p>Register machines have a number of registers, which act as memory
                                    for the machine. They can store whole numbers, and each has a unique ID
                                    (Reg. 1, Reg. 2, ...).</p>
                                <p>You can think of a register as a bucket into which you can place
                                    buttons, with the value of the register being the number of buttons in the
                                    bucket.
                                </p>
                                <p>Here are two registers. Try changing their values.</p>
                                <div class="container">
                                    <div class="row justify-content-center">
                                        <register :reg-id="1" :reg-value="3"></register>
                                        <register :reg-id="2" :reg-value="4"></register>
                                    </div>
                                </div>
                            </div>
                        </TutorialComponent>
                        <TutorialComponent>
                            <span slot="header">Processing Unit</span>
                            <div slot="content">
                                <p>The register machine also has a processing unit, which is capable of
                                    performing three different instructions. It can only execute one instruction at
                                    a time.</p>
                            </div>
                        </TutorialComponent>
                        <TutorialComponent>
                            <span slot="header">Program</span>
                            <div slot="content">
                                <p>A program for the register machine is simply a list of these instructions in a
                                    specific order. The register machine will execute this instructions,
                                    one-by-one, operating on the values of the registers, to produce some result.
                                </p>
                                <program :program="program" :fields="fields" :current-step-id="currentStepId"
                                         :instructions="instructions"></program>
                            </div>
                        </TutorialComponent>
                        <TutorialComponent>
                            <span slot="header">Instruction 1: Increment</span>
                            <div slot="content">
                                <p>The increment instruction adds 1 to the specified register, and then moves to a
                                    specified step in the program (the Go-To step).</p>
                            </div>
                        </TutorialComponent>
                        <TutorialComponent>
                            <span slot="header">Instruction 2: End</span>
                            <div slot="content">
                                <p>As you might have guessed, the End instruction halts execution of the register
                                    machine. Without one of these steps in your program, it will keep the
                                    register machine running forever!</p>
                            </div>
                        </TutorialComponent>
                        <TutorialComponent>
                            <span slot="header">Instruction 3: Decrement-Branch</span>
                            <div slot="content">
                                <p>The Decrement-Branch instruction is a bit more involved. If the specified
                                    register for that instruction contains a value greater than 0, then the
                                    register has its value reduced by 1, and the processing unit moves to the Go-To
                                    step specified. If the specified register contains the value 0, then the
                                    processing unit moves to the Branch step specified.</p>

                                <p>While this might seem a bit tricky, this is the most useful step, because it
                                    allows our programs to change behaviour based on the current values of the
                                    registers. You'll see how this works as you solve the challenges.</p>
                                <!-- todo: add decrement program step and graph -->
                            </div>
                        </TutorialComponent>
                        <TutorialComponent>
                            <span slot="header">Operating the register machine</span>
                            <div slot="content">
                                <p>Now that you know what makes up a register machine, let's look at how we can
                                    run our programs</p>
                                <p>The register machine has three controls:</p>
                                <ul>
                                    <li>Run (pause): this executes the program until completion, and can be clicked
                                        again to pause execution
                                    </li>
                                    <li>Step: this executes the next instruction in the program. This is useful if
                                        you want to carefully examine the behaviour of the register machine - very
                                        useful for locating bugs!
                                    </li>
                                    <li>Reset: this takes the register machine back to the first step</li>
                                </ul>
                            </div>
                        </TutorialComponent>
                        <TutorialComponent>
                            <span slot="header">Register machine</span>
                            <div slot="content">
                                <p>Now you know how the basics, let's get started!</p>
                                <router-link class="btn btn-primary" to="/progress">Get started</router-link>
                            </div>
                        </TutorialComponent>
                    </div>
                </div>
            </div>
            <div>
                <a class="carousel-control-next" href="#lightbox" role="button"
                   data-slide="next">
                    <span class="carousel-control-next-icon text-dark" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import TutorialComponent from '../components/TutorialComponent'
    import Register from '../components/RegisterDisplay'
    import Program from '../components/ProgramListing'

    export default {
        name: "TutorialPage",
        components: {
            Register,
            TutorialComponent,
            Program,

        },
        data: function() {
            return {
                program: [{"id":1,"goTo":2,"branchTo":3,"editMode":false,"editable":false,"register":1,"instruction":"deb"},{"id":2,"goTo":1,"branchTo":null,"editMode":false,"editable":false,"register":2,"instruction":"inc"},{"id":3,"goTo":null,"branchTo":null,"editMode":false,"editable":false,"register":null,"instruction":"end"}],
                fields: [{"field":"instruction","options":["inc","deb","end"],"optionObject":"instructions","optionField":"instruction"},{"field":"register","options":[1,2,3,4],"optionObject":"registers","optionField":"id"},{"field":"goTo","options":[1,2,3],"optionObject":"program","optionField":"id"},{"field":"branchTo","options":[1,2,3],"optionObject":"program","optionField":"id"}],
                currentStepId: 1,
                instructions: []
            }
        }
    }
</script>

<style scoped>

</style>
