import express from 'express';
import { forgetpassword, loginUser, register, resetPassword } from '../Controllers/authController.js';
import { verifyResetToken } from '../Middleware/verifyResetToken.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', loginUser);
router.post("/forgot-password", forgetpassword);
router.post("/reset-password/:token", verifyResetToken , resetPassword);

router.get('/test',(req,res)=>{
    res.json({message:"api is working"});
})


export default router;