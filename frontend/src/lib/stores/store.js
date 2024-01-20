import { writable } from "svelte/store"
import axiosRequest from "$lib/api/axios"


export const connectedUser = writable(null)


export const updateUser = async () => {
    const { data } = await axiosRequest.get("/user")

    if (data !== null && data.user !== null)
        data.user.tasks = []


    if (data !== null)
        if (data.user !== null) {
            const { data: tasks } = await axiosRequest.get("/tasks")
            if (tasks === null)
                data.user.tasks = []
            else
                data.user.tasks = tasks
        }

    connectedUser.set(data.user)
}