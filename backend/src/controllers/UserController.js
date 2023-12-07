const UserModel = require("../models/UserModel")


const loginUser = async (request, response) => {
    const email = request.body.email
    const password = request.body.password

    try {
        const user = await UserModel.findByCredentials(email, password)
        const token = await user.generateAuthToken()

        response.cookie("catferia_token", token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
        return response.json(user)
    }
    catch(error) {
        return response.status(400).json(error)
    }
}


const logoutUser = async (request, response) => {
    const token = request.cookies["catferia_token"]
    console.log(token)

    response.clearCookie("catferia_token")
    return response.send()
}


const registerUser = async (request, response) => {
    const user = new UserModel(request.body)

    try {
        const token = await user.generateAuthToken()
        await user.save()

        response.cookie("catferia_token", token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
        return response.status(201).json(user)
    }
    catch(error) {
        return response.status(400).json(error)
    }
}


const getUser = async (request, response) => {
    const username = request.params.username

    try {
        const user = await UserModel.findOne({ username })

        if (!user) 
            return response.status(404).json({ error: "User not Found!" })

        return response.json(user)
    }
    catch(error) {
        return response.status(400).json(error)
    }
}


module.exports = {
    loginUser,
    logoutUser,
    registerUser,
    getUser
}