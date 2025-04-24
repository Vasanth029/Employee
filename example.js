"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const input = (0, prompt_sync_1.default)();
const fs_1 = __importDefault(require("fs"));
var Role;
(function (Role) {
    Role["admin"] = "admin";
    Role["user"] = "user";
})(Role || (Role = {}));
let name1 = input("Enter the employee name : ");
let age1 = Number(input("Enter the employee age : "));
let role1 = input("Enter the employee role(admin,user) : ");
let phoneNumber1 = Number(input("Enter the employee PhoneNumber : "));
let city1 = input("Enter the employee city : ");
let zipcode1 = Number(input("Enter the employee zipcode : "));
let finalrole;
if (role1 == "admin") {
    finalrole = Role.admin;
}
else {
    finalrole = Role.user;
}
const emp1 = {
    name: name1,
    age: age1,
    role: finalrole,
    phoneNumber: phoneNumber1,
    city: city1,
    zipcode: zipcode1
};
const FILE_PATH = "./data.json";
const saveEmployee = (emp) => {
    try {
        let employeeDetails = [];
        try {
            const data = fs_1.default.readFileSync(FILE_PATH, 'utf-8');
            employeeDetails = JSON.parse(data);
        }
        catch (error) {
            employeeDetails = [];
        }
        employeeDetails.push(emp);
        fs_1.default.writeFileSync(FILE_PATH, JSON.stringify(employeeDetails));
    }
    catch (error) {
        console.log(error);
    }
};
saveEmployee(emp1);
const getAllEmployees = () => {
    try {
        let employeeDetails = [];
        try {
            const data = fs_1.default.readFileSync(FILE_PATH, 'utf-8');
            employeeDetails = JSON.parse(data);
        }
        catch (error) {
            employeeDetails = [];
        }
        return employeeDetails;
    }
    catch (error) {
        console.log(error);
    }
    return [];
};
let employees = getAllEmployees();
const displayEmployees = (emp) => {
    // emp.forEach(employee => console.table(employee))
    console.table(emp);
};
displayEmployees(employees);
const deleteEmployeeByName = (nameofEmp) => {
    employees = employees.filter((emp) => emp.name !== nameofEmp);
    fs_1.default.writeFileSync(FILE_PATH, JSON.stringify(employees));
};
const empNameToDel = input("Enter the employee name to delete : ");
deleteEmployeeByName(empNameToDel);
displayEmployees(employees);
