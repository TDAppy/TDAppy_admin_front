import { Component, inject, OnInit, signal } from '@angular/core';
import tableColumns from '../../../../../../public/assets/data/table-columns.json';
import { AdminTable } from '@/core/components/table/admin-table/admin-table';
import { UserListServiceApi } from '@/features/users/services/user-list-service-api';
import { UserBannedModel, UserModel } from '@/features/users/models/user.model';
import tableActions from '@/../../public/assets/data/actions-menu.json';
import { UserServiceApi } from '@/features/users/services/user-service-api';
import { BanModal } from '@/features/users/components/ban-modal/ban-modal';
import { ConfirmDeleteModal } from '@/features/users/components/confirm-delete-modal/confirm-delete-modal';
import { Pagination } from '@/core/components/pagination/pagination';

@Component({
  selector: 'app-user-list-content',
  imports: [AdminTable, BanModal, ConfirmDeleteModal, Pagination],
  templateUrl: './user-list-content.html',
  styleUrl: './user-list-content.css',
})
export class UserListContent implements OnInit {
  private readonly _userListServiceApi = inject(UserListServiceApi);
  private readonly _userServiceApi = inject(UserServiceApi);

  actions = tableActions.usersList;
  columns = tableColumns.usersList;
  data = signal<UserModel[]>([]);
  currentPage = signal(0);
  totalPages = signal(0);
  totalItems = signal(0);
  showBanModal = signal(false);
  showDeleteModal = signal(false);
  selectedUser = signal<UserBannedModel | null>(null);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this._userListServiceApi.getAllUsers(this.currentPage()).then((result) => {
      this.data.set(result.content);
      this.totalPages.set(result.totalPages);
      this.totalItems.set(result.totalItems);
    });
  }

  goToPage(page: number): void {
    this.currentPage.set(page);
    this.loadUsers();
  }

  async onActionTriggered(event: { key: string; row: UserBannedModel }): Promise<void> {
    switch (event.key) {
      case 'ban':
        this.selectedUser.set(event.row);
        this.showBanModal.set(true);
        break;
      case 'delete':
        this.selectedUser.set(event.row);
        this.showDeleteModal.set(true);
        break;
    }
  }

  async onBanConfirmed(dto: { bannedUntil: string | null }): Promise<void> {
    const user = this.selectedUser();
    if (!user) return;
    await this._userServiceApi.banUser(user.id, dto.bannedUntil ? new Date(dto.bannedUntil) : null);

    this.data.set(this.data().map((u) => (u.id === user.id ? { ...u, status: 'Banni' } : u)));

    this.showBanModal.set(false);
    this.selectedUser.set(null);
  }

  async onDeleteConfirmed(): Promise<void> {
    const user = this.selectedUser();
    if (!user) return;
    await this._userServiceApi.deleteUser(user.id);
    this.data.set(this.data().map((u) => (u.id === user.id ? { ...u, status: 'Supprimé' } : u)));
    this.showDeleteModal.set(false);
    this.selectedUser.set(null);
  }
}
