import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from 'src/app/modules/shared/service/firestore.service';

import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  hide: boolean = true;
  constructor(
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public servicioRutas: Router
  ) { }

  usuarios: Usuario = {
    uid: '',
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: ''
  }

  async iniciarSesion() {
    const credenciales = {
      email: this.usuarios.email,
      password: this.usuarios.password
    }

    try {
      const usuarioBD = await this.servicioAuth.obtenerUsuario(credenciales.email);

      if (!usuarioBD || usuarioBD.empty) {
        Swal.fire({
          title: "¡Oh no!",
          text: "Correo electrónico no registrado",
          icon: "error"
        });
        this.limpiarInputs();
        return;
      }

      const usuarioDoc = usuarioBD.docs[0];
      const usuarioData = usuarioDoc.data() as Usuario;

      const hashedPassword = CryptoJS.SHA256(credenciales.password).toString();

      if (hashedPassword !== usuarioData.password) {
        Swal.fire({
          title: "¡Oh no!",
          text: "Contraseña incorrecta",
          icon: "error"
        });
        this.usuarios.password = '';
        return;
      }

      await this.servicioAuth.iniciarSesion(credenciales.email, credenciales.password);
      Swal.fire({
        title: "¡Buen trabajo!",
        text: "¡Se pudo ingresar con éxito :)!",
        icon: "success"
      });

      this.servicioRutas.navigate(['/inicio']);

    } catch (error) {
      Swal.fire({
        title: "¡Oh no!",
        text: "Hubo un problema al iniciar sesión :( " + error,
        icon: "error"
      });
      this.limpiarInputs();
    }
  }

  limpiarInputs() {
    this.usuarios.email = '';
    this.usuarios.password = '';
  }
}
