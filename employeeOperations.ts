import fs from "fs";
import prompt from "prompt-sync";
const input = prompt();

export enum Role {
    admin="admin",
    user="user"
}

export interface IEmployee{
    name:string,
    age:number,
    role:Role,
    phoneNumber:number,
    city:string,
    zipcode:number,
}

export const createEmployee = ():IEmployee =>{
    
    const employeeName:string = input("Enter the employee name : ");
    const employeeAge:number = Number(input("Enter the employee age : "));
    const employeeRole:string = input("Enter the employee role(admin,user) : ")
    const employeePhoneNumber:number = Number(input("Enter the employee PhoneNumber : "));
    const employeeCity:string = input("Enter the employee city : ");
    const employeeZipcode:number = Number(input("Enter the employee zipcode : "));

    let finalrole:Role;

    if(employeeRole == "admin"){
        finalrole = Role.admin;
    }
    else{
        finalrole = Role.user;
    }

    const employee:IEmployee = {
        name:employeeName,
        age:employeeAge,
        role:finalrole,
        phoneNumber:employeePhoneNumber,
        city:employeeCity,
        zipcode:employeeZipcode
    }

    return employee;
}

export const FILE_PATH: string = "./data.json"

export const writeDataToFile = async(employeeDetails:IEmployee[]):Promise<void> =>{
    await fs.promises.writeFile(FILE_PATH,JSON.stringify(employeeDetails))
}

export const getAllEmployees = async():Promise<IEmployee[]> =>{

        let employeeDetails:IEmployee[] = [];
        try {
            const data = await fs.promises.readFile(FILE_PATH,'utf-8');
            employeeDetails = data ? JSON.parse(data) : [];
        } catch (error) {
           console.log(error);
        }       
        return employeeDetails;
}

export const saveEmployee = async(emp:IEmployee):Promise<void> =>{
    try {
        let employeeDetails:IEmployee[] = await getAllEmployees();
        employeeDetails.push(emp);

        await writeDataToFile(employeeDetails)
        } catch (error) {
        console.log(error);
    }

}

export const displayEmployees =(emp: IEmployee[]):void =>{

   // emp.forEach(employee => console.table(employee))

   console.table(emp);
}

export const deleteEmployeeByName = async (nameofEmp : string, employees:IEmployee[]):Promise<void> =>{

    employees = employees.filter((emp)=>emp.name !== nameofEmp);

    await writeDataToFile(employees)
}


export const updateEmployeeName = async(nameOfEmp:string, newName:string, employees:IEmployee[]):Promise<void> =>{

    employees = employees.map((emp)=>{
        if(emp.name === nameOfEmp){
            emp.name = newName;
        }
        return emp;
    })
    await writeDataToFile(employees)
}           
