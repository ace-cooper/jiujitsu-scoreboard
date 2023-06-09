import { Component, OnInit } from '@angular/core';
declare let window: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  setFullscreen() {
    window.ipcRenderer.send('fullscreen-window');
  }
  keydownListener: any;

  ngOnInit() {
    // Adicione o ouvinte de eventos
    this.keydownListener = window.addEventListener('keydown', (event: any) => {
      if (event.key === 'Enter' || event.key === ' ') {
        console.log("prevent default ", event)
        // Prevent default behaviour
        event.preventDefault();
      }
    });
  }

  ngOnDestroy() {
    // Remove o ouvinte de eventos
    window.removeEventListener('keydown', this.keydownListener);
  }
}
