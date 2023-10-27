import { Component, Injectable, OnInit } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormsModule
} from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ApiService} from '../services/user_services';
import { IUserLogin} from '../modelos/UserLogin';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [ApiService]
})
export class LoginPage implements OnInit {

  formularioLogin: IUserLogin = {
    username: '',
    password: ''
  }

  constructor(private route: Router, private _usuarioService: ApiService) {

  }
   
  //constructor (private api: ApiService){
  //constructor(public fb: FormBuilder,
    //public alertController: AlertController, private router: Router, private http: HttpClient, private ApiService: ApiService) {
    //this.formularioLogin = this.fb.group({
      //'nombre': new FormControl("", Validators.required),
      //'password': new FormControl("", Validators.required)
    //});
  //}

  ngOnInit(): void {
    this.formularioLoginRestart();
    //this.ApiService.getData().subscribe(
      //(res) => {
        //console.log(res);
      //},
      //(error) => {
        //console.error('Error', error);
      //}
    //);
  }
  onLogin(){}
    
  

  async ingresar() {


}
async userLogin(userLoginInfo: IUserLogin) {
  const user_id = await lastValueFrom(this._usuarioService.getLoginUser(userLoginInfo));
  console.log(user_id);
  if (user_id) {
    console.log("Usuario existe...");
    this.route.navigate(['/user-type-menu'], { state: { userInfo: user_id}})
  } else {
    //NO EXISTE
    console.log("Usuario no existe...");
  }
}
formularioLoginRestart():void{
  this.formularioLogin.username = '';
  this.formularioLogin.password = '';
}
}