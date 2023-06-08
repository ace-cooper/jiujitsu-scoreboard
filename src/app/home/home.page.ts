import { Component } from '@angular/core';

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
    },
  ];

  resetAllScores() {
    for (let competitor of this.competitors) {
      for (let pointCategory in competitor.points) {
        // competitor.points[pointCategory as any] = 0;
      }
    }
  }

}
