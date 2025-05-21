import Users from '../Models/userSchema.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail.js';

dotenv.config();

// register user
export const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new Users({  email, password: hashPassword });
        await newUser.save();
        res.status(200).json({message: "User Registered Successfully!"})
        const userExists = await Users.findOne({ email });
        if (userExists) return res.status(400).json({ message:"email already exist"})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
 
//login details
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ message: "Invalid Password" });

    const token = jwt.sign(
    { _id: user._id},
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Logged In Successfully!", token })
    } catch (error) {
      res.status(500).json({message: error.message})
    } 
    
}

// forgetpassword reset

export const forgetpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Users.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
   
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  
    user.resetToken = hashedToken;
    user.resetTokenExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();
    res.status(200).json({ message : "link is sent to ur email",resetToken})

    const resetLink = `${process.env.BASE_URL}/reset-password/${resetToken}`;
    const emailHTML = `
      <p>You requested a password reset:</p>
      <a href="${resetLink}">Click here to reset your password</a>
    `;

    await sendEmail(user.email, 'Password Reset Link', emailHTML);
    res.status(200).json({ message: "reset link sent to email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
  
// Reset password
export const resetPassword = async (req, res) => {
  try {
    const{ resetToken } = req.params;
    const { password } = req.body;
    const user = req.user;
  
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
  
    // if (!req.user) return res.status(400).json({ message: "Invalid or expired token" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();
  
  res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


        
  
