const cors = require("cors")
const dotenv = require("dotenv")
const express = require("express")
const cookieParser = require("cookie-parser")


const connectDatabase = require("./database/database")
const TaskRouter = require("./routers/TaskRouter")
const UserRouter = require("./routers/UserRouter")


dotenv.config()
connectDatabase()

const app = express()
const PORT = process.env.PORT || 8080


app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))
app.use(cookieParser())
app.use(express.json())


app.use(TaskRouter)
app.use(UserRouter)


app.all('*', (request, response) => response.status(404).send({ error: 'Route not found!' }))

app.listen(PORT)