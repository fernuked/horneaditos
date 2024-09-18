import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ChurrosComponent } from './pages/churros/churros.component';
import { FacturasComponent } from './pages/facturas/facturas.component';
import { TortasComponent } from './pages/tortas/tortas.component';
import { ProductoComponent } from './pages/producto/producto.component';


@NgModule({
  declarations: [
    ChurrosComponent,
    FacturasComponent,
    TortasComponent,
    ProductoComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule
  ]
})
export class ProductoModule { }
