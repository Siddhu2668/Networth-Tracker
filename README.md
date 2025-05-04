# 💼 CrediKhaata – Networth Tracker (Backend API)

A simple and powerful backend application built with Node.js and Express.js to help shopkeepers manage customers, loans (credit), and repayments.

---

## 🔧 Tech Stack

- **Node.js** (v22+)
- **Express.js**
- **MongoDB** (via Mongoose)
- **JWT Authentication**
- **Hoppscotch/Postman** for testing

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd credikhaata
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/credikhaata
JWT_SECRET=your_super_secret_key
```

### 4. Start the server

```bash
nodemon server.js
```

---

## 📚 API Endpoints

### 🔐 Auth

| Method | Endpoint            | Description           |
|--------|---------------------|----------------------|
| POST   | /api/auth/register  | Register user        |
| POST   | /api/auth/login     | Login + JWT          |
| GET    | /api/auth/secret    | Test protected route |

### 👥 Customers (Protected)

| Method | Endpoint                | Description         |
|--------|-------------------------|--------------------|
| POST   | /api/customers          | Add a customer     |
| GET    | /api/customers          | List all customers |
| PUT    | /api/customers/:id      | Update a customer  |
| DELETE | /api/customers/:id      | Delete a customer  |

### 💸 Loans (Protected)

| Method | Endpoint                | Description                |
|--------|-------------------------|----------------------------|
| POST   | /api/loans              | Create a loan              |
| GET    | /api/loans              | List all user loans        |
| GET    | /api/loans/summary      | Loaned, Repaid, Overdue    |

### 💰 Repayments (Protected)

| Method | Endpoint                | Description         |
|--------|-------------------------|--------------------|
| POST   | /api/repayments         | Create a repayment |
| GET    | /api/repayments         | List repayments    |

---

## ✅ Features

- JWT-based authentication
- CRUD for customers
- Loan creation with frequency and interest
- Repayment tracking with real-time loan status update
- Dashboard summary for each user

---

## 🔮 Future Enhancements

- Overdue auto-tagging via due date + grace period
- Summary by customer
- Repayment calendar
- Flutter-based mobile app (Termux-friendly)

---

## 🔐 Test Credentials

> **Note:** Add your own MongoDB cluster and test credentials.

```
Email: 
Password: 
```

---