import { CanActivateFn } from '@angular/router';

// `inject` permite inyectar servicios en una función (inyección de dependencias)
import { inject } from '@angular/core';

import { AuthService } from '../modules/autentificacion/services/auth.service';
import { Router } from '@angular/router';

// Importamos operadores para manejar flujos de datos basados en "observables"
import { map, switchMap, of, from } from 'rxjs';

// Definimos el guard utilizando `CanActivateFn`
export const rutaProtegidaGuard: CanActivateFn = (route, state) => {

  // Obtenemos una instancia del servicio de autenticación directamente dentro del guard
  const servicioAuth = inject(AuthService);

  // Obtenemos una instancia del servicio de navegación
  const servicioRutas = inject(Router);

  // Definimos el rol requerido para acceder a la ruta
  const rolRequerido = "admin";

  // `from` convierte una promesa en un observable
  return from(servicioAuth.obtenerUid()).pipe(
    switchMap(uid => {
      // Si se obtiene un UID, verificamos el rol asociado al usuario
      if (uid) {
        return servicioAuth.obtenerRol(uid).pipe(
          map(rol => {
            // Si el rol coincide con el esperado, se permite el acceso a la ruta
            if (rol === rolRequerido) {
              console.log("Acceso concedido: Usuario con rol de administrador.");
              return true;
            } else {
              // Si el rol no coincide, se deniega el acceso
              console.log("Acceso denegado: Rol insuficiente.");
              return false;
            }
          })
        );
      } else {
        console.log("Usuario no autenticado o permisos insuficientes.");
  
        // Redirige a la página de inicio si el usuario no está autenticado
        return of(servicioRutas.createUrlTree(['/inicio']));
      }
    })
  );
}  