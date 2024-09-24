import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/autentificacion/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // Declarar servicios (AuthService)
  logueado = true; // Booleana para manejo de registro y de inicio de sesion
  deslogueado = false; //  Booleana para manejo de cierre de sesion.

  constructor(
    public servicioAuth: AuthService,
    public servicioRutas: Router
  ) { }

  // Funcion "ingresar" para invertir los valores
  ingresar() {
    this.logueado = false;
    this.deslogueado = true;
  }

  // Funcion devuelve los valores originales. 
  cerrarSesion() {
    this.deslogueado = false;
    this.logueado = true;

    // Llamamos al metodo "cerrar sesion" para limpiar el Token.
    this.servicioAuth.cerrarSesion();

    // Redirigimos a la raiz del sitio. 
    this.servicioRutas.navigate(['/']);
  }

  // Funcion cambiar fondo
  cambiarFondo() {
    let toggle: HTMLInputElement | null = document.getElementById('toggle') as HTMLInputElement
    let label_toggle: HTMLElement | null = document.getElementById('label_toggle') as HTMLElement

    if (toggle) {
      let checked: boolean = toggle.checked;
      document.body.classList.toggle('dark', checked)

      if (checked) {
        label_toggle!.innerHTML = '<i class="fa-solid fa-sun"></i>'
      } else {
        label_toggle!.innerHTML = '<i class="fa-solid fa-moon"></i>'
      }
    }
  }
}

