import { Component, EventEmitter, HostListener } from '@angular/core';

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

  public onActionEmitter = new EventEmitter<void>();
  public onBuzzerEmitter = new EventEmitter<'buzzer' | 'beep'>();
  
  competitors: Competitor[] = [
    {
      name: 'Atleta 1',
      team: '',
      points: {
        mountBackMount: 0,
        guardPass: 0,
        fallSweepKneeOnBelly: 0,
        advantage: 0,
        punishment: 0,
      },
      get totalPoints() {
        return this.points.mountBackMount + this.points.guardPass + this.points.fallSweepKneeOnBelly;
      }
    },
    {
      name: 'Atleta 2',
      team: '',
      points: {
        mountBackMount: 0,
        guardPass: 0,
        fallSweepKneeOnBelly: 0,
        advantage: 0,
        punishment: 0,
      },
      get totalPoints() {
        return this.points.mountBackMount + this.points.guardPass + this.points.fallSweepKneeOnBelly;
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

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    switch (event.key) {
      case ' ':
       this.onActionEmitter.emit();
       break;
      case 'b':
        this.onBuzzerEmitter.emit('beep');
      break;
    }
  }

}
