import nodemailer from "nodemailer";
import config from "../config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: config.NODE_ENV === "production",
  auth: {
    user: config.EMAIL_HOST_USER,
    pass: config.EMAIL_HOST_PASS,
  },
});

/**
 *
 * @param to mail receiver email address
 * @param htmlBody main content, it't html string like "<b>Hello world?</b>"
 */
const sendEmail = async (to: string, htmlBody: string) => {
  await transporter.sendMail({
    from: config.EMAIL_HOST_USER, // sender address
    to: to, // list of receivers
    subject: "Reset your password within ten mins!", // Subject line
    text: "", // plain text body
    html: htmlBody, // html body
  });
};

export default sendEmail;
