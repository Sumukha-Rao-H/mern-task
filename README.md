# MERN Authentication System (Task 2)

## 📋 Overview
A secure full-stack MERN application implementing **Sign Up**, **Login**, and a **Protected Dashboard** using JWT authentication.  
Passwords are hashed using **bcryptjs**, and JWTs are verified via middleware for protected routes.  
Frontend uses **React + Tailwind CSS v4** for a modern, responsive UI.

---

## 🧱 Tech Stack

### **Frontend**
- React (Vite)
- Tailwind CSS v4
- Axios
- React Router DOM

### **Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- bcryptjs (password hashing)
- jsonwebtoken (JWT auth)
- dotenv, cors

### **Database**
- MongoDB (Dockerized using `start_mongo.sh`)

---

## ⚙️ Features
✅ Secure user registration (hashed passwords)  
✅ User login with JWT (1-hour expiry)  
✅ Protected dashboard (only accessible with valid token)  
✅ Modern dark-themed UI built with Tailwind CSS  
✅ Persistent MongoDB using Docker volumes  

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/sumukhariot/mern-auth-task2.git
cd mern-auth-task2
```

### 2️⃣ Start MongoDB in Docker
```bash
cd backend
chmod +x start_mongo.sh
./start_mongo.sh
```

### 3️⃣ Start Backend Server
```bash
npm install
npm run dev
```

### 4️⃣ Start Frontend
```bash
cd ../frontend
npm install
npm run dev
```

Access the app at [http://localhost:5173](http://localhost:5173)

---

## 🧪 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/signup` | Register a new user |
| POST | `/login` | Login and receive JWT |
| GET | `/auth` | Verify JWT and fetch user data |

---

## 🖼️ UI Screenshots
- Sign Up Page  
- Login Page  
- Protected Dashboard  

(*Add screenshots here once captured*)

---

## 🧠 References
- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/docs/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

---

## 👤 Author
**Sumukha Rao H**  
📚 MERN Stack Developer — Student Project (Task 2)  
🔗 [GitHub Repository](https://github.com/Sumukha-Rao-H/mern-task)
