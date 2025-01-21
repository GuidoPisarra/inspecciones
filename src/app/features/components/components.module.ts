import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SpinnerModule } from './spinner/spinner.module';
import { SharedModule } from '../../shared/shared.module';
import { SpinnerMaxScreenModule } from './spinner-max-screen/spinner-max-screen.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    SpinnerModule,
    SharedModule,
    SpinnerMaxScreenModule
  ],
  exports: [],
})
export class ComponentsModule { }
