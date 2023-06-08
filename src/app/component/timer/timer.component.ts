// timer.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

const TIME_FACTOR_MINUTE_STEP = 60000;
const TIME_FACTOR_SECOND_STEP = TIME_FACTOR_MINUTE_STEP / 12;
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  ngOnInit(): void {
    this.updateTime();
  }
  @Output() timeExpired = new EventEmitter<boolean>();
  @Output() onReset = new EventEmitter<void>();

  time: number = 0;
  timer: any = null;

  paused: boolean = false;

  public minutes: number = 10;
  public seconds: number = 0;

  public isOpen: boolean = false;

  public get formatedTime() {
    return `${Math.floor(this.time / TIME_FACTOR_MINUTE_STEP).toString().padStart(2, '0')}:${Math.floor(this.time % TIME_FACTOR_MINUTE_STEP / 1000).toString().padStart(2, '0')}`
  }

  private get timeInSeconds() {
    return this.minutes * TIME_FACTOR_MINUTE_STEP + this.seconds;
  }

  public get isRunning() {
    return this.timer !== null && !this.paused;
  }

  public get displayColor() {
    return this.time > TIME_FACTOR_SECOND_STEP ? 'white' : 'red'; 
  }

  startCountdown(seconds: number) {
    this.time = seconds;
    this.paused = false;
    this.timer = setInterval(() => {
      this.time-= 500;
      console.log(this.time)
      if (this.time === 0) {
        clearInterval(this.timer);
        this.timeExpired.emit(true);
        this.pauseCountdown();
      }
    }, 500);
  }

  resetCountdown() {
    this.clear();
    this.updateTime();
    // this.startCountdown(this.time);
    this.onReset.emit();
  }

  resumeCountdown() {
    this.clear();
    this.startCountdown(this.time > 0 ? this.time : 300);
  }

  pauseCountdown() {
    this.clear();
    this.paused = true;
  }

  private clear() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  public close() {
    this.isOpen = false;
    this.updateTime();
  }

  private updateTime() {
    this.time = this.timeInSeconds
  }

  public edit() {
    this.isOpen = true;
  }

  public onDidDismiss() {
    this.close();
  }

  public add(type: 'minutes' | 'seconds') {
    this.time = Math.min(this.time + (type === 'minutes' ? TIME_FACTOR_MINUTE_STEP : TIME_FACTOR_SECOND_STEP), this.timeInSeconds);
  }

  public remove(type: 'minutes' | 'seconds') {
    if (this.time > TIME_FACTOR_MINUTE_STEP && type == 'minutes' || this.time > 5 && type == 'seconds') {
      this.time = Math.max(this.time - (type === 'minutes' ? TIME_FACTOR_MINUTE_STEP : TIME_FACTOR_SECOND_STEP), 0);
    }
  }

  public action() {
    if (this.isRunning) {
      this.pauseCountdown();
    } else if (this.time > 0) {
      this.resumeCountdown();
    } else {
      this.startCountdown(this.timeInSeconds);
    }
  }
}
