<script>
    const handleTaskSubmit = (event) => {
        event.preventDefault()


        const title = event.target.title.value.trim()
        const subtitle = event.target.subtitle.value.trim()
        const maxTask = event.target.max.value
        const doneTask = event.target.done.value

        const task = {
            title,
            details: subtitle,
            goal: maxTask,
            current: doneTask,
            color: "red",
            started: "12.12.2023"
        }

        tasksProgress = [...tasksProgress, task]

        console.log(tasksProgress)
    }

    export let tasksProgress = []

</script>


<h1 id="title">Add Task:</h1>

<form on:submit={handleTaskSubmit}>
    <div class="input-wrapper">
        <label for="title">Title</label>
        <input type="text" name="title" id="title" class="auth-input" placeholder="Add title...">
    </div>


    <div class="input-wrapper">
        <label for="subtitle">Subtitle</label>
        <input type="text" name="subtitle" id="subtitle" class="auth-input" placeholder="Add subtitle...">
    </div>

    <div class="input-wrapper">
        <label for="max">Max Tasks</label>
        <input type="number" name="max" id="max" class="auth-input" placeholder="20">
    </div>


    <div class="input-wrapper">
        <label for="done">Tasks Done</label>
        <input type="number" name="done" id="done" class="auth-input" placeholder="5">
    </div>


    <button type="submit">Add Task</button>
</form>


<style scoped>
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50%;
        gap: 20px;
    }

    input {
        background-color: #ff6c94;
        color: white;
    }

    input::placeholder {
        color: whitesmoke;
    }

    button {
        background-color: #ff6c94;
        color: white;
        padding: 10px 20px;
        border-radius: 15px;
        font-size: 20px;
    }
</style>