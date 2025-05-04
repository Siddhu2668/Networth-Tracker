const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URi = process.env.MONGODB_URI || "enable to connect to db";

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URi)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));

app.get('/', (req, res) =>{
    res.send("running");
})

app.listen(PORT, () => {
    console.log(`Server at ${PORT}`);
})

app.use("/api/auth", authRoutes);

const customerRoutes = require("./routes/customerRoutes");
app.use("/api/customers", customerRoutes);

const loanRoutes = require("./routes/loanRoutes");
app.use("/api/loans", loanRoutes);

// const loanRoutes = require("./routes/loanRoutes");
// app.use("/api/loans", loanRoutes); // So full route becomes /api/loans

const repaymentRoutes = require("./routes/repaymentRoutes");
app.use("/api/repayments", repaymentRoutes); // ✅ So endpoints start with /api/repayments
