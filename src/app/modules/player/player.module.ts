import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PlayerRoutingModule } from './player-routing.module';
import { PlayerComponent } from './player.component';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [
    PlayerComponent
  ],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    MatCardModule,
    MatListModule
  ]
})
export class PlayerModule { }
