import { Component, OnInit } from '@angular/core';
import { EmployeeRaw } from '../data/employee-raw';
import { EmployeeService } from '../data/employee.service';
import { ActivatedRoute } from '@angular/router';
import { PositionService } from '../data/position.service';
import { Position } from '../data/position';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  paramSubscription : any;
  employeeSubscription : any;
  getPositionsSubcription : any;
  saveEmployeeSubscription : any;
  employee : EmployeeRaw = new EmployeeRaw;
  positions : Position [];
  successMessage : boolean = false;
  failMessage : boolean = false;

  constructor( private employeeService : EmployeeService, 
    private route : ActivatedRoute, private PositionService : PositionService) { }

  ngOnInit(){
    //Determine what the value of the _id variable is in the Route parameter using the ActivatedRoute service 
    this.paramSubscription = this.route.params.subscribe(params => {
      console.log(params);
    
    //Use the value of _id to populate the "employee" property using the EmployeeService service
    this.employeeSubscription = this.employeeService.getEmployee(params['_id']).subscribe((emp) => {
        console.log(emp[0]);
        this.employee = emp[0];
    
    //o	populate the "positions" property using the PositionService service
    this.getPositionsSubcription = this.PositionService.getPositions().subscribe( data => {
          this.positions = data;
        })
      })
    });
  }

  onSubmit(): void {
    this.saveEmployeeSubscription = this.employeeService.saveEmployee(this.employee).subscribe(emp => {
      this.successMessage = true;
      setTimeout(()=>{this.successMessage = false}, 2500);
    }, error =>{
      this.failMessage = true;
      setTimeout(()=>{this.failMessage=false}, 2500);
    })
  }

  ngOnDestroy(){
    if (this.saveEmployeeSubscription != null) {this.saveEmployeeSubscription.unsubcribe()}
    if (this.getPositionsSubcription != null) {this.getPositionsSubcription.unsubscribe()}
    if (this.paramSubscription != null) {this.paramSubscription.unsubscribe()}
    if (this.employeeSubscription != null) {this.employeeSubscription.unsubscribe()}
  }
}
