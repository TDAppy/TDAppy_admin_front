import { Component, inject, OnInit, signal } from '@angular/core';
import { AdminTable } from '@/core/components/table/admin-table/admin-table';
import tableColumns from 'public/assets/data/table-columns.json';
import tableActions from '../../../../../../public/assets/data/actions-menu.json';
import { ReportServiceApi } from '@/features/reports/services/report-service-api';
import { ReportReplyModel } from '@/features/reports/models/report.model';
import { environment } from '../../../../../environments/environment';
import { ConfirmDeleteModal } from '@/features/users/components/confirm-delete-modal/confirm-delete-modal';
import { UserServiceApi } from '@/features/users/services/user-service-api';
import { BanModal } from '@/features/users/components/ban-modal/ban-modal';

@Component({
  selector: 'app-report-user-content',
  imports: [AdminTable, ConfirmDeleteModal, BanModal],
  templateUrl: './report-user-content.html',
  styleUrl: './report-user-content.css',
})
export class ReportUserContent implements OnInit {
  private _reportApi = inject(ReportServiceApi);
  private _userServiceApi = inject(UserServiceApi);

  actions = tableActions.reportsUsers;
  columns = tableColumns.reportsUsers;
  data = signal<ReportReplyModel[]>([]);
  showDeleteModal = signal(false);
  showBanModal = signal(false);
  showDeleteReplyModal = signal(false);
  selectedReport = signal<ReportReplyModel | null>(null);

  ngOnInit(): void {
    this._reportApi.getAllReplyReports().then((result) => {
      this.data.set(result);
    });
  }

  disabledKeysFn = (row: ReportReplyModel): Record<string, string> => {
    const disabled: Record<string, string> = {};
    if (row.isBanned) {
      disabled['ban'] = 'Cet utilisateur est déjà banni';
    }
    return disabled;
  };

  async onActionTriggered(event: { key: string; row: ReportReplyModel }): Promise<void> {
    switch (event.key) {
      case 'see':
        window.open(`${environment.frontendUrl}/forum/${event.row.topicId}`, '_blank');
        break;
      case 'removeReport':
        this.selectedReport.set(event.row);
        this.showDeleteModal.set(true);
        break;
      case 'ban':
        this.selectedReport.set(event.row);
        this.showBanModal.set(true);
        break;
      case 'deleteReply':
        this.selectedReport.set(event.row);
        this.showDeleteReplyModal.set(true);
        break;
    }
  }

  async onDeleteConfirmed(): Promise<void> {
    const report = this.selectedReport();
    if (!report) return;
    await this._reportApi.deleteReport(report.id);
    this.data.set(this.data().filter((r) => r.id !== report.id));
    this.showDeleteModal.set(false);
    this.selectedReport.set(null);
  }

  async onBanConfirmed(dto: { bannedUntil: string | null }): Promise<void> {
    const report = this.selectedReport();
    if (!report) return;
    await this._userServiceApi.banUser(
      report.userId,
      dto.bannedUntil ? new Date(dto.bannedUntil) : null,
    );
    this.data.set(
      this.data().map((r) => (r.userId === report.userId ? { ...r, isBanned: true } : r)),
    );
    this.showBanModal.set(false);
    this.selectedReport.set(null);
  }

  async onDeleteReplyConfirmed(): Promise<void> {
    const report = this.selectedReport();
    if (!report) return;
    await this._reportApi.deleteReply(report.replyId);
    this.data.set(this.data().filter((r) => r.replyId !== report.replyId));
    this.showDeleteReplyModal.set(false);
    this.selectedReport.set(null);
  }
}
