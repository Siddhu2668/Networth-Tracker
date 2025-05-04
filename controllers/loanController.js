const Loan = require("../models/Loan");
const Repayment = require("../models/Repayment");

exports.createLoan = async (req, res) => {
  const {
    customerId,
    itemDescription,
    loanAmount,
    issueDate,
    dueDate,
    frequency,
    interestPercent,
    graceDays
  } = req.body;

  const userId = req.userId;

  try {
    const loan = await Loan.create({
      customerId,
      itemDescription,
      loanAmount,
      issueDate,
      dueDate,
      frequency,
      interestPercent,
      graceDays,
      userId
    });

    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLoans = async (req, res) => {
    const userId = req.userId;
  
    try {
      const loans = await Loan.find({ userId }).populate("customerId", "name phone");
      res.json(loans);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
exports.getSummary = async (req, res) => {
    const userId = req.userId;
  
    try {
      const totalLoanedData = await Loan.aggregate([
        { $match: { userId } },
        { $group: { _id: null, total: { $sum: "$loanAmount" } } }
      ]);
      const totalLoaned = totalLoanedData[0]?.total || 0;

      const totalRepaidData = await Repayment.aggregate([
        { $match: { userId } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]);
      const totalRepaid = totalRepaidData[0]?.total || 0;
  
      const overdueCount = await Loan.countDocuments({ userId, status: "overdue" });
  
      res.json({
        totalLoaned,
        totalRepaid,
        totalOverdue: overdueCount
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };