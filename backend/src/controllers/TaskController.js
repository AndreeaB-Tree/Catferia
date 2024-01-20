const TaskModel = require("../models/TaskModel")


const getTasks = async (request, response) => {
    const user = request.user._id

    try {
        const tasks = await TaskModel
            .find({ 
                author: request.user._id, 
            })

        return response.send(tasks)
    }
    catch (error) {
        return response.status(500).send(error)
    }
}


const addTask = async (request, response) => {
    const author = request.user._id
    const title = request.body.title
    const subtitle = request.body.subtitle
    const goal = request.body.goal
    const current = request.body.current


    try {
        const task = new TaskModel({ ...request.body, author })
        await task.save()

        return response.status(201).json(task)
    }
    catch (error) {
        console.log(error)
        return response.status(400).json(error)
    }
}




const modifyTask = async (request, response) => {
    const taskId = request.body._id
    delete request.body._id

    try {
        const task = await TaskModel.findOneAndUpdate({ id: taskId }, { ...request.body }, {returnDocument: 'after'})
        return response.status(201).send(task)
    }
    catch(e) {
        console.log(e)
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
    const _id = request.body.id

    try {
        const task = await TaskModel.findOneAndDelete({ author: request.user._id })

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
    modifyTask,
    updateTask,
    deleteTask,
    addTask
}