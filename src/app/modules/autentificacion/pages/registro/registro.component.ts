import { Component } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from 'src/app/modules/shared/service/firestore.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  hide = true;

  usuarios: Usuario = {
    uid: '',
    nombre: '',
    apellido: '',
    email: '',
    rol: '',
    password: ''
  }

  coleccionUsuarios: Usuario[] = [];

  constructor(
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public servicioRutas: Router
  ) { }


  async registrar() {
    const credenciales = {
      email: this.usuarios.email,
      password: this.usuarios.password
    }

    const res = await this.servicioAuth.registrar(credenciales.email, credenciales.password)
      .then(rest => {
        Swal.fire({
          title: "Buen trabajo!",
          text: "Se pudo registrar con exito :)",
          icon: "success"
        });

        this.servicioRutas.navigate(['/inicio']);
      })
      .catch(error => {
        Swal.fire({
          title: "Hubo un error!",
          text: "No pudo registrarse :(",
          icon: "error"
        });
      })

    const uid = await this.servicioAuth.obtenerUid();
    this.usuarios.uid = uid;

    this.usuarios.password = CryptoJS.SHA256(this.usuarios.password).toString();


    this.guadarUsuario();

    this.limpiarInputs();

  }

  async guadarUsuario() {
    this.servicioFirestore.agregarUusario(this.usuarios, this.usuarios.uid).then(res => {
      console.log(this.usuarios);
    })
      .catch(err => {
        console.log('error =>', err);
      })
  }

  limpiarInputs() {
    const inputs = {
      uid: this.usuarios.uid = '',
      nombre: this.usuarios.nombre = '',
      apellido: this.usuarios.apellido = '',
      email: this.usuarios.email = '',
      rol: this.usuarios.rol = '',
      password: this.usuarios.password = ''
    }
  }
}
