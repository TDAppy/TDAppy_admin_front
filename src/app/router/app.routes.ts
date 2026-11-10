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
import { ContentPodcastPage } from '@/features/content/pages/content-podcast-page';
import { StatisticPage } from '@/features/statistic/pages/statistic-page';
import { LogsPage } from '@/features/logs/pages/logs-page';
import { authGuard } from '@/router/guards/auth-guard';

export const routes: Routes = [
  { path: '', component: LoginPage },
  { path: 'dashboard', component: DashboardPage, canActivate: [authGuard] },
  {
    path: 'reports',
    canActivate: [authGuard],
    children: [
      { path: 'users', component: ReportUserPage },
      { path: 'topics', component: ReportTopicPage },
    ],
  },
  {
    path: 'users',
    canActivate: [authGuard],
    children: [
      { path: 'list', component: UserListPage },
      { path: 'banned', component: UserBannedPage },
    ],
  },
  {
    path: 'forums',
    canActivate: [authGuard],
    children: [
      { path: 'list', component: ForumListPage },
      { path: 'deactivated', component: ForumDeactivatedPage },
    ],
  },
  {
    path: 'content',
    canActivate: [authGuard],
    children: [
      { path: 'resources', component: ContentResourcePage },
      { path: 'podcasts', component: ContentPodcastPage },
      { path: 'products', component: DashboardPage },
      { path: 'promotional-codes', component: DashboardPage },
    ],
  },
  { path: 'statistics', component: StatisticPage, canActivate: [authGuard] },
  { path: 'logs', component: LogsPage, canActivate: [authGuard] },
  { path: '**', redirectTo: 'dashboard' },
];
