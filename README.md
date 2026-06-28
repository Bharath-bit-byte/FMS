# 📊 Finance Management System (FMS)

A comprehensive full-stack application designed to help users effortlessly track and manage their personal finances. 

## 🚀 Features
* **Secure Authentication:** Fully functional user login and registration flows.
* **Interactive Dashboard:** A centralized hub displaying total balances, recent transactions, and visual expense breakdowns.
* **Account Management:** Visually track linked cards (Visa, RuPay) and individual balances.
* **Expense Tracking:** Monthly summary charts comparing total income versus total spent.
* **Goals & Bills:** Built-in tools to track savings goals and keep an eye on upcoming bills.

## 💻 Tech Stack
* **Frontend:** React, Vite, Axios, HTML/CSS
* **Backend:** Java, Spring Boot, Spring Data JPA
* **Database:** MySQL

## 📸 Screenshots

*(Replace the filenames in the parentheses with your actual image names)*

### Register User
![Register View](screenshots/register.png)

### Login User
![Login View](screenshots/login.png)

### Dashboard
![Dashboard View](screenshots/dashboard.png)

### Account Balances
![Balances View](screenshots/balance.png)

### Transactions
![Transaction View](screenshots/transaction.png)

### Upcoming Bills
![Bills View](screenshots/bill.png)

### Expenses Breakdown
![Expenses View](screenshots/expenses.png)

### Finance Goals
![Goals View](screenshots/goal.png)

### Notification alerts
![Notification View](screenshots/notification.png)

## 🛠️ Local Setup Instructions

### Prerequisites
* Java Development Kit (JDK)
* Node.js and npm
* MySQL Server

### Backend Setup
1. Navigate to the `backend` directory.
2. Open `src/main/resources/application.properties` and configure your local MySQL database credentials (username and password).
3. Run the application via your preferred IDE (Spring Tool Suite, Eclipse, IntelliJ) or using Maven.

### Frontend Setup
1. Open a new terminal and navigate to the `frontend` directory.
2. Run `npm install` to download all necessary dependencies.
3. Run `npm run dev` to start the Vite development server.
4. Open your browser and navigate to the local host address provided in the terminal (usually `http://localhost:5173`).
