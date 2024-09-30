import { Injectable } from '@angular/core';
// sevicio en la nube de autentificacion de firebase. 
import { AngularFireAuth } from '@angular/fire/compat/auth';
// import { FirestoreService } from '../../shared/services/firestore.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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

  obtenerUsuario(email: string){
    // retornamos del servicio firestore la coleccion de usuarios, buscamos referencia en los email 
    // registrados y los comparamos con lo que ingrese el usuario al ingresar sesion y lo obtiene 
    // con el '.get()', lo vuelve una promesa RESUELTO O RECHAZADO.
    
    return this.servicioFirestore.collection('usuarios', ref => ref.where('email',"==", email)).get().toPromise();
  }
}
