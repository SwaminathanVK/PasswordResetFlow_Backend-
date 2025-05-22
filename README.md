
---

### ✅ `README.md` for **Backend** (`/backend/README.md`):

```markdown
# 🔐 Password Reset App - Backend (Node.js)

This is the backend for the **Password Reset Flow** application. It provides RESTful APIs for user registration, login, password reset via email, and token validation.

## 🌐 Live API

➡️ [https://passwordresetflow-backend-om8g.onrender.com](https://passwordresetflow-backend-om8g.onrender.com)

---

## 🚀 Tech Stack

- **Node.js** with ESM support
- **Express.js**
- **MongoDB** with Mongoose
- **JWT** (JSON Web Tokens)
- **Bcrypt.js** (for hashing passwords)
- **Nodemailer** (for sending password reset emails)
- **dotenv** (Environment configuration)
- **Render** (Hosting)

---

## 📂 Folder Structure
backend/
├── controllers/
│ └── authController.js
├── models/
│ └── User.js
├── routes/
│ └── authRoutes.js
├── utils/
│ └── sendEmail.js
├── middleware/
│ └── validateToken.js
├── config/
│ └── db.js
├── server.js
├── .env


---

## 📌 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint                              | Description                        |
|--------|---------------------------------------|------------------------------------|
| POST   | `/api/register`                       | Register a new user                |
| POST   | `/api/login`                          | Login user and return JWT token    |
| POST   | `/api/forgot-password`                | Send password reset link to email  |
| POST   | `/api/reset-password/:token`          | Reset password using token         |

---

## ⚙️ Environment Variables

Create a `.env` file in the root of the backend project:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
FRONTEND_URL=https://passwordresetappfrontend.netlify.app

🧪 Test API with Postman
You can test all routes using Postman or Thunder Client by sending the correct payload to the listed endpoints.

🛰️ Deployment
Deployed on Render
➡️ https://passwordresetflow-backend-om8g.onrender.com

🧑‍💻 Author
Developed by Swaminathan VK with 💙

