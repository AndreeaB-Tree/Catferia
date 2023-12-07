<script>
    import AddTask from "$lib/components/AddTask.svelte"
    import Diagram from "$lib/components/Diagram.svelte"
    import Progress from "$lib/components/Progress.svelte"




    let selectedButton = "progress"


    const changeSelectedButton = (currentButton) => {
        selectedButton = currentButton
    }


    let tasksProgress = [
        {
            title: "Memoriile unei fete cuminti",
            details: "Simone de Beauvoir",
            started: "24.09.2023",
            goal: 350,
            current: 139,
            color: "red"
        },
        {
            title: "Sabloane de proiectare",
            details: "Laborator 3",
            started: "18.10.2023",
            goal: 13,
            current: 3,
            color: "pruple"
        },
        {
            title: "Curs Python",
            details: "Udemy",
            started: "24.10.2023",
            goal: 10,
            current: 1.5,
            color: "pink"
        }
    ]
</script>



<div class="content">
    <div id="profile">

        <a href="/">
            <img src="/logo.png" alt="Logo" id="logo">
        </a>
        <img src="/avatar.jpg" alt="Avatar" id="avatar">
        
        <h1 id="username">kitty.lean</h1>

        <div id="quote">
            <h2>"Ies prin cartier sa mai dau un Hoodcheck" - Mobtrap, Hoodcheck</h2>
        </div>
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
                <Progress bind:tasksProgress={tasksProgress} />
            {/if}

            {#if selectedButton == "add"}
                <AddTask bind:tasksProgress={tasksProgress} />
            {/if}

            {#if selectedButton == "view"}
                <Diagram />
            {/if}
        </div>
    </div>
</div>



<style>
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

    #title {
        font-weight: bold;
        margin-top: 15px;
        margin-bottom: 15px;
    }



    #logo {
        width: 100%;
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

    #quote {
        color: #fae1e1;
        text-shadow: 2px 2px 4px #a6a6a6;
        margin-top: 100px;
        padding: 10px;
        text-align: center;
    }

    #buttons > button {
        background-color: #ff6c94;
        border-radius: 20px;
        padding: 10px 20px;
        font-size: 20px;
        color: whitesmoke;
        border: 2px solid #ff6c94;
        transition: 0.2s;
    }

    #buttons > button:hover {
        background: #ffc4d4;
        transition: 0.2s;
        border-color: #ffc4d4;
    }

    #buttons {
        display: flex;
        gap: 10px;
        justify-content: flex-end;
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