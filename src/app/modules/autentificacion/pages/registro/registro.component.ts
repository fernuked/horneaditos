import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

//importamos servicio de autentificación
import { AuthService } from '../../services/auth.service';
//importamos componente de rutas de angular
import { Router } from '@angular/router';
import { FirestoreService } from '../../../shared/service/firestore.service';
//importamos paquetería de criptación
import * as CryptoJS from 'crypto-js';
//importamos paquetería de alertas personalizadas
import Swal from 'sweetalert2';

@Component({
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})


//  En el componente RegistroComponent, se gestiona el registro de nuevos usuarios en la aplicación.
//  Primero, se define un objeto usuarios que contiene las propiedades básicas como nombre, apellido,
//  email, password, y un campo rol que inicialmente se establece como "usuario" y se cambia a "visitante" 
//  al momento de registrarse.
//  Además, se mantiene una lista vacía coleccionUsuarios para almacenar los usuarios registrados.


export class RegistroComponent {

  hide = true;

  //importaciones de interfaz 'Usuario'
  constructor(
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public servicioRutas: Router
  ) { }

  //importamos interfaz Usuario (inicializar)
  usuarios: Usuario = {
    //comillas simples por tipo string
    //"0" (CERO) para los tipo number
    apellido: '',
    uid: '',
    nombre: '',
    email: '',
    rol: 'usuario', // -> al registrarse, todos los usuarios serán "visitante"
    password: ''
  }

  //creamos colección de usuarios, del tipo usuario, y lo definimos para que reciba arreglos
  coleccionUsuarios: Usuario[] = [];

  
  //función para registro de nuevos usuarios
  async registrarUsuarios() {

    // Crea un objeto llamado `credenciales` que almacena el correo y la contraseña del usuario.
    const credenciales = {
      email: this.usuarios.email, // Asigna el valor del email del objeto `usuarios`.
      password: this.usuarios.password, // Asigna el valor de la contraseña del objeto `usuarios`.
    }
  
    // Realiza una llamada al método `registrar` del servicio de autenticación `servicioAuth`.
    // `credenciales.email` y `credenciales.password` son los parámetros que se envían.
    const rta = await this.servicioAuth.registrar(credenciales.email, credenciales.password)

      // Maneja el resultado exitoso de la promesa con `then`.
      .then(rta => {
        // Muestra un mensaje de éxito con la librería Swal (SweetAlert2).
        Swal.fire({
          title: "¡Todo correcto!", // Título del mensaje.
          text: "El registro se completó correctamente. ¡Bienvenido/a!", // Texto explicativo.
          icon: "success" // Icono que indica éxito.
        });

        // Navega a la página de inicio utilizando el enrutador de Angular.
        this.servicioRutas.navigate(['/inicio']);
      })

      // Maneja cualquier error que ocurra durante el registro con `catch`.
      .catch(error => {
        // Muestra un mensaje de error con Swal (SweetAlert2).
        Swal.fire({
          title: "Error al registrarse...", // Título del mensaje.
          text: "Hubo un error al intentar registrar usuario: \n" + error, // Muestra el error específico devuelto.
          icon: "error" // Icono que indica error.
        });
      });


    //constante UID captura el identificador de la BD
    const uid = await this.servicioAuth.obtenerUid();

    //se le asigna al atributo de la interfaz esta constante
    this.usuarios.uid = uid;

    /*
      Algoritmo de hash seguro:
      - `SHA256`: Aplica un algoritmo de hash que transforma una entrada (por ejemplo, una contraseña) 
        en una cadena de caracteres hexadecimal única, no reversible.
      - Esto asegura que las contraseñas no se guarden como texto plano en la base de datos, 
        protegiendo la información del usuario.
      - `toString`: Convierte el resultado del hash a una cadena de texto legible.
    */

    // Aplica el hash SHA256 a la contraseña del usuario y la convierte en una cadena hexadecimal.
    this.usuarios.password = CryptoJS.SHA256(this.usuarios.password).toString();

    // Llamamos a la función que guarda al usuario en la base de datos.
    this.guardarUsuarios();

    // Llamamos a la función que vacía los inputs para limpiar el formulario.
    this.limpiarInputs();

  }

  // FUNCION GUARDAR USUARIOS
  async guardarUsuarios() {
    // Llama al servicio Firestore para agregar un usuario a la base de datos.
    // Toma los datos del usuario (`this.usuarios`) y su ID único (`this.usuarios.uid`) como parámetros.
    this.servicioFirestore.agregarUsuario(this.usuarios, this.usuarios.uid)
      .then(res => {
        // Si la operación es exitosa, imprime los datos del usuario en la consola.
        console.log(this.usuarios);
      })
      .catch(err => {
        // Si ocurre un error, lo captura e imprime el mensaje en la consola.
        console.log('Error =>', err);
      });
  }

  // FUNCION VACIAR INPUTS
  limpiarInputs() {
    // Declara un objeto `inputs` (aunque no se utiliza directamente).
    const inputs = {
      // Resetea los campos del objeto `this.usuarios` a valores iniciales.
      uid: this.usuarios.uid = '',
      nombre: this.usuarios.nombre = '',
      email: this.usuarios.email = '',
      rol: this.usuarios.rol = 'visitante',
      password: this.usuarios.password = ''
    };
  }
}