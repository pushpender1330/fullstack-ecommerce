# 🛒 EKart – Full Stack E‑commerce Application

EKart is a **full‑stack e‑commerce web application** built using **Angular** for the frontend and **NestJS** for the backend. The project follows modern best practices such as **JWT authentication**, **role‑based access control**, **clean architecture**, and **RESTful APIs**.

This repository is ideal for learning and showcasing a **real‑world Angular + NestJS application**.

---

## 🚀 Features

### 👤 Authentication & Authorization

* User registration & login
* JWT‑based authentication
* Role‑based access control (USER / ADMIN)
* Secure password hashing (bcrypt)
* Token validation using Guards

### 🛍 User Features

* Browse products
* Add/remove products from cart
* Place orders
* View order history

### 🛠 Admin Features

* View all users
* Promote or revoke admin access
* View all orders

### ⚙ Backend Highlights

* Modular NestJS architecture
* TypeORM with relational database
* Guards for authentication & authorization
* Clean separation of concerns
* Environment‑based configuration

---

## 🧰 Tech Stack

### Frontend

* **Angular (v20+)**
* **Tailwind CSS**
* Angular Signals
* Angular Control Flow (`@if`, `@for`)
* RxJS

### Backend

* **NestJS**
* **TypeORM**
* **JWT Authentication**
* **PostgreSQL / MySQL** (configurable)
* bcrypt

---

## 📁 Project Structure

```
ekart/
│
├── frontend/           # Angular application
│   ├── src/app/
│   ├── components/
│   ├── services/
│   └── guards/
│
├── backend/            # NestJS application
│   ├── src/modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── products/
│   │   ├── orders/
│   │   └── cart/
│   ├── guards/
│   ├── typeorm/
│   └── main.ts
│
└── README.md
```

---

## 🔐 Authentication Flow

1. User logs in
2. Backend validates credentials
3. JWT token is generated
4. Token is sent in `Authorization: Bearer <token>`
5. Guard validates token on each protected request

---

## 🧪 API Security

* Guards for protected routes
* Role checks for admin APIs
* Token invalidation on role change
* Environment‑based secrets

---

## ⚙ Environment Variables

### Backend (`.env`)

```
PORT=3000
DB_USERNAME=your_db_username_mysql
DB_PASSWORD=your_db_password_mysql
JWT_SECRET=supersecretkey

```

---

## ▶️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/ekart.git
cd ekart
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run start:dev
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
ng serve
```

Frontend will run on:

```
http://localhost:4200
```

Backend will run on:

```
http://localhost:3000
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---


## ⭐ Show Your Support

If you like this project, please ⭐ the repository — it helps a lot!

---

### 👨‍💻 Built with ❤️ using Angular & NestJS
