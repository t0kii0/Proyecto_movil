import { Component} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { RegistrosPasajeros } from 'src/app/services/registrar-pasajeros/registrar-pasajero';
import { RegistrarPasajero } from 'src/app/modelos/registro_pasajero';

@Component({
  selector: 'app-registro-pasajero',
  templateUrl: './registro-pasajero.page.html',
  styleUrls: ['./registro-pasajero.page.scss'], 
  providers: [RegistrosPasajeros]
})
export class RegistroPasajeroPage{

  formularioRegistroPasajero: FormGroup; // Utiliza un FormGroup para el formulario

  constructor(
    private alertController: AlertController,
    private registrador: RegistrosPasajeros,
    private fb: FormBuilder
  ) { 
    // Inicializa el formulario con las propiedades y las validaciones
    this.formularioRegistroPasajero = this.fb.group({
      nombre_pas: ['', Validators.required],
      apellido_pas: ['', Validators.required],
      telefono: ['', Validators.required],
      pass_pasajero: ['', Validators.required],
    });
  }
  async guardarPasajero() {
    if(!this.formularioRegistroPasajero){ 
      console.error('Error this.formulario... no deifinido...');
      
      return;
    }
    if (this.formularioRegistroPasajero.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Por favor, llenar todos los campos obligatorios.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    // Obtén los valores del formulario
    const formDataAuto = this.formularioRegistroPasajero.value;

    // Llama a la función para guardar los datos
    this.registrador.guardarPasajero(formDataAuto).subscribe(
      (resultado = this.guardarPasajero) => {
        
        console.log('Registro guardado con éxito:', resultado);
        
      },
      (error ) => {
        console.error('Error al guardar el registro:', error);
      }
    );

  }

  

}
