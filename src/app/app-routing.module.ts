import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './modules/inicio/pages/inicio/inicio.component';
import { ChurrosComponent } from './modules/producto/pages/churros/churros.component';
import { FacturasComponent } from './modules/producto/pages/facturas/facturas.component';
import { TortasComponent } from './modules/producto/pages/tortas/tortas.component';
import { SobrenosotrosComponent } from './modules/producto/pages/sobrenosotros/sobrenosotros.component';

const routes: Routes = [

  { path: '', component: InicioComponent },
  {
    path: "churros", component: ChurrosComponent
  },

  {
    path: "facturas", component: FacturasComponent
  },
  {
    path: "tortas", component: TortasComponent
  },
  {
    path: "sobrenosotros", component: SobrenosotrosComponent
  },
  {
    path: "", component: InicioComponent

  },
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
