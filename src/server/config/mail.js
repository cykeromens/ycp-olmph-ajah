// "use strict";
// const nodemailer = require("nodemailer");
const path = require('path');
//
// const Email = require('email-templates');
//
//
//
//
// // async..await is not allowed in global scope, must use a wrapper
// export async function sendMail(to, name, subject, message){
//   const email = new Email({
//     message: {
//       from: 'YCP-OLMPH, Ajah',
//       attachments: [
//         {
//           filename: 'text1.txt',
//           content: 'hello world!'
//         }
//       ]
//     }
//   });
//
//   email
//     .send({
//       template: path.join(__dirname, '..', 'mail', 'creationMail'),
//       message: {
//         to: to
//       },
//       locals: {
//         name: name
//       }
//     })
//     .then(console.log)
//     .catch(console.error);
//
//
//
//
//
//
//   // // Generate test SMTP service account from ethereal.email
//   // // Only needed if you don't have a real mail account for testing
//   let account = await nodemailer.createTestAccount();
//   //
//   // // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'zimesfield@gmail.com',
//       pass: 'Obianuju'
//     }
//   });
//
//   // setup email data with unicode symbols
//   let mailOptions = {
//     from: '"YCP-OLMPH, AJAH" <noreply@ycp-olmph.com>', // sender address
//     to: to, // list of receivers
//     subject: subject, // Subject line
//     text: message, // plain text body
//     html: "<b>message</b>" // html body
//   };
//
//   // send mail with defined transport object
//   let info = await transporter.sendMail(mailOptions);
//
//   console.log("Message sent: %s", info.messageId);
//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
// }


const nodemailer = require('nodemailer');
const fs = require('fs');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'zimesfield@gmail.com',
    pass: 'Obianuju'
  }
});


export async function sendMail(user, subject){
  fs.readFile(path.join(__dirname, '..', 'mail', 'creationEmail.html'), {encoding: 'utf-8'}, function (err, html) {
    if (err) {
      console.log(err);
    } else {
      const mailOptions = {
        from: 'YCP-OLMPH, AJAH',
        to: user.email,
        subject: subject,
        html: '<!DOCTYPE html>\n' +
          '<html>\n' +
          '    <head>\n' +
          '        <title>Account activation</title>\n' +
          '        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />\n' +
          '        <link rel="shortcut icon" />\n' +
          '    </head>\n' +
          '    <body>\n' +
          '        <p >\n' +
          '            Dear '+user.username+',\n' +
          '        </p>\n' +
          '        <p>\n' +
          '            Your YCP-OLMPH account has been created, please click on the URL below to activate it:\n' +
          '        </p>\n' +
          '        <p>\n' +
          '            <a href="http://localhost:9000/#/activate?key='+user.activationKey+'"\n' +
          '               >Activation Link</a>\n' +
          '        </p>\n' +
          '        <p>\n' +
          '            <span>Regards, </span>\n' +
          '            <br/>\n' +
          '            <em>YCP OLMPH, Ajah.</em>\n' +
          '        </p>\n' +
          '    </body>\n' +
          '</html>\n'
      };
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }
  });
}
