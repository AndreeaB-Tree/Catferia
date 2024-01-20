<script>
    import Icon from "svelte-icons-pack/Icon.svelte"
    import BiEdit from "svelte-icons-pack/bi/BiEdit"
    import BiSolidTrash from "svelte-icons-pack/bi/BiSolidTrash"

    import { connectedUser } from "$lib/stores/store"
    import axiosRequest from "$lib/api/axios"
    import moment from "moment"


    let openForm = false
    let selectedTask = {}
    let selectedTaskIndex = -1
    let dialog
    let error = ""


    const submitEditForm = async (event) => {
        event.preventDefault()

        const title = event.target.title.value.trim()
        const subtitle = event.target.subtitle.value.trim()
        const goal = +event.target.max.value
        const current = +event.target.done.value


        
        if (title.length < 6) {
            error = "The minimum title length is of 6 characters!"
            return
        }

        
        if (subtitle.length < 6) {
            error = "The minimum subtitle length is of 6 characters!"
            return
        }

        if (current > goal) {
            error = "The tasks done cannout outnumber the total tasks!"
            return
        }

        if (goal === 0) {
            error = "The goal cannot be empty!"
            return
        }



        dialog.close()
        const { data } = await axiosRequest.patch("/task", { id: selectedTask._id, title, subtitle, goal, current })
        $connectedUser.tasks[selectedTaskIndex] = data

        $connectedUser = $connectedUser
    }


    const editTask = (index) => {
        const task = $connectedUser.tasks[index]
        openForm = true
        selectedTask = task
        selectedTaskIndex = index
        dialog.show()
    }

    const deleteTask = async (index) => {
        const task = $connectedUser.tasks[index]
        await axiosRequest.delete("/task", { id: task._id })

        $connectedUser.tasks.splice(1, index)
        $connectedUser.tasks = $connectedUser.tasks
    }
</script>


<h1 id="title">Progress:</h1>


<dialog bind:this={dialog} class="form-dialog">
    <form on:submit={submitEditForm}>
        <div class="input-wrapper">
            <label for="title">Title</label>
            <input type="text" name="title" id="title" value={selectedTask.title} class="auth-input" placeholder="Add title...">
        </div>
    
    
        <div class="input-wrapper">
            <label for="subtitle">Subtitle</label>
            <input type="text" name="subtitle" id="subtitle" value={selectedTask.subtitle} class="auth-input" placeholder="Add subtitle...">
        </div>
    
        <div class="input-wrapper">
            <label for="max">Max Tasks</label>
            <input type="number" name="max" id="max" value={selectedTask.goal} class="auth-input" placeholder="20">
        </div>
    
    
        <div class="input-wrapper">
            <label for="done">Tasks Done</label>
            <input type="number" name="done" value={selectedTask.current} id="done" class="auth-input" placeholder="5">
        </div>

        <span class="form-error">{error}</span>
    
    
        <button type="submit" class="form-dialog-button">Edit Task</button>
    </form>
</dialog>

<div class="tasks">
    {#if $connectedUser.tasks}
    {#each $connectedUser.tasks as { title, subtitle, goal, current, createdAt }, index}
        <div class="task">
            <div class="task-container">
                <h2 class="task-title">{title}</h2>
                <h3 class="task-started">Started: {moment(createdAt).format("DD-MM-YY")}</h3>
            </div>

            <h3>{subtitle}</h3>

            <div class="task-container">
                <div class="progress-container">
                    <span>{current}</span>
                    <progress id="task-progress" value={current} max={goal} ></progress>
                    <span>{goal}</span>
                </div>


                <div class="edit-buttons">
                    <button class="task-button" on:click={() => editTask(index)}>
                        <Icon src={BiEdit} color="#ff6c94" size="24" />
                    </button>

                    <button class="task-button" on:click={() => deleteTask(index)}>
                        <Icon src={BiSolidTrash} color="#ff6c94" size="24" />
                    </button>
                </div>
            </div>
        </div>
    {/each}
    {/if}
</div>


<style>
    .tasks {
        display: flex;
        flex-direction: column;
        padding-left: 10px;
        gap: 30px;
        width: 75%;
    }

    .form-dialog {
        left: 50%;
        padding: 15px;
        background-color: #ff6c94;
        border-radius: 10px;
    }

    .task-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .task-started {
        color: #ff6c94;
    }

    
    .form-error {
        height: 30px;
        color: red;
        font-weight: bold;
    }


    .edit-buttons {
        display: flex;
        gap: 5px;
    }

    .task-button {
        background: transparent;
        display: flex;
        justify-content: center;
        align-items: center;
    }


    #task-progress {
        width: 75%;
        height: 20px;
    }

    .progress-container {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .form-dialog > form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    
    .form-dialog-button {
        background-color: white;
        color: #ff6c94;
        padding: 5px 15px;
        border-radius: 15px;
        font-size: 20px;
        margin-top: 10px;
    }
</style>