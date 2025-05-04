const express = require("express");
const router = express.Router();
const {register, login} = require("../controllers/authController");
const protect = require("../middlewares/authMiddleware");
// const { createCustomer } = require("../controllers/customerController");

router.post("/register", register);
router.post("/login", login);


router.get("/secret", protect, (req, res) => {
    res.json({message: `Hello ${req.user}`});
})

module.exports = router;