<script>
    import Icon from "svelte-icons-pack/Icon.svelte"
    import BiEdit from "svelte-icons-pack/bi/BiEdit"
    import BiSolidTrash from "svelte-icons-pack/bi/BiSolidTrash"


    export let tasksProgress = []

</script>


<h1 id="title">Progress:</h1>

<div class="tasks">
    {#each tasksProgress as { title, details, started, goal, current, color }}
        <div class="task">
            <div class="task-container">
                <h2 class="task-title">{title}</h2>
                <h3 class="task-started">Started: {started}</h3>
            </div>

            <h3>{details}</h3>

            <div class="task-container">
                <progress id="task-progress" value={current} max={goal} style="accent-color: {color}"></progress>
                <div class="edit-buttons">
                    <button class="task-button">
                        <Icon src={BiEdit} color="#ff6c94" size="24" />
                    </button>

                    <button class="task-button">
                        <Icon src={BiSolidTrash} color="#ff6c94" size="24" />
                    </button>
                </div>
            </div>
        </div>
    {/each}
</div>


<style>
    .tasks {
        display: flex;
        flex-direction: column;
        padding-left: 10px;
        gap: 30px;
        width: 75%;
    }

    .task-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .task-started {
        color: #ff6c94;

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
        margin-top: 10px;
    }
</style>