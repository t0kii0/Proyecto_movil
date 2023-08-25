import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private alertController: AlertController) {}

  login() {
    // Aquí puedes agregar la lógica de autenticación
    console.log('Nombre de usuario:', this.username);
    console.log('Contraseña:', this.password);
  }

  async forgotPassword() {
    const alert = await this.alertController.create({
      header: 'Recuperación de contraseña',
      message: 'Ingresa tu dirección de correo electrónico para recuperar tu contraseña.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Correo electrónico',
        },
      ],
      buttons: [
        'Cancelar',
        {
          text: 'Enviar',
          handler: data => {
            console.log('Correo electrónico para recuperación:', data.email);
            // Aquí puedes agregar la lógica para enviar un correo de recuperación de contraseña
          },
        },
      ],
    });

    await alert.present();
  }
}