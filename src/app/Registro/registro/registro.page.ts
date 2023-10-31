import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Registros } from '../../services/registrar_users/guardar_users';
import { Registrar } from 'src/app/modelos/registro_model'; 

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  providers: [Registros]
   
})
export class RegistroPage {

  formularioRegistro: FormGroup; // Utiliza un FormGroup para el formulario

  constructor(
    private alertController: AlertController,
    private registrador: Registros,
    private fb: FormBuilder
  ) {
    // Inicializa el formulario con las propiedades y las validaciones
    this.formularioRegistro = this.fb.group({ 
      patente: ['', Validators.required],
      name_cond: ['', Validators.required],
      apellido_cond: ['', Validators.required],
      pass_cond: ['', Validators.required],
      username_cond: [''],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async guardar() {
    if(!this.formularioRegistro){
      console.error('Error this.formulario... no deifinido...');
      return;
    }
    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Por favor, llenar todos los campos obligatorios.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    // Obtén los valores del formulario
    const formData = this.formularioRegistro.value;

    // Llama a la función para guardar los datos
    this.registrador.guardarUser(formData).subscribe(
      (resultado) => {
        console.log('Registro guardado con éxito:', resultado);
      },
      (error) => {
        console.error('Error al guardar el registro:', error);
      }
    );
  }
}
