import Users from '../Models/userSchema.js';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

export const verifyResetToken = async (req, res, next) => {
    try {
    const { token } = req.params;
  
    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }
  
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  
    const user = await Users.findOne({
        resetToken: hashedToken,
        resetTokenExpiry: { $gt: Date.now() },
    });
  
    if (!user) {
        return res.status(400).json({ message: 'Invalid or expired password reset token' });
    }
  
    req.user = user; // Attach user to request object
    next();
    } catch (err) {
      res.status(500).json({ message: 'Error verifying reset token', error: err.message });
    }
};

