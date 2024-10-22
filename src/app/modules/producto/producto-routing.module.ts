import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChurrosComponent } from './pages/churros/churros.component';
import { FacturasComponent } from './pages/facturas/facturas.component';
import { TortasComponent } from './pages/tortas/tortas.component';

//Importamos rutas de secciones en su respectivo modulo. 

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

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
