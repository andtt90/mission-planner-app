import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlannerRoutingModule } from './planner-routing.module';
import { PlannerComponent } from './planner.component';


@NgModule({
  declarations: [
    PlannerComponent
  ],
  imports: [
    CommonModule,
    PlannerRoutingModule
  ]
})
export class PlannerModule { }
