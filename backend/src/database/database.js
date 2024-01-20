const mongoose = require("mongoose")

const connectDatabase = () => {
    mongoose.connect(process.env.DB_CONNECTION)
}

module.exports = connectDatabase