using { ns.emp as employee } from '../db/employeeSchema';


service EmployeeService {
    entity Employee as select from employee.Employee;  
    entity MigrateEmployee as select from employee.MigrateEmployee; // An action named migrateEmployee is defined within the EmployeeService.

    // @readonly // This annotation this action does not modify any data
    action migrateEmployee(ID: String(15)) returns String;

}

