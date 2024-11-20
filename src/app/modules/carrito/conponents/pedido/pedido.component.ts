import { Component } from '@angular/core';

//import modelo
import { Pedido } from 'src/app/models/pedido';
import { CarritoService } from '../../servives/carrito.service';
import { AuthService } from 'src/app/modules/autentificacion/services/auth.service';


@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent {

  coleccionPedidos: Pedido[] = [];

  constructor(
    public servicioCarrito: CarritoService,
    public servicioAuth: AuthService
  ){}


  //FUNCION PARA QUE SOLO QUIENES SE LOGEARON PUEDAN USAR EL CARRITO
  ngOnInit(){

    this.servicioAuth.obtenerUid().then(uid => {
      //si se encuentra uid continúa al siguiente condicional
      if (uid) {
       this.servicioAuth.obtenerRol(uid).subscribe(rol => {
        if (rol === "usuario") {
          this.servicioCarrito.iniciarCarrito();

          this.servicioCarrito.obtenerCarrito().subscribe(producto => {
            this.coleccionPedidos = producto;
          })
        } else{
          console.error("No se obtuvo el usuario de manera correcta.")
        }
       }) 
      }
    })
  }

  
  //FUNCION PARA ELIMINAR PEDIDO
  quitarPedido(pedido:Pedido){
    this.servicioCarrito.borrarPedido(pedido);
  }

}
