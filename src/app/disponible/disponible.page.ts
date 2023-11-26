import {ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { ModelViajes } from '../modelos/Viajes';
import { ApiService } from '../services/user_services';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-disponible',
  templateUrl: './disponible.page.html', 
  styleUrls: ['./disponible.page.scss'],
})
export class DisponiblePage{

  viajeInfo: Observable<ModelViajes | any>;
  viaje_id!: any;
  

  constructor(private _viajeService: ApiService,private cdr: ChangeDetectorRef) {
    //this.viajeInfo = this._viajeService.getViaje(this.viaje_id); 
    this.viaje_id = JSON.parse(localStorage.getItem('viaje_id') || '') || '';
    console.log(JSON.stringify(this.viaje_id));
    console.log(localStorage.getItem('viaje_id'));
    this.viajeInfo = this._viajeService.getViaje(this.viaje_id);
  }
  
  ngOnInit() {
    //this.getViajeInfo();
  }
  async getViajeInfo(){
    console.log(this.viaje_id);
    
    if (this.viaje_id) {
      
      this.viajeInfo = this._viajeService.getViaje(this.viaje_id).pipe(
        catchError((error) => {
          console.log('Error al obtener el usuario', error);
          return of(null);
        }),
        tap((data) => {
          if (data) {
            console.log('viaje_id', data);
          } else {
            console.log('No se pudo obtener el viaje');
            console.log(this.viaje_id);
            console.log(data);
          }
          this.cdr.detectChanges();
        })
      );
    } else {
      console.log('user_id es undefined, no se puede realizar la solicitud a Supabase.');
    }
  } 
}
