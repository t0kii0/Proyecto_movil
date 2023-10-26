import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService} from '../services/user_services';
import { IUserLogin} from '../User/UserLogin';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })


   
  constructor (private api: ApiService){
  //constructor(public fb: FormBuilder,
    //public alertController: AlertController, private router: Router, private http: HttpClient, private ApiService: ApiService) {
    //this.formularioLogin = this.fb.group({
      //'nombre': new FormControl("", Validators.required),
      //'password': new FormControl("", Validators.required)
    //});
  }

  ngOnInit() {
    //this.ApiService.getData().subscribe(
      //(res) => {
        //console.log(res);
      //},
      //(error) => {
        //console.error('Error', error);
      //}
    //);
  }
  onLogin(form: IUserLogin) {
    this.api.getLogin(form).subscribe(data => {
      console.log(data);
    })
  }

  async ingresar() {
    //var f = this.formularioLogin.value;
    //const usuario = this.usuarios.find(u => u.nombre === f.nombre && u.password === f.password);

    //if (usuario) {
      //console.log('Ingreso exitoso');
      //this.router.navigate(['/home-usuario']);
      //const alert = await this.alertController.create({
        //header: 'Bienvenido ' + usuario.nombre,
        //message: 'Has ingresado correctamente',
        //buttons: ['Aceptar'],
      //});
      //await alert.present();
    //} else {
      //const alert = await this.alertController.create({
        //header: 'Datos incorrectos',
        //message: 'Los datos son incorrectos',
        //buttons: ['Aceptar'],
      //});
      //await alert.present();
    //}
  //}
}
}
