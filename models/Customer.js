const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const CustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => {
                return value.length === 10 && /^\d+$/.test(value);
            },
            message: "Phone number must be 10 digits long and contain only numbers."
        }
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    trustScore: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    creditlimit:{
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
        }
    }, {timestamps: true});

module.exports = mongoose.model("Customer", CustomerSchema);