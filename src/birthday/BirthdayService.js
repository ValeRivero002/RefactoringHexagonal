// domain/BirthdayService.js
export class BirthdayService {
  constructor(employeeRepository, emailService) {
    this.employeeRepository = employeeRepository;
    this.emailService = emailService;
  }

  sendBirthdayGreeting(ourDate, smtpUrl, smtpPort, transport) {
    const employees = this.employeeRepository.findEmployeesWithBirthday(ourDate);
  
    employees.forEach((employee) => {
      this.emailService.sendBirthdayGreeting(employee, smtpUrl, smtpPort, transport);
    });
  }
  
}
