import { Component, input } from '@angular/core';
import { MenuItem } from '@/features/dashboard/models/menu.model';
import { IconsModule } from '@/shared/icons/icons.module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard-card',
  imports: [IconsModule, RouterLink],
  templateUrl: './dashboard-card.html',
  styleUrl: './dashboard-card.css',
})
export class DashboardCard {
  item = input.required<MenuItem>();
}
