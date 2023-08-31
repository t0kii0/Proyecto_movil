import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  formularioRecuperar: FormGroup;
  constructor(public fb: FormBuilder,
    public alertController: AlertController) {
      this.formularioRecuperar = this.fb.group({
        'nombreUsuario' : new FormControl("",Validators.required)  
      }) 
     }

  ngOnInit() {
  }
  async guardar(){
    var f = this.formularioRecuperar.value;

    if(this.formularioRecuperar.invalid){
     const alert = await this.alertController.create({
       header: 'Datos incompletos',
       message: 'Porfavor llenar todos los campos',
       buttons: ['Aceptar'],
     });
     await alert.present();
     return;
    }
    var usuario = {
     nombreUsuario: f.nombreUsuario,
    }
    localStorage.setItem('usuario',JSON.stringify(usuario));
  }
}
