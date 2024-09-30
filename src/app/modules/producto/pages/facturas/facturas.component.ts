import { Component } from '@angular/core';
import { Cards } from 'src/app/models/cards';
import { Producto } from 'src/app/models/producto';


@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent {
  public info: Cards[];
  // Inicialización de los datos en el arreglo `info`
  constructor() {
    this.info = [
        {
          idProducto: "1", 
          nombre: "⊹ ࣪Medialuna₊˚⊹⋆", 
          precio: 500,  
          descripccion: "¡Medialuna clasica!",
          imagen: "./assets/medialunanormal.png", 
          alt: "Medialuna"  },
        {
          idProducto: "2",
          nombre: "⊹ ࣪ Vigilante ₊˚⊹⋆",  
          precio: 8500,
          descripccion: "¡Vigilante clasico",  
          imagen: "./assets/vigilante.png",
          alt: "vigilante"
        },
        {
          idProducto: "3",
          nombre: "⊹ ࣪ Dulce de leche ₊˚⊹⋆",  
          precio: 9500,
          descripccion: "¡Rellena de dulce de leche!",  
          imagen: "./assets/medialunadulce.png",
          alt: "Medialuna con dulce d leche"
        },
        {
          idProducto: "4",
          nombre: "⊹ ࣪ Chocolate ₊˚⊹⋆", 
          precio: 7500,
          descripccion: "¡Con mucho chocolate!",  
          imagen: "./assets/mediachocolate.png",
          alt: "Lemon Pie"
        },
        {
          idProducto: "5",
          nombre: "⊹ ࣪ Jamon y Queso ₊˚⊹⋆",  
          precio: 7000,
          descripccion: "¡Jamon y Queso por dentro!",  
          imagen: "./assets/jamonyqueso.png",
          alt: "Medialuna de jamon y queso."
        },
        {
          idProducto: "6",
          nombre: "⊹ ࣪ Molinito ₊˚⊹⋆", 
          precio: 6000,
          descripccion: "¡Tus favoritos de siempre!",  
          imagen: "./assets/molinito.png",
          alt: "Mlonitos dulces"
        },
      ];
    }
}

