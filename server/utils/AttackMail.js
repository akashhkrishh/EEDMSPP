const nodemailer = require('nodemailer');

const ASendMail = async (name,filename,ipaddress) => {

    // Create a transporter object using SMTP
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mailauthoritycenter@gmail.com', // Your email address
            pass: 'tbkwgpveksdntjof' // Your password
        }
    });
    // Setup email data
    const mailOptions = {
        from: 'mailauthoritycenter@gmail.com', // Sender address
        to: process.env.USER_MAIL, // List of recipients
        subject: 'Secret Key', // Subject line
        // text: `File Name:, Secret Key:  `, // Plain text body?
        // You can also use HTML in the email body:
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Template</title>
            <style>
                /* Reset styles */
                body, html {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                }
                /* Main container styles */
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
                /* Header styles */
                .header {
                    background-color: #000000;
                    padding: 20px;
                    text-align: center;
                }
                /* Content styles */
                .content {
                    padding: 20px;
                    background-color: #fff;
                }
                /* Footer styles */
                .footer {
                    background-color: #000000;
                    padding: 20px;
                    text-align: center;
                }
                .red {
                 color:red;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1 class='red'>File Hacked!</h1>
                </div>
                <div class="content">
                    <p>Hacker Name: <b>${name}</b>,</p>
                    <p>Your File: <b>${filename}</b></p>
                    <p>Hacker IP Address: <b class='red'>${ipaddress}</b></p>
                </div>
                <div class="footer">
                    // <p> </p>
                </div>
            </div>
        </body>
        </html>
        `
    };

    // Send email
    transporter.sendMail(mailOptions,(error, info) => {
     
        if (error) {
            console.error('Error occurred:', error);
        
        } else {
            console.log('Email sent:', info.response);
         
        }
    });

}

module.exports = ASendMail;

