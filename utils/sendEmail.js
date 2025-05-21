import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.PASS_EMAIL,
      pass: process.env.PASS_KEY,
    },
  });

  const sendEmail = async (to, subject, html) => {
    const mailOptions = { 
      from: process.env.PASS_EMAIL, 
      to,
      subject, 
      html };
    await transporter.sendMail(mailOptions);
}

export default sendEmail;