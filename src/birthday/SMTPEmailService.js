// adapters/SMTPEmailService.js
import { EmailService } from "./EmailService.js";

export class SMTPEmailService extends EmailService {
  constructor(smtpUrl, smtpPort, transport) {
    super();
    this.smtpUrl = smtpUrl;
    this.smtpPort = smtpPort;
    this.transport = transport;
  }

  sendBirthdayGreeting(employee) {
    const message = {
      host: this.smtpUrl,
      port: this.smtpPort,
      from: "sender@here.com",
      to: [employee.getEmail()],
      subject: "Happy Birthday!",
      text: `Happy Birthday, dear ${employee.getFirstName()}!`,
    };
    this.transport.sendMail(message);
  }
}
