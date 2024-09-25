import { Injectable } from '@angular/core'; 
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  
  private usuariosCollection: AngularFirestoreCollection<Usuario>

  constructor(private database: AngularFirestore) {

    
    this.usuariosCollection = this.database.collection<Usuario>('usuarios')
  }

  agregarUusario(usuario: Usuario, id: string) {

    return new Promise(async (resolve, reject) => {

  
      try {
        usuario.uid = id;
        const resultado = await this.usuariosCollection.doc(id).set(usuario);

        resolve(resultado);

      } catch (erorr) {

        reject(erorr);
      }
    })
  }
}
