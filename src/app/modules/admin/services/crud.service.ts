import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { getDownloadURL, getStorage, ref, UploadResult, uploadString, deleteObject } from 'firebase/storage';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private productosCollection: AngularFirestoreCollection<Producto>

  private respuesta!: UploadResult;

  private storage = getStorage();

  constructor(private database: AngularFirestore) {
    this.productosCollection = database.collection('producto')
  }


  crearProducto(producto: Producto, URL: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const idProducto = this.database.createId()
       
        producto.idProducto = idProducto;
        producto.imagen = URL;

        const resultado = await this.productosCollection.doc(idProducto).set(producto)

        resolve(resultado);
      } catch (error) {
        reject(error);
      }
    })
  }

  obetenerProductos() {


    return this.productosCollection.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())))
  }

  modificarProducto(idProducto: string, nuevaData: Producto) {
    return this.database.collection('producto').doc(idProducto).update(nuevaData);
  }

  eliminarProducto(idProducto: string, imagenURL: string) {
    return new Promise((resolve, reject) => {
      try {
        const storage = getStorage();
        const referenciaImagen = ref(storage, imagenURL);

        deleteObject(referenciaImagen)
          .then((res) => {
            const respuesta = this.productosCollection.doc(idProducto).delete()
            resolve(respuesta);

          })
          .catch(error => {
            reject("Error al eliminar la imagen")
          })

      }
      catch (error) {
        reject(error);
      }
    })
  }

}