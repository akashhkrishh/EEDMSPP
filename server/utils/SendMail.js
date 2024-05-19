const nodemailer = require('nodemailer');

const SendMail = async (username,filename, secretkey) => {

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
                    background-color: #f0f0f0;
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
                    background-color: #f0f0f0;
                    padding: 20px;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>File Uploaded Successfully!</h1>
                </div>
                <div class="content">
                    <p>Hello <b>${username}</b>,</p>
                    <p>Your File : <b>${filename}</b></p>
                    <p>Secret Key : <b>${secretkey}</b></p>
                </div>
                <div class="footer">
                    <p><b><i>Mail from Authority Center</i></b>.</p>
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

module.exports = SendMail;

