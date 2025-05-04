const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const { createLoan, getLoans, getSummary } = require("../controllers/loanController");

router.post("/", protect, createLoan); // POST /api/loans
router.get("/", protect, getLoans);
router.get("/summary", protect, getSummary); // GET /api/loans/summary

module.exports = router;
