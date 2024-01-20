<script>
    import "./styles.css"
    import "./auth-styles.css"
    import { onMount } from "svelte"
    import { updateUser } from "$lib/stores/store"


    onMount(async () => {
        await updateUser()
    })

</script>

<main>
    <slot/>
</main>

