const { Schema, model } = require("mongoose")


const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 6,
    },
    
    subtitle: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
    },


    goal: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 1)
                throw new Error("Goal cannot be negative or zero!")
        }
    },

    current: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 1)
                throw new Error("The current progress cannot be negative or zero!")
        }
    },

    completed: {
        type: Boolean,
        default: false,
        required: false,
    },


    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, {
    timestamps: true
})


TaskSchema.methods.toJSON = function() {
    const task = this.toObject()

    delete task.__v

    return task
}

const TaskModel = model("task", TaskSchema)

module.exports = TaskModel