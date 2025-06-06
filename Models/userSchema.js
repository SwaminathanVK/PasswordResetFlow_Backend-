import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken : String,
    resetTokenExpiry: Date,
});

const User = mongoose.model("Users", userSchema);

export default User;