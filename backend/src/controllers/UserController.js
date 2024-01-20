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
    response.clearCookie("catferia_token")
    request.user.tokens = request.user.tokens.filter(token => token.token !== request.token)
    await request.user.save()

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
        console.log(error)
        return response.status(400).json(error)
    }
}



const getUser = (request, response) => {
    return response.send({ user: request.user })
}


const updateQuote = async (request, response) => {
    try {
        request.user.quote = request.body.newQuote
        await request.user.save()

        return response.send(request.user)
    }
    catch(e) {
        return response.send(e)
    }
}


module.exports = {
    loginUser,
    logoutUser,
    registerUser,
    getUser,
    updateQuote
}