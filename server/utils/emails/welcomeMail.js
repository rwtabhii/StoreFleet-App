// Import the necessary modules here
// import { createTransport } from "nodemailer";
// import env from "../../dotenv.js";
// export const sendWelcomeEmail = async (user) => {
//   // Write your code here
//   // console.log(process.env.STORFLEET_SMPT_MAIL);
//   const transport = createTransport({
//     service: env.SMTP_SERVICE,
//     auth: {
//       user: env.SMTP_MAIL,
//       pass: env.SMTP_MAIL_PASSWORD
//     }
//   });

//   // mail data it contain how we are sending the mail to new user 
//   const mailData = ({
//     from: env.SMTP_MAIL,
//     to: user.email,
//     subject: "Welcome to Storefleet",
//     html: ` <!DOCTYPE html>
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
//   <body>
//     <div class="container">
//       <div class="header">
//         <img
//           class="logo"
//           src="https://files.codingninjas.in/logo1-32230.png"
//           alt="Storefleet Logo"
//         />
//         <h1>Welcome To Storefleet</h1>
//       </div>
//       <div class="content">
//         <p>Hello, ${user.name}</p>
//         <p>
//           Thank you for registering with Storefleet. We are excited to have you
//           as new member of our community.
//         </p>
//         <p><a class="button" href="">Get Started</a></p>
//       </div>
//     </div>
//   </body>
// </html>`
//   });


//   try {
//     // console.log(process.env.SMPT_SERVICE)
//     await transport.sendMail(mailData);
//     console.log("Welcome Mail send successfully")
//   } catch (err) {
//     console.log("Error : Unable to Send Welcome Email\n" + err)
//   }

// };

// resend mail use for production 
// import { Resend } from "resend";
// import env from "../../dotenv.js";

// const resend = new Resend(env.RESEND_API_KEY);

// export const sendWelcomeEmail = async (user) => {
//   console.log("Welcome Email Function Called");

//   try {
//     await resend.emails.send({
//       from: "Storefleet <onboarding@resend.dev>", // works without domain
//       to: user.email,
//       subject: "Welcome to Storefleet",

//       html: `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//           <meta charset="UTF-8">
//           <meta name="viewport" content="width=device-width, initial-scale=1.0">
//           <style>
//               body { font-family: Arial, sans-serif; }
//               .container { max-width: 600px; margin: auto; padding: 20px; }
//               .header { text-align: center; }
//               .logo { max-width: 150px; }
//               .content { margin-top: 20px; }
//               .button {
//                   display: inline-block;
//                   padding: 10px 20px;
//                   background-color: #20d49a;
//                   color: #ffffff;
//                   text-decoration: none;
//                   border-radius: 5px;
//               }
//               @media only screen and (max-width: 600px) {
//                   .container { padding: 10px; }
//                   .logo { max-width: 100px; }
//                   .button { display: block; margin-top: 10px; }
//               }
//           </style>
//       </head>

//       <body>
//         <div class="container">
//           <div class="header">
//             <img
//               class="logo"
//               src="https://files.codingninjas.in/logo1-32230.png"
//               alt="Storefleet Logo"
//             />
//             <h1>Welcome To Storefleet</h1>
//           </div>

//           <div class="content">
//             <p>Hello, ${user.name}</p>
//             <p>
//               Thank you for registering with Storefleet.
//               We are excited to have you as a new member of our community.
//             </p>
//             <p>
//               <a class="button" href="http://localhost:5173">
//                 Get Started
//               </a>
//             </p>
//           </div>
//         </div>
//       </body>
//       </html>
//       `,
//     });

//     console.log("Welcome Email sent successfully");
//   } catch (err) {
//     console.log("Error sending Welcome Email:", err);
//   }
// };

// brevo with nodemailer 
import { createTransport } from "nodemailer";
import env from "../../dotenv.js";
export const sendWelcomeEmail = async (user) => {
  // Write your code here
  // console.log(process.env.STORFLEET_SMPT_MAIL);
  const transport = createTransport({
    host: env.SMTP_SERVICE,
    port : env.SMTP_PORT,
    auth: {
      user: env.SMTP_MAIL,
      pass: env.SMTP_MAIL_PASSWORD
    }
  });

  // mail data it contain how we are sending the mail to new user 
  const mailData = ({
    from: env.SMTP_MAIL,
    to: user.email,
    subject: "Welcome to Storefleet",
    html: ` <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                /* Add your custom CSS styles here */
                body {
                    font-family: Arial, sans-serif;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .header {
                    text-align: center;
                }
                .logo {
                    max-width: 150px;
                }
                .content {
                    margin-top: 20px;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #20d49a;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                }
                /* Mobile Responsive Styles */
                @media only screen and (max-width: 600px) {
                    .container {
                        padding: 10px;
                    }
                    .logo {
                        max-width: 100px;
                    }
                    .button {
                        display: block;
                        margin-top: 10px;
                    }
                }
            </style>
        </head>
  <body>
    <div class="container">
      <div class="header">
        <img
          class="logo"
          src="https://files.codingninjas.in/logo1-32230.png"
          alt="Storefleet Logo"
        />
        <h1>Welcome To Storefleet</h1>
      </div>
      <div class="content">
        <p>Hello, ${user.name}</p>
        <p>
          Thank you for registering with Storefleet. We are excited to have you
          as new member of our community.
        </p>
        <p><a class="button" href="">Get Started</a></p>
      </div>
    </div>
  </body>
</html>`
  });


  try {
    // console.log(process.env.SMPT_SERVICE)
    await transport.sendMail(mailData);
    console.log("Welcome Mail send successfully")
  } catch (err) {
    console.log("Error : Unable to Send Welcome Email\n" + err)
  }

};
