"use server";

// import { Resend } from "resend";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail({ to, subject, react }) {

  try {
    // const data = await resend.emails.send({
    //   from: "Finance App <onboarding@resend.dev>",
    //   to,
    //   subject,
    //   react,
    // });

  const data = await  transporter.sendMail(
  {
    from: "Finance App <onboarding@resend.dev>",
    to,
    subject,
    // text: react,
    html: react,
  },
  // (err, info) => {
  //   if (err) {
  //     console.error(err);
  //     return;
  //   }
  //   console.log(info.envelope);
  //   console.log(info.messageId);
  // }
);
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}
