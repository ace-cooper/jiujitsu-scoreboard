// timer.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
declare let window: any;

const TIME_FACTOR_MINUTE_STEP = 60000;
const TIME_FACTOR_SECOND_STEP = TIME_FACTOR_MINUTE_STEP / 12;
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {

  @Output() timeExpired = new EventEmitter<boolean>();
  @Output() onReset = new EventEmitter<void>();
  @Input() fireAction: EventEmitter<void> = new EventEmitter<void>();
  @Input() buzzerAction: EventEmitter<'buzzer' | 'beep'> = new EventEmitter<'buzzer' | 'beep'>();

  public buzzer: any = new Audio('assets/buzzer-1.mp3');
  public beep: any = new Audio('assets/beep.mp3');
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

  ngOnInit(): void {
    this.updateTime();
    this.fireAction.subscribe(() => this.action());
    this.buzzerAction.subscribe((type: any) => this.playBuzzer(type));
    this.buzzer.load();
    this.beep.load();
  }

  startCountdown(seconds: number) {
    this.time = seconds;
    this.paused = false;
    this.timer = setInterval(() => {
      this.time-= 500;
  
      if (this.time === 0) {
        clearInterval(this.timer);
        this.timeExpired.emit(true);
        this.playBuzzer();
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

  public playBuzzer(type: 'buzzer' | 'beep' = 'buzzer') {
    
    if (this.buzzer.paused && this.beep.paused) {
      if (type === 'beep') {
        this.beep.currentTime = 0;
        this.beep.play();
      } else {
        this.buzzer.currentTime = 0;
        this.buzzer.play();
      }
    }

    // const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    // const oscillator = audioContext.createOscillator();
    // const gainNode = audioContext.createGain();
  
    // oscillator.connect(gainNode);
    // gainNode.connect(audioContext.destination);
  
    // gainNode.gain.setValueAtTime(1, audioContext.currentTime); // Volume
    // gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
    // oscillator.frequency.setValueAtTime(2000, audioContext.currentTime); // Frequência inicial do beep em Hz
    // oscillator.frequency.exponentialRampToValueAtTime(150, audioContext.currentTime + 1.5); // Frequência final do beep em Hz
    // oscillator.type = 'sawtooth'; // Tipo de onda
  
    // oscillator.start();
  
    // setTimeout(() => {
    //   oscillator.stop();
    // }, 1500); // Duração do beep em milissegundos
  }
  
}
