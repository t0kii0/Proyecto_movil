import { Component, OnInit } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { ModelViajes } from '../modelos/Viajes';
import { ApiService } from '../services/user_services';

@Component({
  selector: 'app-disponible',
  templateUrl: './disponible.page.html', 
  styleUrls: ['./disponible.page.scss'],
})
export class DisponiblePage implements OnInit {

  viajeInfo: Observable<ModelViajes | null>;
  viaje_id!: any;

  constructor(private _viajeService: ApiService) { 
    this._viajeService.getViaje(this.viaje_id)
    .subscribe((viajeModel: ModelViajes | null) => {
      if (viajeModel) {
        console.log('Datos del viaje:', viajeModel);
  
        // Realiza la conversión si es necesario y asigna a viajeInfo
          return  {
          id_viaje: viajeModel.id_viaje,
          origen: viajeModel.origen,
          destino: viajeModel.destino,
          asientos_disp: viajeModel.asientos_disp,
          estado: viajeModel.estado
        };
      } else {
        console.error('No se encontraron datos para el viaje con id ' + this.viaje_id);
        return null;
      }
    });
    switchMap(data => of(data));
  }

  ngOnInit() {
  }
  
}
