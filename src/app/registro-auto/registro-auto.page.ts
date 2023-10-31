import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { RegistrosAuto } from 'src/app/services/registrar_autos/registrar_autos';
import { RegistrarAuto } from 'src/app/modelos/registro_auto';


@Component({
  selector: 'app-registro-auto',
  templateUrl: './registro-auto.page.html',
  styleUrls: ['./registro-auto.page.scss'],
  providers: [RegistrosAuto]

})
export class RegistroAutoPage {
  
  formularioRegistroAuto: FormGroup; // Utiliza un FormGroup para el formulario
  route: any;

  constructor(
    private alertController: AlertController,
    private registrador: RegistrosAuto,
    private fb: FormBuilder
  ) {
    // Inicializa el formulario con las propiedades y las validaciones
    this.formularioRegistroAuto = this.fb.group({
      patente: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      color: ['', Validators.required],
      cant_asiento: [''],
    });
  }

  async guardarAuto() {
    if(!this.formularioRegistroAuto){ 
      console.error('Error this.formulario... no deifinido...');
      this.route.navigate(['/registro']);
      return;
    }
    if (this.formularioRegistroAuto.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Por favor, llenar todos los campos obligatorios.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    // Obtén los valores del formulario
    const formDataAuto = this.formularioRegistroAuto.value;

    // Llama a la función para guardar los datos
    this.registrador.guardarAuto(formDataAuto).subscribe(
      (resultado) => {
        console.log('Registro guardado con éxito:', resultado);
      },
      (error ) => {
        console.error('Error al guardar el registro:', error);
      }
    );
  }
}

