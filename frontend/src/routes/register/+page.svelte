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

    const handleRegister = async (event) => {
        event.preventDefault()

        const username = event.target.username.value.trim()
        const email = event.target.email.value.trim()
        const password = event.target.password.value.trim()
        const confirmPassword = event.target.confirmPassword.value.trim()


        if (username === "") {
            error = "Username is required!"
            return
        }

        if (email === "") {
            error = "Email is required!"            
            return
        }

        if (password === "") {
            error = "Password is required!"            
            return
        }

        if (confirmPassword === "") {
            error = "Confirm password is required!"            
            return
        }


        if (password !== confirmPassword) {
            error = "Passwords do not match!"
            return
        }



        if (!validator.isEmail(email)) {
            error = "Email is not valid!"
            return
        }


        if (!validator.isStrongPassword(password)) {
            error = "Password is not strong enough!"
            return
        }


        try {
            const { data: user } = await axiosRequest.post("/register", { username, email, password })
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
    <form on:submit={handleRegister} class="auth-form">
        <a href="/">
            <img src="/logo-auth.png" alt="Logo" class="auth-logo">
        </a>

        <h1 class="auth-title">Register</h1>


        <div class="input-wrapper">
            <label for="username" class="auth-label">Username</label>
            <input type="text" name="username" id="username" class="auth-input" placeholder="Kitty >.<">
        </div>

        <div class="input-wrapper">
            <label for="email" class="auth-label">Email</label>
            <input type="text" name="email" id="email" class="auth-input" placeholder="kitty.user@gmail.com">
        </div>

        <div class="input-wrapper">
            <label for="password" class="auth-label">Password</label>
            <input type="password" name="password" id="password" class="auth-input" placeholder="••••••••" autoComplete="off">
        </div>

        <div class="input-wrapper">
            <label for="confirmPassword" class="auth-label">Confirm Password</label>
            <input type="password" name="confirmPassword" id="confirmPassword" class="auth-input" placeholder="••••••••" autoComplete="off">
        </div>

        <div class="link-wrapper">
            <span></span>
            <a href="/login" class="form-link">Already have an account?</a>
        </div>


        <span class="auth-error">{error}</span>

        <button type="submit" class="auth-button">Sign Up</button>
    </form>
</div>
{/if}