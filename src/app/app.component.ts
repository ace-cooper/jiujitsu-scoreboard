import { Component, OnInit } from '@angular/core';
declare let window: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  keydownListener: any;

  constructor() {}

  setFullscreen() {
    window.ipcRenderer.send('fullscreen-window');
  }

  ngOnInit() {
    this.keydownListener = window.addEventListener('keydown', (event: any) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
      }
    });
  }

  ngOnDestroy() {
    window.removeEventListener('keydown', this.keydownListener);
  }
}
