import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
})
export class ViajesPage implements OnInit {
  origen: string = '';
  destino: string = '';
  patente: string = '';

  constructor() { }

  ngOnInit() {
  }

}
