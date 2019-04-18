
//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule, MatIconModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatListModule } from '@angular/material';

//Component
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';


@NgModule( {
  declarations: [
    ContentComponent,
    HeaderComponent,
    FooterComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
  ],
  exports: [
    ContentComponent,
    HeaderComponent,
    FooterComponent,
    NavBarComponent
  ]
} )
export class SharedModule { }
