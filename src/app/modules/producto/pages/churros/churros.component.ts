import { Component } from '@angular/core';
import { Cards } from 'src/app/models/cards';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-churros',
  templateUrl: './churros.component.html',
  styleUrls: ['./churros.component.css']
})
export class ChurrosComponent {
  public info: Cards[];

  constructor() {
    this.info = [

      {
        idProducto: "churro-clasico",
        nombre: "⊹ ࣪ ˖Clásico ˚⊹⋆",
        precio: 200,
        descripccion: "¡Largo y crujiente, espolvoreado con azúcar y canela!",
        imagen: "./assets/churronormal.png",
        alt: "Churro Clásico"
      },
      {
        idProducto: "churro-dulce-leche",
        nombre: "⊹ ࣪˖Dulce de Leche ₊˚⊹⋆",
        precio: 250,
        descripccion: "¡Relleno con mucho dulce de leche!",
        imagen: "./assets/churrosdulcedeleche.png",
        alt: "Churro Relleno de Dulce de Leche"
      },
      {
        idProducto: "churro-chocolate",
        nombre: "⊹ ࣪ Chocolate ˖ ⊹⋆",
        precio: 300,
        descripccion: "¡Cubierto de chocolate!",
        imagen: "./assets/churrodechocolate.png",
        alt: "Churro con Chocolate"
      },
      {
        idProducto: "churro-nyc",
        nombre: "⊹ ˖₊NEW YORK CITY˚⊹⋆",
        precio: 850,
        descripccion: "¡Relleno con crema de avellanas, un clásico moderno!",
        imagen: "./assets/churronyk.png",
        alt: "Churro NYC"
      },
      {
        idProducto: "churro-fruta",
        nombre: "⊹ ࣪ Fruta˖₊⊹⋆",
        precio: 700,
        descripccion: "¡Con un toque de sabor a frutas como fresa o banana!",
        imagen: "./assets/confruta.png",
        alt: "Churro de Fruta"
      },
      {
        idProducto: "churro-helado",
        nombre: "⊹ ࣪ ⋆ Helado˖₊˚⊹",
        precio: 900,
        descripccion: "¡Servido caliente con una bola de helado, una combinación riquisima",
        imagen: "./assets/churrohelado.png",
        alt: "Churro con Helado"
      }

    ]
  }
}