import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ScoreCounterComponent } from '../component/score-counter/score-counter.component';
import { TimerComponent } from '../component/timer/timer.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [
    HomePage,
    ScoreCounterComponent,
    TimerComponent
  ]
})
export class HomePageModule {}
