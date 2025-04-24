import  prompt from "prompt-sync"
const input = prompt();
import fs from 'fs'

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

saveEmployee(emp1);

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

let employees:Employee[] = getAllEmployees();

const displayEmployees =(emp: Employee[]) =>{

   // emp.forEach(employee => console.table(employee))

   console.table(emp);
}

displayEmployees(employees);

const deleteEmployeeByName = (nameofEmp : string):void =>{

    employees = employees.filter((emp)=>emp.name !== nameofEmp);

    fs.writeFileSync(FILE_PATH,JSON.stringify(employees))
}

const empNameToDel:string = input("Enter the employee name to delete : ");
deleteEmployeeByName(empNameToDel)

displayEmployees(employees);