<script>
    import validator from "validator"
    import axiosRequest from "$lib/api/axios"
    import { connectedUser } from "$lib/stores/store"
	import { goto } from "$app/navigation"
    import { browser } from "$app/environment"


    let show = false
    $: if ($connectedUser !== null) {
        if (browser)
            goto("/tasks")
    } else {
        show = true
    }




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


        if (!validator.isEmail(email)) {
            error = "Email is not valid!"
            return
        }


        try {
            const { data: user } = await axiosRequest.post("/login", { email, password })
            $connectedUser = user

            await goto("/tasks")
            error = ""
        }
        catch(e) {
            error = "Invalid credentials!"
        }

    }
</script>


{#if show}
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

        <div class="link-wrapper">
            <a href="/register" class="form-link">Don't have an account?</a>
            <a href="/forgot" class="form-link">Forgot password?</a>
        </div>


        <span class="auth-error">{error}</span>

        <button type="submit" class="auth-button">Sign In</button>
    </form>
</div>
{/if}