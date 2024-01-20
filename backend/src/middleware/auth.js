const jwt = require("jsonwebtoken")
const UserModel = require("../models/UserModel")


const auth = async (request, response, next) => {
    try {
        const token = request.cookies["catferia_token"]

        if (!token)
            return response.send({ user: null })

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await UserModel.findOne({ _id: decoded._id, "tokens.token": token })

        if (!user)
            throw new Error("Invalid token!")

        request.user = user
        request.token = token
        next()
    }
    catch (error) {
        if (request.cookies["catferia_token"])
            response.clearCookie("catferia_token")
        
        return response.status(401).send({ error: "Not Authenticated" })
    }
}

module.exports = auth