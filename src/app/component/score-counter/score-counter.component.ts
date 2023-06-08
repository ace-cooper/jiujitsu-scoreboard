import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-score-counter',
  templateUrl: './score-counter.component.html',
  styleUrls: ['./score-counter.component.scss'],
})
export class ScoreCounterComponent {

  @Input() title: string = '';
  @Input() score: number = 0;
  // @Input()
  // resetEvent!: EventEmitter<boolean>;
  @Output() scoreChange: EventEmitter<number> = new EventEmitter();

  @Input() count: number = 0;

  constructor() {
    // this.resetEvent.subscribe(_ => this.count = 0);
  }

  add() {
    this.count += this.score;
    this.scoreChange.emit(this.count);
  }

  subtract() {
    this.count = Math.max(this.count - this.score, 0);
    this.scoreChange.emit(this.count);
  }

}
