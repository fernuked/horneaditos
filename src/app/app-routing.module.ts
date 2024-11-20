import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './modules/inicio/pages/inicio/inicio.component';
import { rutaProtegidaGuard } from './guards/ruta-protegida.guard';


const routes: Routes = [

//Importamos rutas para los distintos modules: inicio, producto, autentificacion, admin e informacion. 
  {
    path: "", component: InicioComponent

  },
  //Ejemplo: La ruta padre va hacia las rutas hijas (padre: modules) (hijas: inicio, producto, etc)
  { 
    path: '', loadChildren: () => import('./modules/inicio/inicio.module').then(m => m.InicioModule) 
  },

  { 
    path: '', loadChildren: () => import('./modules/producto/producto.module').then(m => m.ProductoModule)
  },
  {
    path: '', loadChildren: () => import('./modules/autentificacion/autentificacion.module').then(m => m.AutentificacionModule)
  },
  { 
    path: '', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) 
  },
  { 
    path: '', loadChildren: () => import('./modules/informacion/informacion.module').then(m => m.InformacionModule) 
  },
  { path:"",loadChildren:()=> import('./modules/admin/admin.module').then(m=>m.AdminModule),
    canActivate : [rutaProtegidaGuard], data: {role: 'admin'}
  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
