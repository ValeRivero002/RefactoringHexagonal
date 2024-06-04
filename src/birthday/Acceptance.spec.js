import { BirthdayService } from "./BirthdayService.js";
import { FileEmployeeRepository } from "./FileEmployeeRepository.js";
import { SMTPEmailService } from "./SMTPEmailService.js";
import { InMemoryTransport } from "./InMemoryTransport.js";
import { OurDate } from "./OurDate.js";

describe("Acceptance", () => {
  const SMTP_PORT = 25;
  const SMTP_URL = "localhost";
  const FILENAME = "./src/birthday/employee_data.txt";
  let birthdayService;
  let emailService;
  let transport;

  beforeEach(() => {
    transport = new InMemoryTransport(); // Movido aquí
    emailService = new SMTPEmailService(SMTP_URL, SMTP_PORT, transport); // Corregido aquí
    const employeeRepository = new FileEmployeeRepository(FILENAME);
    birthdayService = new BirthdayService(employeeRepository, emailService);
  });

  it("base scenario", () => {
    birthdayService.sendBirthdayGreeting(
      new OurDate("2008/10/08"),
      SMTP_URL,
      SMTP_PORT,
      transport
    );

    expect(transport.messagesSent.length).toEqual(1);
    const message = transport.messagesSent[0];
    expect(message.text).toEqual("Happy Birthday, dear John!");
    expect(message.subject).toEqual("Happy Birthday!");
    const tos = message.to;
    expect(tos.length).toEqual(1);
    expect(tos[0]).toEqual("john.doe@foobar.com");
  });

  it("will not send emails when nobody's birthday", () => {
    birthdayService.sendBirthdayGreeting(
      new OurDate("2008/01/01"),
      SMTP_URL,
      SMTP_PORT,
      transport
    );

    expect(transport.messagesSent.length).toEqual(0);
  });

  it("uses correct transport", () => {
    birthdayService.sendBirthdayGreeting(
      new OurDate("2008/10/08"),
      SMTP_URL,
      SMTP_PORT,
      transport
    );

    const message = transport.messagesSent[0];
    expect(message.host).toEqual(SMTP_URL);
    expect(message.port).toEqual(SMTP_PORT);
  });
});
