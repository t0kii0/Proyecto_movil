import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  usuarios = [
    { nombre: 'Manuu', correo: 'manu@gmail.com', password: 'manu150', rol: 'conductor' },
    { nombre: 'Angelo', correo: 'angelo@gmail.com', password: 'angelo150', rol: 'pasajero' },
  ];

  formularioRecuperar: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    private router: Router
  ) {
    this.formularioRecuperar = this.fb.group({
      'correo': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
  }

  async recuperar() {
    const recuperarClave = this.formularioRecuperar.value.correo;
    const buscador = this.usuarios.find((u) => u.correo === recuperarClave);

    if (!buscador) {
      const alert = await this.alertController.create({
        header: 'Correo invalido',
        message: 'Por favor ingrese un correo válido',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    } else {
      this.router.navigate(['/home-usuario']);
      const alert = await this.alertController.create({
        
        header: 'Su usuario es ' + buscador.nombre,
        message: 'Su clave es: ' + buscador.password,
        buttons: ['Aceptar'],
      });
      return await alert.present();
    }
  }
}
