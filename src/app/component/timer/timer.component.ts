// timer.component.ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent {
  @Output() timeExpired = new EventEmitter<boolean>();

  time: number = 0;
  timer: any = null;

  paused: boolean = false;

  public minutes: number = 0;
  public seconds: number = 0;

  public isOpen: boolean = false;

  public get formatedTime() {
    return `${Math.floor(this.time / 60).toString().padStart(2, '0')}:${Math.floor(this.time % 60).toString().padStart(2, '0')}`
  }

  startCountdown(seconds: number) {
    this.time = seconds;
    this.paused = false;
    this.timer = setInterval(() => {
      this.time--;
      if (this.time === 0) {
        clearInterval(this.timer);
        this.timeExpired.emit(true);
      }
    }, 1000);
  }

  resetCountdown(seconds: number) {
    this.clear();
    this.startCountdown(seconds);
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
    this.time = this.minutes * 60 + this.seconds;
  }

  public edit() {
    this.isOpen = true;
  }

  public onDidDismiss() {
    this.close();
  }
}
