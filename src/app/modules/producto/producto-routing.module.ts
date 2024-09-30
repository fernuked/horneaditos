import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChurrosComponent } from './pages/churros/churros.component';
import { FacturasComponent } from './pages/facturas/facturas.component';
import { TortasComponent } from './pages/tortas/tortas.component';
import { SobrenosotrosComponent } from './pages/sobrenosotros/sobrenosotros.component';
import { AdminComponent } from '../admin/pages/admin/admin.component';


const routes: Routes = [
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
    path: "admin", component: AdminComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
