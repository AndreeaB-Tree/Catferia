const express = require("express")
const router = express.Router()

const auth = require("../middleware/auth")
const {
    loginUser,
    logoutUser,
    registerUser,
    getUser
} = require("../controllers/UserController")


router.post("/login", loginUser)
router.get("/logout", logoutUser)
router.post("/register", registerUser)
router.get("/users/:username", getUser)



module.exports = router