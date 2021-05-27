const nodemailer = require('nodemailer');
const pug = require('pug');

class EmailHandler {
  constructor(user) {
    this.user = user;

    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    this.email = {};
    this.email.to = user.email;
    this.email.from = process.env.EMAIL_FROM;
  }

  async send(subject, html) {
    try {
      this.email.subject = subject;
      this.email.html = html;

      if (process.env.NODE_ENV === 'production') {
        const sentEmail = await this.transporter.sendMail(this.email);
      } else {
        console.log(this.email);
      }
    } catch (err) {
      return next(err);
    }
  }

  async sendActivationEmail() {
    const renderedHtml = pug.renderFile(`${__dirname}/../views/emails/accountActivation.pug`, {
      link: `${process.env.FRONTEND_URL}/auth/activate/${this.user.token}`,
    });
    await this.send('Activate your account', renderedHtml);
  }

  async sendPasswordRecoveryEmail() {
    const renderedHtml = pug.renderFile(`${__dirname}/../views/emails/passwordRecovery.pug`, {
      link: `${process.env.FRONTEND_URL}/users/reset-password/${this.user.resetToken}`,
    });
    await this.send('Password Recovery', renderedHtml);
  }
}

module.exports = EmailHandler;
