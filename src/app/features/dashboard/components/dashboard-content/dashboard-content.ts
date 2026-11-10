import { Component } from '@angular/core';
import { DashboardCard } from '@/features/dashboard/components/dashboard-card/dashboard-card';
import menuData from '@/../../public/assets/data/nav-menu.json';

@Component({
  selector: 'app-dashboard-content',
  imports: [DashboardCard],
  templateUrl: './dashboard-content.html',
  styleUrl: './dashboard-content.css',
})
export class DashboardContent {
  menuItems = menuData.filter((item) => item.children);
}
