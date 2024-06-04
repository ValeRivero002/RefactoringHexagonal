// adapters/FileEmployeeRepository.js
import fs from "fs";
import path from "path";
import { Employee } from "./Employee.js";
import { EmployeeRepository } from "./EmployeeRepository.js";

export class FileEmployeeRepository extends EmployeeRepository {
  constructor(fileName) {
    super();
    this.fileName = fileName;
  }

  findEmployeesWithBirthday(date) {
    const data = fs.readFileSync(path.resolve(this.fileName), "UTF-8");
    const lines = data.split(/\r?\n/).slice(1);
    return lines
      .map((line) => this.createEmployeeFromLine(line))
      .filter((employee) => employee.isBirthday(date));
  }

  createEmployeeFromLine(line) {
    const employeeData = line.split(", ");
    return new Employee(
      employeeData[1],
      employeeData[0],
      employeeData[2],
      employeeData[3]
    );
  }
}
