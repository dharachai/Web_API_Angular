import { Injectable } from '@angular/core';
import { Employee } from "./employee";
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs";
import { EmployeeRaw } from "./employee-raw";

@Injectable()
export class EmployeeService {

  constructor(private http: HttpClient) { }
  
  getEmployees() : Observable<Employee[]>{
    return this.http.get<Employee[]>("https://intense-peak-17143.herokuapp.com/employees");
  }
  getEmployee(id) : Observable<EmployeeRaw[]>{
    return this.http.get<EmployeeRaw[]>("https://intense-peak-17143.herokuapp.com/employee-raw/"+id);

  }
  saveEmployee(employee : EmployeeRaw) : Observable<any>{
    return this.http.put<any>("hhttps://intense-peak-17143.herokuapp.com/employees/"+employee._id, employee);
  }
}
