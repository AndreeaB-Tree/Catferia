<script>
    import axiosRequest from "$lib/api/axios"
    import { connectedUser } from "$lib/stores/store"


    let error = ""


    const handleTaskSubmit = async (event) => {
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



        try {
            const { data } = await axiosRequest.post("/task", { title, subtitle, goal, current })
            $connectedUser.tasks = [...$connectedUser.tasks, data]

            event.target.title.value = ""
            event.target.subtitle.value = ""
            event.target.max.value = 0
            event.target.done.value = 0
            error = ""
        }
        catch(error) {

        }
    }

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

    <span class="form-error">{error}</span>

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

    .form-error {
        height: 30px;
        color: red;
        font-weight: bold;
    }

    input {
        background-color: #ff6c94;
        color: white;
    }

    .input-wrapper > label {
        font-size: 18px;
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