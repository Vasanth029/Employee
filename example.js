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
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const input = (0, prompt_sync_1.default)();
const employeeOperations_1 = require("./employeeOperations");
let flag = 0;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    while (flag === 0) {
        console.log("1. Create Employee");
        console.log("2. Get All Employees");
        console.log("3. Delete Employee By Name");
        console.log("4. Update Employee Name");
        console.log("5. Exit");
        let choice = Number(input("Enter your choice : "));
        let employees = yield (0, employeeOperations_1.getAllEmployees)();
        switch (choice) {
            case 1:
                const employee = (0, employeeOperations_1.createEmployee)();
                yield (0, employeeOperations_1.saveEmployee)(employee);
                break;
            case 2:
                (0, employeeOperations_1.displayEmployees)(employees);
                break;
            case 3:
                const empNameToDel = input("Enter the employee name to delete : ");
                yield (0, employeeOperations_1.deleteEmployeeByName)(empNameToDel, employees);
                let employeesAfterDel = yield (0, employeeOperations_1.getAllEmployees)();
                (0, employeeOperations_1.displayEmployees)(employeesAfterDel);
                break;
            case 4:
                const empNameToUpdate = input("Enter the employee name to update : ");
                const newName = input("Enter the new name : ");
                yield (0, employeeOperations_1.updateEmployeeName)(empNameToUpdate, newName, employees);
                let employeesAfterUpdate = yield (0, employeeOperations_1.getAllEmployees)();
                (0, employeeOperations_1.displayEmployees)(employeesAfterUpdate);
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
});
main();
