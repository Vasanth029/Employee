import prompt from "prompt-sync";
const input = prompt();

import { getAllEmployees,createEmployee,saveEmployee,displayEmployees,deleteEmployeeByName,updateEmployeeName } from "./employeeOperations";
import { IEmployee} from "./employeeOperations";
let flag:number = 0

const main = async():Promise<void> =>{
while(flag === 0 ){
    console.log("1. Create Employee");
    console.log("2. Get All Employees");
    console.log("3. Delete Employee By Name");
    console.log("4. Update Employee Name");
    console.log("5. Exit");

    let choice:number = Number(input("Enter your choice : "));
    let employees:IEmployee[] = await getAllEmployees();

    switch(choice){
            
        case 1:
            const employee:IEmployee = createEmployee();
            await saveEmployee(employee);
            break;

        case 2:
            displayEmployees(employees);
            break;

        case 3:
            const empNameToDel:string = input("Enter the employee name to delete : ");
            await deleteEmployeeByName(empNameToDel,employees);
            let employeesAfterDel:IEmployee[] = await getAllEmployees();
            displayEmployees(employeesAfterDel);    
            break;

        case 4: 
            const empNameToUpdate:string = input("Enter the employee name to update : ");
            const newName:string = input("Enter the new name : ");
            await updateEmployeeName(empNameToUpdate,newName,employees);
            let employeesAfterUpdate:IEmployee[] = await getAllEmployees();
            displayEmployees(employeesAfterUpdate);    
            break;

        case 5:
            console.log("Exiting the program...");  
            flag = 1;
            break;

        default:
            console.log("Invalid choice. Please try again.");
            break;      
    }
}
}

main();