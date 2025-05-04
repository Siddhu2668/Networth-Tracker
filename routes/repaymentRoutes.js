const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const { createRepayment, getRepayments } = require("../controllers/repaymentController");
// const { createLoan, getLoans } = require("../controllers/loanController");
// const { createLoan, getLoans } = require("../controllers/loanController");

// router.post("/", protect, createLoan); // POST /api/loans
// router.get("/", protect, getLoans);

router.use(protect); // Protect all routes in this router
router.post("/", createRepayment); // POST /api/repayments
router.get("/", getRepayments); // GET /api/repayments

module.exports = router;