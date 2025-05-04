const User = require("../models/User");
const Customer = require("../models/Customer");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1h"
});
}

exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExists = await User.findOne({email});
        if (userExists) return res.status(400).json({message: "User laready exists" });
        // const userExists = await User.findOne({email});
        
        const user = await User.create({email, password});
        if(!user) {
            return res.status(400).json({message: "failed"});
        }
        const token = generateToken(user._id)  //after create of user generate token
        
        res.status(201).json({ userId: user._id, token});
    } catch(error) {
        res.status(500).json({message: error.message})
    }
};

exports.login = async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user || !(await user.matchPassword(password))) {
            return res.status(401).json({message: "Invalid credentials"});
        }

        const token = generateToken(user.id);
        res.json({userId: user.id, token});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

