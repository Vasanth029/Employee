import prompt from "prompt-sync";
const input = prompt();
import fs from "fs";

enum Role {
    admin="admin",
    user="user"

}

interface Employee{
    name:string,
    age:number,
    role:Role,
    phoneNumber:number,
    city:string,
    zipcode:number,
}

const createEmployee = ():Employee =>{
    
    let name1:string = input("Enter the employee name : ");
    let age1:number = Number(input("Enter the employee age : "));
    let role1:string = input("Enter the employee role(admin,user) : ")
    let phoneNumber1:number = Number(input("Enter the employee PhoneNumber : "));
    let city1:string = input("Enter the employee city : ");
    let zipcode1:number = Number(input("Enter the employee zipcode : "));

    let finalrole:Role;

    if(role1 == "admin"){
        finalrole = Role.admin;
    }
    else{
        finalrole = Role.user;
    }

    const emp1:Employee = {
        name:name1,
        age:age1,
        role:finalrole,
        phoneNumber:phoneNumber1,
        city:city1,
        zipcode:zipcode1
    }

    return emp1;
}



const FILE_PATH: string = "./data.json"

const saveEmployee = (emp:Employee):void=>{
    try {
        let employeeDetails:Employee[] = [];

        try {
            const data = fs.readFileSync(FILE_PATH,'utf-8');
            employeeDetails = JSON.parse(data) as Employee[];
        } catch (error) {
            employeeDetails = [];
        }
        
        employeeDetails.push(emp);

        fs.writeFileSync(FILE_PATH,JSON.stringify(employeeDetails))
        } catch (error) {
        console.log(error);
    }

}

const getAllEmployees = ():Employee[] =>{
    try {
        let employeeDetails:Employee[] = [];

        try {
            const data = fs.readFileSync(FILE_PATH,'utf-8');
            employeeDetails = JSON.parse(data) as Employee[];
        } catch (error) {
            employeeDetails = [];
        }       

        return employeeDetails;

    } catch (error) {
        console.log(error);
    }
    return [];
}


const displayEmployees =(emp: Employee[]) =>{

   // emp.forEach(employee => console.table(employee))

   console.table(emp);
}



const deleteEmployeeByName = (nameofEmp : string, employees:Employee[]):void =>{

    employees = employees.filter((emp)=>emp.name !== nameofEmp);

    fs.writeFileSync(FILE_PATH,JSON.stringify(employees))
}


const updateEmployeeName = (nameOfEmp:string, newName:string, employees:Employee[]):void =>{
    employees = employees.map((emp)=>{
        if(emp.name === nameOfEmp){
            emp.name = newName;
        }
        return emp;
    })
    fs.writeFileSync(FILE_PATH,JSON.stringify(employees))
}           


while(true){
    console.log("1. Create Employee");
    console.log("2. Get All Employees");
    console.log("3. Delete Employee By Name");
    console.log("4. Update Employee Name");
    console.log("5. Exit");

    let choice:number = Number(input("Enter your choice : "));

    let employees:Employee[] = getAllEmployees();
    switch(choice){

        
        case 1:
            const employee:Employee = createEmployee();
            saveEmployee(employee);
            break;
        case 2:
           
            displayEmployees(employees);
            break;
        case 3:
            const empNameToDel:string = input("Enter the employee name to delete : ");
            deleteEmployeeByName(empNameToDel,employees);
            let employeesAfterDel:Employee[] = getAllEmployees();
            displayEmployees(employeesAfterDel);    
            break;

        case 4: 
            const empNameToUpdate:string = input("Enter the employee name to update : ");
            const newName:string = input("Enter the new name : ");
            updateEmployeeName(empNameToUpdate,newName,employees);
            let employeesAfterUpdate:Employee[] = getAllEmployees();
            displayEmployees(employeesAfterUpdate);    
            break;
        case 5:
            console.log("Exiting the program...");  
            process.exit(0);
        default:
            console.log("Invalid choice. Please try again.");
            break;      
}
}