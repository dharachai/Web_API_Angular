
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Position } from "./position";
import { Observable } from "rxjs";

@Injectable()

export class PositionService {

  constructor(private http: HttpClient) { }

  getPositions() : Observable<Position[]>{
    return this.http.get<Position[]>("https://intense-peak-17143.herokuapp.com/positions");
  }

  getPosition(id) : Observable<Position[]>{
   return this.http.get<Position[]>("https://intense-peak-17143.herokuapp.com/position/"+id);
  }
  
  savePosition(position : Position): Observable<any>{
    return this.http.put<any>("https://intense-peak-17143.herokuapp.com/position/"+position._id, position);
  }
}
