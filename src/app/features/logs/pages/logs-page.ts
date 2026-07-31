import { Component } from '@angular/core';
import { LogViewer } from '@/features/logs/components/log-viewer/log-viewer';

@Component({
  selector: 'app-logs-page',
  imports: [LogViewer],
  template: `
    <h1>Logs de l'API</h1>
    <app-log-viewer></app-log-viewer>
  `,
  styles: `
    :host {
      display: block;
      flex: 1;
      padding: 2rem;
      height: 100%;
      margin-top: 5rem;
    }

    h1 {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
    }
  `,
})
export class LogsPage {}
