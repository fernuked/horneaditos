import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SobrenosotrosComponent } from './pages/sobrenosotros/sobrenosotros.component';

const routes: Routes = [
 {path: "sobrenosotros", component: SobrenosotrosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformacionRoutingModule { }
