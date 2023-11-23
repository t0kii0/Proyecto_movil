import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { UserPasajero } from '../modelos/UserPasajero';
import { Observable, of } from 'rxjs';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})
export class HomePage {



  constructor() 
  {}


  ngOnInit() {  
 
    //this.getUserInfo();
  }
}
 
  



 