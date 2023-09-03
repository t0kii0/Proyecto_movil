import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usuarios = [
    { nombre: 'Manuu', correo: 'manu@gmail.com', password: 'manu150' },
    { nombre: 'Angelo', correo: 'angelo@gmail.com', password: 'angelo150' },
  ];

  getUsuarios() {
    return this.usuarios;
  }
}
