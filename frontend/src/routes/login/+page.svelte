<script>
    import validator from "validator"


    let error = ""

    const handleLogin = async (event) => {
        event.preventDefault()

        const email = event.target.email.value.trim()
        const password = event.target.password.value.trim()


        if (email === "") {
            error = "Email is required!"            
            return
        }

        if (password === "") {
            error = "Password is required!"            
            return
        }



    }
</script>

<div class="auth-content">
    <form on:submit={handleLogin} class="auth-form">
        <a href="/">
            <img src="/logo-auth.png" alt="Logo" class="auth-logo">
        </a>

        <h1 class="auth-title">Login</h1>

        <div class="input-wrapper">
            <label for="email" class="auth-label">Email</label>
            <input type="text" name="email" id="email" class="auth-input" placeholder="kitty.user@gmail.com">
        </div>

        <div class="input-wrapper">
            <label for="password" class="auth-label">Password</label>
            <input type="password" name="password" id="password" class="auth-input" placeholder="••••••••" autoComplete="off">
        </div>

        <span class="auth-error">{error}</span>

        <button type="submit" class="auth-button">Sign In</button>
    </form>
</div>