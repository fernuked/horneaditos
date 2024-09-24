import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './components/footer/footer.component';

import { AppRoutingModule } from 'src/app/app-routing.module';
import {MatMenuModule} from '@angular/material/menu';
//Aca van los componentes de angular; maticon, matbutton, mat toolbar, mat menu.

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
   
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  exports:[
    NavbarComponent,
    FooterComponent]
})
export class SharedModule { }
