"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployeeName = exports.deleteEmployeeByName = exports.displayEmployees = exports.saveEmployee = exports.getAllEmployees = exports.writeDataToFile = exports.FILE_PATH = exports.createEmployee = exports.Role = void 0;
const fs_1 = __importDefault(require("fs"));
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const input = (0, prompt_sync_1.default)();
var Role;
(function (Role) {
    Role["admin"] = "admin";
    Role["user"] = "user";
})(Role || (exports.Role = Role = {}));
const createEmployee = () => {
    const employeeName = input("Enter the employee name : ");
    const employeeAge = Number(input("Enter the employee age : "));
    const employeeRole = input("Enter the employee role(admin,user) : ");
    const employeePhoneNumber = Number(input("Enter the employee PhoneNumber : "));
    const employeeCity = input("Enter the employee city : ");
    const employeeZipcode = Number(input("Enter the employee zipcode : "));
    let finalrole;
    if (employeeRole == "admin") {
        finalrole = Role.admin;
    }
    else {
        finalrole = Role.user;
    }
    const employee = {
        name: employeeName,
        age: employeeAge,
        role: finalrole,
        phoneNumber: employeePhoneNumber,
        city: employeeCity,
        zipcode: employeeZipcode
    };
    return employee;
};
exports.createEmployee = createEmployee;
exports.FILE_PATH = "./data.json";
const writeDataToFile = (employeeDetails) => __awaiter(void 0, void 0, void 0, function* () {
    yield fs_1.default.promises.writeFile(exports.FILE_PATH, JSON.stringify(employeeDetails));
});
exports.writeDataToFile = writeDataToFile;
const getAllEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    let employeeDetails = [];
    try {
        const data = yield fs_1.default.promises.readFile(exports.FILE_PATH, 'utf-8');
        employeeDetails = (data && JSON.parse(data));
    }
    catch (error) {
        employeeDetails = [];
    }
    return employeeDetails;
});
exports.getAllEmployees = getAllEmployees;
const saveEmployee = (emp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let employeeDetails = yield (0, exports.getAllEmployees)();
        employeeDetails.push(emp);
        yield (0, exports.writeDataToFile)(employeeDetails);
    }
    catch (error) {
        console.log(error);
    }
});
exports.saveEmployee = saveEmployee;
const displayEmployees = (emp) => {
    // emp.forEach(employee => console.table(employee))
    console.table(emp);
};
exports.displayEmployees = displayEmployees;
const deleteEmployeeByName = (nameofEmp, employees) => __awaiter(void 0, void 0, void 0, function* () {
    employees = employees.filter((emp) => emp.name !== nameofEmp);
    yield (0, exports.writeDataToFile)(employees);
});
exports.deleteEmployeeByName = deleteEmployeeByName;
const updateEmployeeName = (nameOfEmp, newName, employees) => __awaiter(void 0, void 0, void 0, function* () {
    employees = employees.map((emp) => {
        if (emp.name === nameOfEmp) {
            emp.name = newName;
        }
        return emp;
    });
    yield (0, exports.writeDataToFile)(employees);
});
exports.updateEmployeeName = updateEmployeeName;
