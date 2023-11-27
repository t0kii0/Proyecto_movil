import { Component, OnInit } from '@angular/core';
import { CrearViajes } from '../services/crear-viajes/registrar-viajes';
import { ModelViajes } from 'src/app/modelos/Viajes';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-mostrar-viajes',
  templateUrl: './disponible.page.html',
  styleUrls: ['./disponible.page.scss'],
})
export class DisponiblePage implements OnInit {
  viajes: ModelViajes[] = [];

  constructor(private obtenerViajes: CrearViajes, private router: Router, private alertController : AlertController ) { }

  ngOnInit() {
    this.obtenerViajes.obtenerTodosLosViajes().subscribe(
      (data: ModelViajes[]) => {
        this.viajes = data;
      },
      error => {
        console.error('Error al obtener los viajes', error);
      }
    );
  }
  async tomarViaje(viaje: any) {
    // Verifica si hay asientos disponibles en el viaje específico
    if (viaje.asientos_disp > 0) {
  
      // Decrementa los asientos disponibles del viaje específico
      viaje.asientos_disp--;
  
      // Llama a la función para actualizar los asientos en la base de datos
      this.obtenerViajes
        .actualizarAsientosDisponibles(viaje.id_viaje, viaje.asientos_disp)
        .subscribe(
          async (data: any) => {
            console.log('Asientos actualizados en la base de datos:', data);
  
            // Muestra una alerta si la operación se realiza correctamente
            const alert = await this.alertController.create({
              header: 'Éxito',
              message: 'Asientos actualizados correctamente',
              buttons: ['OK']
            });
            await alert.present();
          },
          async (error: any) => {
            if (error.status === 404) {
              console.error('No se encontró el viaje con ID:', viaje.id_viaje);
            } else {
              console.error('Error al actualizar asientos', error);
  
              // Muestra una alerta si hay un error
              const alert = await this.alertController.create({
                header: 'Error',
                message: 'No se pudo actualizar los asientos',
                buttons: ['OK']
              });
              await alert.present();
            }
          }
        );
    } else {
      console.log('No hay asientos disponibles para tomar en este viaje.');
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No hay asientos en este vehiculo',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
  
  
  verMap(){
    this.router.navigate(['./test']);
  }
}
