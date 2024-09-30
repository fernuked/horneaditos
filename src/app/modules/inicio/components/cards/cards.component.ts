import { Component } from '@angular/core';
import { Cards } from 'src/app/models/cards';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  public info: Cards[];
  
  constructor() {
    this.info = [
      {
        idProducto: "",
        nombre: "FACTURAS SURTIDAS˚",
        precio: 7.000,
        imagen: "./assets/facturas.png",
        alt: "",
        descripccion: ""
      },
      {
        idProducto: "",
        nombre: "CHURROS X DOC",
        precio: 4.000,
        imagen: "./assets/churros.png",
        alt: "",
        descripccion: ""
      },

      {
        idProducto: "",
        nombre: "SELVA NEGRA 1KG",
        precio: 10.000,
        imagen: "./assets/selvanegra.png",
        alt: "",
        descripccion: ""
      }
  
    ]
  }
  
}
