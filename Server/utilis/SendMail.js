/*
const nodemailer = require("nodemailer");

const sendMail = async options => {
  let transporter = nodemailer.createTransport({
    service: process.env.SMTP_HOST,
    auth: {
      user: process.env.SMTP_USERNAME, // generated ethereal user
      pass: process.env.SMTP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message
  };

  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
}

module.exports = sendMail;
*/
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "kamal.pandit772@outlook.com",
    pass: "6WJYcxLjYR@:r$L"
  }
})

const options = {
  from: "kamal.pandit772@outlook.com",
  to: "kamalnature772@gmail.com",
  subject: "Forgot password",
  text: "Hi bro"
};

transporter.sendMail(options, function(err, info){
  if(err){
    console.log(err)
    return;
  }
  console.log("sent" + info.response);
})