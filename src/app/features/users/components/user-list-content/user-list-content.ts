import { Component, inject, OnInit, signal } from '@angular/core';
import tableColumns from '../../../../../../public/assets/data/table-columns.json';
import { AdminTable } from '@/core/components/table/admin-table/admin-table';
import { UserListServiceApi } from '@/features/users/services/user-list-service-api';
import { UserModel } from '@/features/users/models/user.model';

@Component({
  selector: 'app-user-list-content',
  imports: [AdminTable],
  templateUrl: './user-list-content.html',
  styleUrl: './user-list-content.css',
})
export class UserListContent implements OnInit {
  private readonly _userListServiceApi = inject(UserListServiceApi);

  columns = tableColumns.usersList;
  data = signal<UserModel[]>([]);

  ngOnInit(): void {
    this._userListServiceApi.getAllUsers().then((result) => {
      this.data.set(result);
    });
  }
}
