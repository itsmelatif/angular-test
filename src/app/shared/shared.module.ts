import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CardTitleComponent } from './components/card/card-title/card-title.component';
import { CardBodyComponent } from './components/card/card-body/card-body.component';
import { CardFooterComponent } from './components/card/card-footer/card-footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from './components/icon/icon.component';



@NgModule({
  declarations: [
    CardComponent,
    NavbarComponent,
    FooterComponent,
    LayoutComponent,
    CardTitleComponent,
    CardBodyComponent,
    CardFooterComponent,
    IconComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LayoutComponent,
    CardComponent,
    CardTitleComponent,
    CardBodyComponent,
    CardFooterComponent,
    IconComponent
  ]
})
export class SharedModule { }
