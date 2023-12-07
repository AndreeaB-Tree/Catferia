const TaskModel = require("../models/TaskModel")


const getTasks = async (request, response) => {
    const description = request.query.description
    const completed = request.query.completed
    const limit = +request.query.limit
    const skip = +request.query.skip
    const sortBy = request.query.sortBy

    const sort = {}
    const match = {}


    if (description)
        match.description = description

    if (completed)
        match.completed = completed === "true"

    if (sortBy) {
        const parts = sortBy.split(":")
        sort[parts[0]] = parts[1] === "desc" ? -1 : 1
    }

    try {
        const tasks = await TaskModel
            .find({ 
                owner: request.user._id, 
                ...match, 
            })
            .limit(limit)
            .skip(skip)
            .sort(sort)
        return response.send(tasks)
    }
    catch (e) {
        return response.status(500).send(e)
    }
}




const getTask = async (request, response) => {
    const _id = request.params.id

    try {
        const task = await TaskModel.findOne({ _id, owner: request.user._id })

        if (!task) 
            return response.status(404).send()
        return response.send(task)  
    }
    catch(e) {
        return response.status(500).send(e)
    }
}


const modifyTask = async (request, response) => {
    const task = new TaskModel({ ...request.body})

    try {
        await task.save()
        return response.status(201).send(task)
    }
    catch(e) {
        return response.status(400).send(e)
    }
}


const updateTask = async (request, response) => {
    const _id = request.params.id
    const updates = Object.keys(request.body)
    const allowedUpdates = ["description", "completed"]
    const isValidOperation = updates.every(property => allowedUpdates.includes(property))
    

    if (!isValidOperation)
        return response.status(404).send({ error: "Invalid Updates!" })
    

    try {
        const task = await TaskModel.findOne({ _id, owner: request.user._id })

        if (!task) 
            return response.status(404).send()

        for (let i = 0; i < updates.length; i++)
            request.user[updates[i]] = request.body[updates[i]]
        
        await task.save()
        return response.send(task)
    }
    catch(e) {
        return response.status(400).send(e)
    }
}


const deleteTask = async (request, response) => {
    const _id = request.params.id

    try {
        const task = await TaskModel.findOneAndDelete({ _id, owner: request.user._id })

        if (!task) 
            return response.status(404).send()
        return response.send(task)    
    }
    catch(e) {
        return response.status(400).send(e)
    }
}



module.exports = {
    getTasks,
    getTask,
    modifyTask,
    updateTask,
    deleteTask
}