import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { getStorage } from 'firebase/storage';


@Injectable({
  providedIn: 'root'
})

export class CrudService {
  // Definimoss una colección en Firestore para los productos
  private productosCollection: AngularFirestoreCollection<Producto>;

  // Inicializar servicio de Storage
  private storage = getStorage();

  constructor(private database: AngularFirestore) {
    // Inicializamos la colección de productos desde la base de datos Firestore
    this.productosCollection = database.collection('producto');
  }

  // Método para crear un nuevo producto en la base de datos
  crearProducto(producto: Producto) {
    return new Promise(async (resolve, reject) => {
      try {
        const idProducto = this.database.createId();
        producto.idProducto = idProducto;
        // Guarda el nuevo producto en la base de datos
        // toma el producto y en el resultado lo guarda
        const resultado = await this.productosCollection.doc(idProducto).set(producto);
        resolve(resultado);
      } catch (error) {
        reject(error);
      }
    })
  }

  // Método para obtener todos los productos desde la base de datos.
  // El método obtenerProducto es una función que permite obtener
  // datos de una colección en Firebase Firestore(en este caso, productos) y 
  // transformarlos en un formato más fácil de manejar utilizando Observables 


  /*
     snapshotChanges => toma captura del estado de los datos
     pipe => tuberías que retornan un nuevo arreglo
     map => "mapea" o recorre esa nueva información
     a => resguarda la nueva información y la envía como un documento 
   */

  obtenerProducto() {
    return this.productosCollection.snapshotChanges().pipe(
      map(action => action.map(a => a.payload.doc.data()))
    );
  }

  // productosCollection.snapshotChanges() : Este método de Firebase devuelve un Observable 
  // que emite cualquier cambio en los documentos de la colección
  // productosCollection (como agregar, actualizar o eliminar un producto).

  // pipe: cañeria pasa la imformacion

  // map(action => action.map
  // La primera transformación toma el array de cambios de la colección
  // (action) y lo recorre usando map de JavaScript.
  // Cada elemento a en el array representa un cambio en un documento.

  // a.payload.doc.data():
  // a.payload.doc accede al documento afectado por el cambio.
  // .data() obtiene los datos del documento como un objeto JavaScript.
  // Esto convierte el documento en un formato simple que puedes usar en tu aplicación.


  // Método para modificar un producto existente en la base de datos.
  /*
      Accedemos a la colección "productos" de la Base de Datos, buscamos el ID del 
      producto seleccionado y lo actualizamos con el método "update", enviando la 
      nueva información
    */

  modificarProducto(idProducto: string, nuevaData: Producto) {
    return this.database.collection('producto').doc(idProducto).update(nuevaData);
  }


  // Método para eliminar un producto de la base de datos
  eliminarProducto(idProducto: string) { // Recibe el ID único del producto como parámetro
    return new Promise((resolve, reject) => { // Retorna una promesa para manejar la operación de manera asíncrona
      try { // try para intentar ejecutar el código
        const respuesta = this.productosCollection.doc(idProducto).delete(); // 
        // Accede a la colección 'productos', encuentra el documento por su ID y lo elimina
        resolve(respuesta); // Si la eliminación es exitosa, resuelve la promesa y devuelve la respuesta
      } catch (error) { // Si ocurre un error al eliminar
        reject(error); // Rechaza la promesa y pasa el error como argumento
      }
    })
  }
}