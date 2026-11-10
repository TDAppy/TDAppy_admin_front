import { Component } from '@angular/core';
import { ReportUserContent } from '@/features/reports/components/report-user-content/report-user-content';

@Component({
  selector: 'app-report-user-page',
  imports: [ReportUserContent],
  template: ` <app-report-user-content></app-report-user-content> `,
  styles: `
    :host {
      flex: 1;
      padding: 2rem;
      height: 100%;
      margin-top: 5rem;
    }
  `,
})
export class ReportUserPage {}
