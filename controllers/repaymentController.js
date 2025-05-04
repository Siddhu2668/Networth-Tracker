const Repayment = require('../models/Repayment');
const Loan = require('../models/Loan');

exports.createRepayment = async (req, res) => {
    const { loanId, amount } = req.body;
    const userId = req.userId; 

    try {
        const loan = await Loan.findOne({ _id: loanId, userId });
        if (!loan) {
            return res.status(404).json({ message: 'Loan not found or does not belong to this user' });
        }

        const repayment = await Repayment.create({
            loanId,
            amount,
            userId
        });

        const totalPaid = await Repayment.aggregate([
            { $match: { loanId: loan._id }},
            { $group: { _id: "$loanId", total: { $sum: "$amount"}}}
        ])

        const totalRepaid = totalPaid[0] ?.total || 0;

        if(totalRepaid >= loan.loanAmount) {
            loan.status = "paid";
            await loan.save();
        }


        res.status(201).json(repayment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getRepayments = async (req, res) => {
    const userId = req.userId;
  
    try {
      const repayments = await Repayment.find({ userId }).populate("loanId", "itemDescription loanAmount");
      res.json(repayments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  