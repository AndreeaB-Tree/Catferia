const { Schema, model } = require("mongoose")


const TaskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 6,
    },
    
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
    },

    started: {
        type: String,
        required: true,
        trim: true
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

    color: {
        type: String,
        required: false,
        trim: true
    },

    completed: {
        type: Boolean,
        required: true,
    },

}, {
    timestamps: true
})


TaskSchema.methods.toJSON = function() {
    const task = this.toObject()

    delete task.owner
    delete task.__v

    return task
}

const TaskModel = model("task", TaskSchema)

module.exports = TaskModel