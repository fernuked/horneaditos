import { Component } from '@angular/core';
import { Cards } from 'src/app/models/cards';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-tortas',
  templateUrl: './tortas.component.html',
  styleUrls: ['./tortas.component.css']
})
export class TortasComponent { 
  public info: Cards[];

  constructor() {
    this.info = [
        {
          idProducto: "1", 
          nombre: "⊹ ࣪ Selva Negra ₊˚⊹⋆", 
          precio: 10000,  
          descripccion: "¡Torta de chocolate con crema y cerezas!",
          imagen: "./assets/seeelvanegra.png", 
          alt: "Selva Negra"  },
        {
          idProducto: "2",
          nombre: "⊹ ࣪ Cheesecake de Frutilla ₊˚⊹⋆",  
          precio: 8500,
          descripccion: "¡Tarta de queso y de frutillas!",  
          imagen: "./assets/cheescake.png",
          alt: "Cheesecake"
        },
        {
          idProducto: "3",
          nombre: "⊹ ࣪ Torta Red Velvet ₊˚⊹⋆",  
          precio: 9500,
          descripccion: "¡Bizcochuelo rojo aterciopelado con crema de queso!",  
          imagen: "./assets/redvelvet.png",
          alt: "Red Velvet"
        },
        {
          idProducto: "4",
          nombre: "⊹ ࣪ Lemon Pie ₊˚⊹⋆", 
          precio: 7500,
          descripccion: "¡Tarta de limón con merengue suizo!",  
          imagen: "./assets/lemonpie.png",
          alt: "Lemon Pie"
        },
        {
          idProducto: "5",
          nombre: "⊹ ࣪ Torta de Manzana ₊˚⊹⋆",  
          precio: 7000,
          descripccion: "¡Torta esponjosa con manzanas caramelizadas!",  
          imagen: "./assets/demanzana.png",
          alt: "Torta de Manzana"
        },
        {
          idProducto: "6",
          nombre: "⊹ ࣪ Chocotorta ₊˚⊹⋆", 
          precio: 6000,
          descripccion: "¡Torta argentina de chocolate y dulce de leche!",  
          imagen: "./assets/chocotorta.png",
          alt: "Chocotorta"
        },
      ];
    }
}




