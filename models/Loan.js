const mongoose = require("mongoose");

const LoanSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    itemDescription: {
        type: String,
        required: true
    },
    loanAmount: {
        type: Number,
        required: true
    },
    issueDate: {
        type: Date,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    frequency: {
        type: String,
        enum: ["bi-weekly", "monthly"],
        required: true
    },
    interestPercent:{
        type: Number,
        default: 0
    },
    graceDays: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["pending", "paid", "overdue"],
        default: "pending"
    }
},{timestamps: true});

module.exports = mongoose.model("Loan", LoanSchema);