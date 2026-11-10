import { Component } from '@angular/core';
import { DashboardContent } from '@/features/dashboard/components/dashboard-content/dashboard-content';

@Component({
  selector: 'app-dashboard-page',
  imports: [DashboardContent],
  template: ` <app-dashboard-content></app-dashboard-content> `,
  styles: `
    app-dashboard-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  `,
})
export class DashboardPage {}
