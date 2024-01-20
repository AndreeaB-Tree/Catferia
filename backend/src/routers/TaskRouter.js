const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth")
const {
    getTasks,
    deleteTask,
    modifyTask,
    addTask
} = require("../controllers/TaskController")


router.get("/tasks", auth, getTasks)
router.post("/task", auth, addTask)
router.patch("/task", auth, modifyTask)
router.delete("/task", auth, deleteTask)




module.exports = router