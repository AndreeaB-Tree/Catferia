
<script>
    import AddTask from "$lib/components/AddTask.svelte"
    import Diagram from "$lib/components/Diagram.svelte"
    import Progress from "$lib/components/Progress.svelte"

    import { connectedUser } from "$lib/stores/store"
	import { goto } from "$app/navigation"
    import { browser } from "$app/environment"
    import axiosRequest from "$lib/api/axios"


    let show = false
    $: if ($connectedUser === null) {
        if (browser) {
            goto("/login")
        }
    } else {
        show = true
    }


    let selectedButton = "progress"
    let editQuote = false

    const changeSelectedButton = (currentButton) => {
        selectedButton = currentButton
    }


    const handleEditQuote = async (event) => {
        event.preventDefault()

        const newQuote = event.target.quote.value.trim()

        try {
            await axiosRequest.patch("/quote", { newQuote })
            $connectedUser.quote = newQuote
        }
        catch(err) {
            console.log(err)
        }

        editQuote = false
    }

</script>


{#if show}
<div class="content">
    <div id="profile">
        <a href="/">
            <img src="/logo.png" alt="Logo" id="logo">
        </a>
        <img src={"/avatar.jpg"} alt="Avatar" id="avatar">
        
        <h1 id="username">{$connectedUser.username}</h1>

        <button class="quote" on:click={() => editQuote = !editQuote}>{$connectedUser.quote || '"Add a quote"'}</button>

        {#if editQuote}
            <form on:submit={handleEditQuote} class="dialog-form">
                <input type="text" name="quote" id="quote" value={$connectedUser.quote || ""}>
        
                <button type="submit">Submit</button>
            </form>
        {/if}
    </div>

    <div id="progress">
        <div id="buttons">
            <button on:click={() => changeSelectedButton("progress")} class:selected={selectedButton == "progress"}>
                Progress
            </button>
                
            <button on:click={() => changeSelectedButton("add")} class:selected={selectedButton == "add"}>
                Add task
            </button>

            <button on:click={() => changeSelectedButton("view")} class:selected={selectedButton == "view"}>
                View diagrams
            </button>
        </div>

        <div id="section-content">
            {#if selectedButton == "progress"}
                <Progress />
            {/if}

            {#if selectedButton == "add"}
                <AddTask />
            {/if}

            {#if selectedButton == "view"}
                <Diagram />
            {/if}
        </div>
    </div>
</div>
{/if}


<style>
    .dialog-form {
        display: flex;
    }

    .dialog-form > input {
        padding: 5px 15px;
    }

    .dialog-form > button {
        height: 100% !important;
        margin-top: auto;
        background-color: #fae1e1;
        color: black;
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.2s;
    }


    .content {
        height: 100%;
        display: flex;
    }

    #section-content {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        padding: 30px;
    }




    #profile {
        background-color: #ffc4d4;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 25%;
        padding: 10px;
        height: 100%;
    }



    #logo {
        width: 100%;
        max-width: 300px;
        height: auto;
    }

    #avatar {
        width: 200px;
        height: 200px;
        border: 20px solid #fae1e1;
    }

    #username {
        color: #fae1e1;
        text-shadow: 2px 2px 4px #a6a6a6;
        padding: 5px;
    }

    .quote {
        color: #fae1e1;
        text-shadow: 2px 2px 4px #a6a6a6;
        margin-top: 50px;
        padding: 10px;
        text-align: center;
        background: transparent;
        font-size: 28px;
    }

    #buttons > button {
        background-color: #ff6c94;
        border-radius: 20px;
        padding: 10px 20px;
        font-size: 20px;
        color: whitesmoke;
        border: 2px solid hsl(344, 100%, 71%);
        transition: 0.2s;
        overflow-y: hidden;
    }

    h1 {
        overflow-y: hidden;
    }

    #buttons > button:hover {
        background: #ffc4d4;
        transition: 0.2s;
        border-color: #ffc4d4;
    }

    #buttons {
        display: flex;
        gap: 10px;
        margin: 10px;
        width: 100%;
        padding: 10px;
        padding-left: 30px;
    }

    #progress {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .selected {
        color: black !important;
        background: transparent !important;
    }
</style>