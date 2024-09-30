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
        const resultado = await this.productosCollection.doc(idProducto).set(producto);
        resolve(resultado);
      } catch (error) {
        reject(error);
      }
    })
  }

  // Método para obtener todos los productos desde la base de datos
  obtenerProducto() {
    return this.productosCollection.snapshotChanges().pipe(
      map(action => action.map(a => a.payload.doc.data()))
    );
  }

  // Método para modificar un producto existente en la base de datos
  modificarProducto(idProducto: string, nuevaData: Producto) {
    return this.database.collection('producto').doc(idProducto).update(nuevaData);
  }

  // Método para eliminar un producto de la base de datos
  eliminarProducto(idProducto: string) {
    return new Promise((resolve, reject) => {
      try {
        const respuesta = this.productosCollection.doc(idProducto).delete();
        resolve(respuesta); // Resuelve la promesa si se elimina correctamente
      } catch (error) {
        reject(error); // Rechaza la promesa si hay un error al eliminar
      }
    })
  }
}