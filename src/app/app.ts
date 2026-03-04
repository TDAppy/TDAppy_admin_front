import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Aside } from '@/core/components/aside/aside/aside';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Aside],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('TDAppy_admin_front');
  private router = inject(Router);

  isLoginPage():boolean {
    return this.router.url === '/';
  }
}
