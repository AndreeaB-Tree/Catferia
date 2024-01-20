<script>
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





    $: if (browser && $connectedUser !== null) {
        goto("/tasks")
    }

    let error = ""

    const handleForgot = async (event) => {
        event.preventDefault()

        const email = event.target.email.value.trim()


        if (email === "") {
            error = "Email is required!"            
            return
        }


    }
</script>


{#if show}
<div class="auth-content">
    <form on:submit={handleForgot} class="auth-form">
        <a href="/">
            <img src="/logo-auth.png" alt="Logo" class="auth-logo">
        </a>

        <h1 class="auth-title">Forgot</h1>

        <div class="input-wrapper">
            <label for="email" class="auth-label">Email</label>
            <input type="text" name="email" id="email" class="auth-input" placeholder="kitty.user@gmail.com">
        </div>
        
        <div class="link-wrapper">
            <span></span>
            <a href="/login" class="form-link">Back to login</a>
        </div>

        <span class="auth-error">{error}</span>

        <button type="submit" class="auth-button">Recover Account</button>
    </form>
</div>
{/if}