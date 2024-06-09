const multer = require("multer")
const express = require("express")
const router = express.Router()


const auth = require("../middleware/auth")
const {
    loginUser,
    logoutUser,
    registerUser,
    getUser,
    updateQuote,
    getAvatar,
    addAvatar
} = require("../controllers/UserController")



const avatar = multer({
    limits: {
        fileSize: 10_000_000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error("Please upload only images!"), false);
        }

        return cb(null, true)
    }
});



router.post("/login", loginUser)
router.post("/register", registerUser)
router.get("/logout", auth, logoutUser)
router.get("/user", auth, getUser)
router.patch("/quote", auth, updateQuote)



router.get("/avatar", auth, getAvatar)

router.post("/avatar", auth, (req, res, next) => {
    next()
}, avatar.single("avatar"), (req, res, next) => {
    if (!req.file) {
        return res.status(400).send({ error: "No file uploaded" });
    }

    next()
}, addAvatar, (error, req, res, next) => {
    return res.status(400).send({ error: error.message });
})




module.exports = router