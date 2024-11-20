import { Injectable } from '@angular/core';
// sevicio en la nube de autentificacion de firebase. 
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { FirestoreService } from '../../shared/services/firestore.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private rolUsuario: string | null = null;
  // Referencia Auth de Firebase en el servicio.f
  constructor(public auth: AngularFireAuth, private servicioFirestore: AngularFirestore) { }

  // Funcion para registro. 
  registrar(email: string, password: string) {
    // retorna el valor que es creado con el metodo "createEmail.."
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  // Funcion para iniciar sesion.  
  iniciarSesion(email: string, password: string) {
    // Validar informacion del usuario -> saber si existe en la coleccion. 
    return this.auth.signInWithEmailAndPassword(email, password)

  }

  // Funcion para cerrar sesion. 
  cerrarSesion() {
    // Devuelve una promesa vacia -> quita token. 
    return this.auth.signOut();
  }

  // Funcion para tomar el uid.
  async obtenerUid() {
    // Nos va a generar una promeasa y la contante la va a capturar. 
    const user = await this.auth.currentUser;

    // Si el usuario no reespeta la estructura de la interfaz /

    // Si tuvo problemas para el registro -> ej: mal internet. 

    if (user == null) {
      return null;
    } else {
      return user.uid;
    }
  }

  // Método que obtiene un usuario de la base de datos Firestore según el email.
obtenerUsuario(email: string) {
   
  // Se realiza una consulta a la colección 'usuarios' en Firestore,
  // buscando todos los documentos donde el campo 'email' sea igual al email
  // proporcionado como argumento. Utilizamos '.get()' para obtener la información,
  // lo que devuelve una promesa que puede ser resuelta o rechazada.
  
  // Retorna la consulta de Firestore en forma de promesa (asíncrona), que se resuelve
  // cuando se obtienen los datos o se rechaza si ocurre un error.

  return this.servicioFirestore.collection('usuarios', ref => ref.where('email', "==", email)).get().toPromise();
}

// Método que obtiene el rol de un usuario a partir de su UID.
obtenerRol(uid: string): Observable<string | null> {

  // Se obtiene el rol de un usuario buscando el documento con el 'uid' proporcionado.
  // Utilizamos 'valueChanges()' para obtener los datos del documento en tiempo real,
  // lo que significa que se escuchará cualquier cambio en ese documento.
  // Si el documento no existe, devolverá 'null'.
  
  return this.servicioFirestore.collection("usuarios")  // Accede a la colección 'usuarios'.
    .doc(uid)  // Accede al documento con el UID proporcionado.
    .valueChanges()  // Obtiene los cambios del documento de forma reactiva.
    .pipe(  // Utiliza pipe para transformar el flujo de datos.
      map((usuario: any) => usuario ? usuario.rol : null)  // Mapea el documento recibido, extrayendo solo el 'rol'. Si el usuario no existe, retorna 'null'.
    );
}
}