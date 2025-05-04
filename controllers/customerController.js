const User = require("../models/User");
const Customer = require("../models/Customer");
const jwt = require("jsonwebtoken");

exports.createCustomer = async(req, res) => {
    const { name, phone, address, trustScore, creditlimit } = req.body

    const userId = req.user;
    try {
        const customer = await Customer.create({
            name,
            phone,
            address,
            trustScore,
            creditlimit,
            userId
        });
        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.getCustomers = async (req, res) => {
    const userId = req.userId;

    try {
        const customers = await Customer.find({ userId });
        res.json(customers);
    } catch(err) {
        res.status(500).json( {message: err.message});
    }
};

exports.updateCustomer = async (req, res) => {
    const {id} = req.params;
    const userId = req.userId;

    try {
        const customer = await Customer.findOneAndUpdate(
            { _id: id, userId },
            req.body,
            { new: true }
        );
        if (!customer) return res.status(404).json({message: "Customer not found"})

        res.json(customer);
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
}

exports.deleteCustomer = async (req, res) => {
    const {id} = req.params;
    const userId = req.userId;

    try {
        const customer = await Customer.findOneAndDelete({ _id: id, userId });
        if (!customer) return res.status(404).json({message: "Customer not found"})

        res.json({ message: "Customer deleted successfully" });
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
}