<div class="wrapper">
    <nav>
        <a href="/login" class="auth-button">Login</a>
        <a href="/register" class="auth-button">Register</a>
        <a href="/forgot" class="auth-button">Forgot</a>
        <a href="/tasks" class="auth-button">Tasks</a>
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