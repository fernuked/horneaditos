import { Injectable } from '@angular/core';


import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


import { Pedido } from 'src/app/models/pedido';
import { Producto } from 'src/app/models/producto';


import Swal from 'sweetalert2';

import { AuthService } from '../../autentificacion/services/auth.service';

import { Router } from '@angular/router';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  //modelo que va a recibir los datos del pedido que se subirá a la BDD.

  pedido: Pedido={
    idPedido:'',
    producto:{
        idProducto:'',
        nombre:'',
        precio:0,
        descripcion:'',
        categoria:'',
        imagen:'',
        autor:'',
        alt:'',
        oferta:'',
        stock:0,
    },
    cantidad:0,
    total:0
  }

  private pedidosColeccion: AngularFirestoreCollection<Pedido>

  private uid:string | null = null;


  constructor(
    private servicioAuth:AuthService,
    private servicioFireStore:AngularFirestore,
    public servicioRutas:Router,
  ) {

    //creamos la subcolección dentro de la colección de usuarios y le damos ese valor a pedidosColeccion
    this.pedidosColeccion = this.servicioFireStore.collection(`usuarios/${this.uid}/pedido`);
  }


// FUNCIÓN PARA INICIALIZAR EL CARRITO Y SU COLECCIÓN DE PEDIDOS
  iniciarCarrito(){
    this.servicioAuth.obtenerUid().then(uid => {

      this.uid = uid

      if (this.uid === null) {
        //comunica el error al intentar obtener uid.
        console.error('No se obtuvo el UID. Intente iniciar sesión.');

        //redirección al módulo autentificación -> iniciar sesión.
        this.servicioRutas.navigate(['/inicio-sesion']);

      } else {
        this.pedidosColeccion = this.servicioFireStore.collection(`usuarios/${this.uid}/pedido`);
      }
    })
  }


  //FUNCION PARA OBTENER LOS PRODUCTOS QUE ESTÉN DENTRO DEL PEDIDO
  obtenerCarrito(){
    return this.pedidosColeccion.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())))
  }


  //FUNCION PARA CREAR PEDIDOS
  crearPedido(producto:Producto, stock:number){
    try{
      const idPedido = this.servicioFireStore.createId();

      //actualizamos datos del pedido
      this.pedido.idPedido = idPedido;
      this.pedido.producto = producto;
      this.pedido.cantidad = stock;
      this.pedido.total = producto.precio*stock; //cálculo de precio total

      //agregamos nuevo pedido recién obtenido a la colección de pedidos
      this.pedidosColeccion.doc(idPedido).set(this.pedido);

    } catch (error) {
      Swal.fire({
        title:'¡Oh no!',
        text:'Ha ocurrido un error al intentar subir el producto \n'+error,
        icon:'error'
      })
    }
  }


  //FUNCION PARA BORRAR PEDIDO
  borrarPedido(pedido: Pedido){
    try {
      this.pedidosColeccion.doc(pedido.idPedido).delete();

      Swal.fire({
        title:'El producto ha sido borrado',
        text:'Se ha borrado correctamente el producto.',
        icon:'success',
      })

    } catch (error) {
      Swal.fire({
        title:'¡Oh no!',
        text:'Ha ocurrido un error al intentar borrar el producto. \n'+error,
        icon:'error'
      })
    }
  }

}
