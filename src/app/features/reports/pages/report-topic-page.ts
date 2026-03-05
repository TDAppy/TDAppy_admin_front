import { Component } from '@angular/core';
import { ReportTopicContent } from '@/features/reports/components/report-topic-content/report-topic-content';

@Component({
  selector: 'app-report-topic-page',
  imports: [ReportTopicContent],
  template: ` <app-report-topic-content></app-report-topic-content> `,
  styles: `
    :host {
      flex: 1;
      padding: 2rem;
      height: 100%;
      margin-top: 5rem;
    }
  `,
})
export class ReportTopicPage {}
