import { Component, OnInit, OnDestroy } from '@angular/core';
import { Position } from '../data/position';
import { PositionService } from '../data/position.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit, OnDestroy {

  positions  : Position[];
  private getPositionsSub : any;
  loadingError  : boolean = false;

  //Inject Router from @angular/router 
  constructor(private PositionService: PositionService, private router: Router) { }

  ngOnInit() {
    this.getPositionsSub = this.PositionService.getPositions().subscribe (data => {
      this.positions = data;
    }, error =>{
      this.loadingError = true;
    });
  }

  routePosition(id: string) { //use the Injected router instance to "navigate" the to the /position/id route 
    this.router.navigate(['/position/', id]);
  }

  ngOnDestroy(){
    console.log(this.getPositionsSub);
    if(this.getPositionsSub != 'undefined'){
      this.getPositionsSub.unsubscribe();
    }
  }
}
