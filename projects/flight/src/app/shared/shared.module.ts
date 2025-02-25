import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './feature-core';



@NgModule({
  imports: [
    CommonModule,
    HomeComponent
  ],
  exports: [
    HomeComponent
  ]
})
export class SharedModule { }
