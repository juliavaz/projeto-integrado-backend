const nodemailer = require('nodemailer');

exports.send = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const emailInfo = {
      from: process.env.EMAIL_SENDER,
      to: options.email,
      subject: options.subject,
      html: options.html,
    };

    // TODO: uncomment the following line to actually send the email!!
    //const sentEmail = await transporter.sendMail(emailInfo);
    console.log(emailInfo);
  } catch (err) {
    console.log(err);
    return next(err);
  }
};
