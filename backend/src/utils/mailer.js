// mailer.js
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: 'Gmail', // or any other email service
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // your email password
  },
});

const sendOTP = (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
    html: `<h4>Your OTP code is <h1>${otp}</h1></h4>`
  };

  return transporter.sendMail(mailOptions);
};

export default sendOTP;
