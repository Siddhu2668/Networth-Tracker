const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: validator.isEmail,
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return value.length >= 6 && value.length <= 20 && /\d/.test(value) && /[a-zA-Z]/.test(value);
            },
        },
    },    
}, { timestamps: true});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.matchPassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model("User", userSchema);