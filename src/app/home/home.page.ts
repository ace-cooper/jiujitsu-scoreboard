import { Component, EventEmitter, OnInit } from '@angular/core';

interface Competitor {
  name: string;
  team: string;
  points: {
    mountBackMount: number;
    guardPass: number;
    fallSweepKneeOnBelly: number;
    advantage: number;
    punishment: number;
  };
  totalPoints?: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  competitors: Competitor[] = [
    {
      name: '',
      team: '',
      points: {
        mountBackMount: 0,
        guardPass: 0,
        fallSweepKneeOnBelly: 0,
        advantage: 0,
        punishment: 0,
      },
      get totalPoints() {
        return this.points.mountBackMount + this.points.guardPass + this.points.fallSweepKneeOnBelly + this.points.advantage - this.points.punishment;
      }
    },
    {
      name: '',
      team: '',
      points: {
        mountBackMount: 0,
        guardPass: 0,
        fallSweepKneeOnBelly: 0,
        advantage: 0,
        punishment: 0,
      },
      get totalPoints() {
        return this.points.mountBackMount + this.points.guardPass + this.points.fallSweepKneeOnBelly + this.points.advantage - this.points.punishment;
      }
    },
  ];

  public resetAllScores() {
    for (let competitor of this.competitors) {
      competitor.points.mountBackMount = 0;
      competitor.points.guardPass = 0;
      competitor.points.fallSweepKneeOnBelly = 0;
      competitor.points.advantage = 0;
      competitor.points.punishment = 0;
    }
  }

}
