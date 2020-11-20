import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService } from "../data/employee.service";
//import { PositionService } from "../data/position.service";
import { Employee } from "../data/employee";
import { Router } from "@angular/router";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  
  employees  : Employee[];
  private getEmployeesSub;
  loadingError  : boolean = false;
  filteredEmployees: Employee[];

  constructor( //inject EmployeeService from employee.service
    private info : EmployeeService,
    private router : Router
  ) { }

  ngOnInit() {
    try {
      this.getEmployeesSub = this.info.getEmployees().subscribe(data => {
        this.employees = data;
        this.filteredEmployees = data;
      })
    }
    catch(err) {
      this.loadingError = true;
    }
  }
  ngOnDestroy() {
    if (this.getEmployeesSub != 'undefined') {
      this.getEmployeesSub.unsubscribe();
    }
  }

  routeEmployee(id: String) {
    this.router.navigate(['/employee/', id]);
  }

  // onEmployeeSearchKeyUP(event:any) {
  //   this.filteredEmployees = this.employees.filter((employee) => {
  //     return employee.FirstName.toLowerCase().includes(event.target.value) 
  //     || employee.LastName.toLowerCase().includes(event.target.value)
  //     || employee.Position.PositionName.toLowerCase().includes(event.target.value);
  //   });
  // }

  onEmployeeSearchKeyUP(event: any){
    let substring: string = event.target.value.toLowerCase();
    this.filteredEmployees = this.employees.filter((em) => 
    ((em.FirstName.toLowerCase().indexOf(substring) != -1) || 
    (em.LastName.toLowerCase().indexOf(substring) != -1) ||
    (em.Position["PositionName"].toLowerCase().indexOf(substring) != -1)))
  }
}
