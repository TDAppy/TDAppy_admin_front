import { Component, inject, OnInit, signal } from '@angular/core';
import tableColumns from '../../../../../../public/assets/data/table-columns.json';
import { AdminTable } from '@/core/components/table/admin-table/admin-table';
import { UserBannedServiceApi } from '@/features/users/services/user-banned-service-api';
import { UserBannedModel } from '@/features/users/models/user.model';
import tableActions from '@/../../public/assets/data/actions-menu.json';
import { UserServiceApi } from '@/features/users/services/user-service-api';
import { ConfirmDeleteModal } from '@/features/users/components/confirm-delete-modal/confirm-delete-modal';
import { Pagination } from '@/core/components/pagination/pagination';

@Component({
  selector: 'app-user-banned-content',
  imports: [AdminTable, ConfirmDeleteModal, Pagination],
  templateUrl: './user-banned-content.html',
  styleUrl: './user-banned-content.css',
})
export class UserBannedContent implements OnInit {
  private readonly _userBannedServiceApi = inject(UserBannedServiceApi);
  private readonly _userServiceApi = inject(UserServiceApi);

  actions = tableActions.usersBanned;
  columns = tableColumns.usersBanned;
  data = signal<UserBannedModel[]>([]);
  currentPage = signal(0);
  totalPages = signal(0);
  totalItems = signal(0);
  showDeleteModal = signal(false);
  selectedUser = signal<UserBannedModel | null>(null);

  ngOnInit(): void {
    this.loadBannedUsers();
  }

  loadBannedUsers(): void {
    this._userBannedServiceApi.getAllBannedUsers(this.currentPage()).then((result) => {
      this.data.set(result.content);
      this.totalPages.set(result.totalPages);
      this.totalItems.set(result.totalItems);
    });
  }

  goToPage(page: number): void {
    this.currentPage.set(page);
    this.loadBannedUsers();
  }

  async onActionTriggered(event: { key: string; row: UserBannedModel }): Promise<void> {
    switch (event.key) {
      case 'unban':
        await this._userServiceApi.unban(event.row.id);
        this.data.set(this.data().filter((user) => user.id !== event.row.id));
        break;
      case 'delete':
        this.selectedUser.set(event.row);
        this.showDeleteModal.set(true);
        break;
    }
  }

  async onDeleteConfirmed(): Promise<void> {
    const user = this.selectedUser();
    if (!user) return;
    await this._userServiceApi.deleteUser(user.id);
    this.data.set(this.data().filter((u) => u.id !== user.id));
    this.showDeleteModal.set(false);
    this.selectedUser.set(null);
  }
}
