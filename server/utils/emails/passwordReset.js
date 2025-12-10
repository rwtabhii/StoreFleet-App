// // import nodemailer from "nodemailer";
// import env from "../../dotenv.js";
// export const sendPasswordResetEmail = async (user, resetPasswordURL) => {
//     console.log("password reset function inside")
//     console.log(env)
//   const transporter = nodemailer.createTransport({
//     service: env.SMTP_SERVICE,
//     auth: {
//       user: env.SMTP_MAIL,
//       pass: env.SMTP_MAIL_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: env.SMTP_MAIL,
//     to: user.email,
//     subject: "Password Reset",
//     html: `
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <style>
//                 /* Add your custom CSS styles here */
//                 body {
//                     font-family: Arial, sans-serif;
//                 }
//                 .container {
//                     max-width: 600px;
//                     margin: 0 auto;
//                     padding: 20px;
//                 }
//                 .header {
//                     text-align: center;
//                 }
//                 .logo {
//                     max-width: 150px;
//                 }
//                 .content {
//                     margin-top: 20px;
//                 }
//                 .button {
//                     display: inline-block;
//                     padding: 10px 20px;
//                     background-color: #20d49a;
//                     color: #ffffff;
//                     text-decoration: none;
//                     border-radius: 5px;
//                 }
//                 /* Mobile Responsive Styles */
//                 @media only screen and (max-width: 600px) {
//                     .container {
//                         padding: 10px;
//                     }
//                     .logo {
//                         max-width: 100px;
//                     }
//                     .button {
//                         display: block;
//                         margin-top: 10px;
//                     }
//                 }
//             </style>
//         </head>
//         <body>
//             <div class="container">
//                 <div class="header">
//                     <img class="logo" src="https://files.codingninjas.in/logo1-32230.png" alt="Storefleet Logo">
//                     <h1>Password Reset</h1>
//                 </div>
//                 <div class="content">
//                     <p>Hello, ${user.name}</p>
                    
//                     <p>You have requested to reset your password for your Storefleet account. To reset your password, please click the button below:</p>
//                     <p><a class="button" href="http://localhost:5173/reset-password/${resetPasswordURL}">Reset Password</a></p>
//                     <p>If you did not request a password reset, please ignore this email.</p>
//                 </div>
//             </div>
//         </body>
//         </html>
//     `,
//   };

//   await transporter.sendMail(mailOptions);
// };


// {/* <p> Enter this token to complete the reset : ${resetPasswordURL}</p> */}

// resend mail 

import { Resend } from "resend";
import env from "../../dotenv.js";
console.log(env)
const resend = new Resend(env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (user, resetPasswordURL) => {
  console.log("Password Reset Email Function Called");

  try {
    await resend.emails.send({
      from: "Storefleet <onboarding@resend.dev>",   // using Resend sandbox domain
      to: user.email,
      subject: "Password Reset",

      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
                body { font-family: Arial, sans-serif; }
                .container { max-width: 600px; margin: auto; padding: 20px; }
                .header { text-align: center; }
                .logo { max-width: 150px; }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background: #20d49a;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img class="logo" src="https://files.codingninjas.in/logo1-32230.png" />
                    <h1>Password Reset</h1>
                </div>
                <div class="content">
                    <p>Hello, ${user.name}</p>
                    <p>You requested to reset your password.</p>
                    <p>
                      <a class="button" href="http://localhost:5173/reset-password/${resetPasswordURL}">
                        Reset Password
                      </a>
                    </p>
                    <p>If you did not request this, ignore this email.</p>
                </div>
            </div>
        </body>
        </html>
      `,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email with Resend:", error);
  }
};

