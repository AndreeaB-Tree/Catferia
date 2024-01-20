<script>
    import axiosRequest from "$lib/api/axios"
    import { connectedUser, updateUser } from "$lib/stores/store"

    const logout = async () => {
        await axiosRequest.get("/logout")
        await updateUser()
    }
    
</script>


<div class="wrapper">
    <nav>
        {#if $connectedUser !== null}
            <a href="/tasks" class="auth-button">Tasks</a>
            <button on:click={logout} class="auth-button">Logout</button>
        {:else}
            <a href="/login" class="auth-button">Login</a>
            <a href="/register" class="auth-button">Register</a>
            <a href="/forgot" class="auth-button">Forgot</a>
        {/if}
    </nav>

    <img src="/logo.png" alt="Logo">
    <h1 class="moto">Keep track of your productivity!</h1>
</div>

<style>
    .wrapper {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        align-items: center;

    }


    nav {
        background-color: #ff6c94;
        width: 100%;
        height: 100px;
        border-bottom-left-radius: 100px;
        border-bottom-right-radius: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }

    .moto {
        font-size: 40px;
        color: #ff6c94;
    }
</style>