import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  paramSubscription : any;
  positionSubscription : any;
  savePositionSubscription : any;
  position : Position[];
  successMessage : boolean = false;
  failMessage : boolean = false
  
  constructor() { // inject services

   }

  ngOnInit(): void {
  }

}
