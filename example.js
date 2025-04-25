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
const createEmployee = () => {
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
    return emp1;
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
const displayEmployees = (emp) => {
    // emp.forEach(employee => console.table(employee))
    console.table(emp);
};
const deleteEmployeeByName = (nameofEmp, employees) => {
    employees = employees.filter((emp) => emp.name !== nameofEmp);
    fs_1.default.writeFileSync(FILE_PATH, JSON.stringify(employees));
};
const updateEmployeeName = (nameOfEmp, newName, employees) => {
    employees = employees.map((emp) => {
        if (emp.name === nameOfEmp) {
            emp.name = newName;
        }
        return emp;
    });
    fs_1.default.writeFileSync(FILE_PATH, JSON.stringify(employees));
};
while (true) {
    console.log("1. Create Employee");
    console.log("2. Get All Employees");
    console.log("3. Delete Employee By Name");
    console.log("4. Update Employee Name");
    console.log("5. Exit");
    let choice = Number(input("Enter your choice : "));
    let employees = getAllEmployees();
    switch (choice) {
        case 1:
            const employee = createEmployee();
            saveEmployee(employee);
            break;
        case 2:
            displayEmployees(employees);
            break;
        case 3:
            const empNameToDel = input("Enter the employee name to delete : ");
            deleteEmployeeByName(empNameToDel, employees);
            let employeesAfterDel = getAllEmployees();
            displayEmployees(employeesAfterDel);
            break;
        case 4:
            const empNameToUpdate = input("Enter the employee name to update : ");
            const newName = input("Enter the new name : ");
            updateEmployeeName(empNameToUpdate, newName, employees);
            let employeesAfterUpdate = getAllEmployees();
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
