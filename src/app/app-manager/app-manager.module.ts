import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppManagerRoutingModule } from './app-manager-routing.module';
import { AppManagerComponent } from './app-manager.component';


@NgModule({
  declarations: [
    AppManagerComponent
  ],
  imports: [
    CommonModule,
    AppManagerRoutingModule
  ]
})
export class AppManagerModule { }
