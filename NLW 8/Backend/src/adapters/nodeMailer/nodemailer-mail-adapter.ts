import { MailAdapter, SendMailData } from "../mail-adapter";

import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail(data: SendMailData) {
    const { subject, body } = data;

    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Drack <onepessoa3@gmail.com>",
      subject,
      html: body,
    });
  }
}
