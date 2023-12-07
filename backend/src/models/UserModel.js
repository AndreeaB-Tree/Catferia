const { Schema, model } = require("mongoose")

const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const UserSchema = new Schema({
    avatar: {
        type: Buffer,
        required: false
    },

    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        minlength: 6,
        maxlength: 15
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value))
                throw new Error("Email is not valid!")
        }
    },

    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isStrongPassword(value))
                throw new Error("Password is not strong enough!")
        }
    },

    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]

}, { timestamps: true })




UserSchema.virtual("tasks", {
    ref: "Tasks",
    localField: "_id",
    foreignField: "author"
})




UserSchema.methods.toJSON = function() {
    const user = this.toObject()

    delete user.password
    delete user.tokens
    delete user.avatar
    delete user.__v

    return user
}


UserSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: "30d" })

    user.tokens = [...user.tokens, { token }]
    await user.save()

    return token
}


UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await UserModel.findOne({ email })

    if (!user) 
        throw new Error("Invalid login!")

    const passwordsEqual = await bcrypt.compare(password, user.password)

    if (!passwordsEqual)
        throw new Error("Invalid login!")

        
    return user
}


UserSchema.pre("save", async function(next) {
    const user = this

    if (user.isModified("password"))
        user.password = await bcrypt.hash(user.password, 8)
    
    next()
})

// UserSchema.pre("remove", async function(next) {
//     const user = this

//     await TaskModel.deleteMany({ owner: user._id })
//     next()
// })


const UserModel = new model("user", UserSchema)

module.exports = UserModel