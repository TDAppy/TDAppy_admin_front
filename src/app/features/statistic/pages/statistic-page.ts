import { Component } from '@angular/core';
import { StatisticContent } from '@/features/statistic/components/statistic-content/statistic-content';

@Component({
  selector: 'app-statistic-page',
  imports: [StatisticContent],
  template: `<app-statistic-content></app-statistic-content>`,
  styles: `
    :host {
      flex: 1;
      padding: 2rem;
      height: 100%;
      margin-top: 5rem;
    }
  `,
})
export class StatisticPage {}
