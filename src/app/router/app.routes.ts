import { Routes } from '@angular/router';
import { LoginPage } from '@/features/authentication/pages/login-page';
import { DashboardPage } from '@/features/dashboard/pages/dashboard-page';
import { ReportUserPage } from '@/features/reports/pages/report-user-page';
import { ReportTopicPage } from '@/features/reports/pages/report-topic-page';
import { UserListPage } from '@/features/users/pages/user-list-page';
import { UserBannedPage } from '@/features/users/pages/user-banned-page';
import { ForumListPage } from '@/features/forums/pages/forum-list-page';
import { ForumDeactivatedPage } from '@/features/forums/pages/forum-deactivated-page';
import { ContentResourcePage } from '@/features/content/pages/content-resource-page';
import { StatisticPage } from '@/features/statistic/pages/statistic-page';

export const routes: Routes = [
  { path: '', component: LoginPage },
  { path: 'dashboard', component: DashboardPage },

  {
    path: 'reports',
    children: [
      { path: 'users', component: ReportUserPage },
      { path: 'topics', component: ReportTopicPage },
    ],
  },
  {
    path: 'users',
    children: [
      { path: 'list', component: UserListPage },
      { path: 'banned', component: UserBannedPage },
    ],
  },
  {
    path: 'forums',
    children: [
      { path: 'list', component: ForumListPage },
      { path: 'deactivated', component: ForumDeactivatedPage },
    ],
  },
  {
    path: 'content',
    children: [
      { path: 'resources', component: ContentResourcePage },
      { path: 'products', component: DashboardPage },
      { path: 'promotional-codes', component: DashboardPage },
    ],
  },

  { path: 'statistics', component: StatisticPage },

  { path: '**', redirectTo: 'dashboard' },
];
