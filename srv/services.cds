using { ns.emp as employee } from '../db/employeeSchema';


service EmployeeService {
    entity Employee as select from employee.Employee
}
