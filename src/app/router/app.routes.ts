import { Routes } from '@angular/router';
import { LoginPage } from '@/features/authentication/pages/login-page';
import { DashboardPage } from '@/features/dashboard/pages/dashboard-page';

export const routes: Routes = [
  { path: '', component: LoginPage },
  { path: 'dashboard', component: DashboardPage },

  {
    path: 'reports',
    children: [
      { path: 'users', component: DashboardPage },
      { path: 'topics', component: DashboardPage },
    ],
  },
  {
    path: 'users',
    children: [
      { path: 'list', component: DashboardPage },
      { path: 'banned', component: DashboardPage },
    ],
  },
  {
    path: 'forums',
    children: [
      { path: 'list', component: DashboardPage },
      { path: 'deactivated', component: DashboardPage },
    ],
  },
  {
    path: 'content',
    children: [
      { path: 'resources', component: DashboardPage },
      { path: 'products', component: DashboardPage },
      { path: 'promotional-codes', component: DashboardPage },
    ],
  },

  { path: 'statistics', component: DashboardPage },

  { path: '**', redirectTo: 'dashboard' },
];
