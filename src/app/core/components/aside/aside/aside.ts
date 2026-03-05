import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginFacade } from '@/features/authentication/services/login/login-facade';
import { IconsModule } from '@/shared/icons/icons.module';
import menuData from '@/../../public/assets/data/nav-menu.json';

@Component({
  selector: 'app-aside',
  imports: [RouterLinkActive, RouterLink, IconsModule],
  templateUrl: './aside.html',
  styleUrl: './aside.css',
})
export class Aside {
  private _logFacade = inject(LoginFacade);
  menuItems = menuData;
  isCollapsed: boolean = false;

  onLogout(): void {
    this._logFacade.logout();
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
