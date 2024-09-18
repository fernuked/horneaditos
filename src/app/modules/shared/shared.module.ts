import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
 
// Acceso a todas las rutas del proyecto
import { AppRoutingModule } from 'src/app/app-routing.module';

//Aca van los componentes de angular; maticon, matbutton, mat toolbar, mat menu

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class SharedModule { }
