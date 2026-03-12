import { Component, inject, OnInit, signal } from '@angular/core';
import tableColumns from '../../../../../../public/assets/data/table-columns.json';
import { AdminTable } from '@/core/components/table/admin-table/admin-table';
import tableActions from '../../../../../../public/assets/data/actions-menu.json';
import { ReportServiceApi } from '@/features/reports/services/report-service-api';
import { ReportTopicModel } from '@/features/reports/models/report.model';
import { environment } from '../../../../../environments/environment';
import { TopicServiceApi } from '@/features/forums/services/topic-service-api';
import { ConfirmDeleteModal } from '@/features/users/components/confirm-delete-modal/confirm-delete-modal';

@Component({
  selector: 'app-report-topic-content',
  imports: [AdminTable, ConfirmDeleteModal],
  templateUrl: './report-topic-content.html',
  styleUrl: './report-topic-content.css',
})
export class ReportTopicContent implements OnInit {
  private _reportApi = inject(ReportServiceApi);
  private _topicListServiceApi = inject(TopicServiceApi);

  actions = tableActions.reportsTopics;
  columns = tableColumns.reportsTopics;
  data = signal<ReportTopicModel[]>([]);
  showToggleStatusModal = signal(false);
  showDeleteModal = signal(false);
  selectedReport = signal<ReportTopicModel | null>(null);

  ngOnInit(): void {
    this._reportApi.getAllTopicReports().then((result) => {
      this.data.set(result);
    });
  }

  disabledKeysFn = (row: ReportTopicModel): Record<string, string> => {
    const disabled: Record<string, string> = {};
    if (!row.isActive) {
      disabled['deactivate'] = 'Ce topic est déjà désactivé';
    }
    return disabled;
  };

  async onActionTriggered(event: { key: string; row: ReportTopicModel }): Promise<void> {
    switch (event.key) {
      case 'see':
        window.open(`${environment.frontendUrl}/forum/${event.row.topicId}`, '_blank');
        break;
      case 'removeReport':
        this.selectedReport.set(event.row);
        this.showDeleteModal.set(true);
        break;
      case 'deactivate':
        this.selectedReport.set(event.row);
        this.showToggleStatusModal.set(true);
        break;
    }
  }

  async onToggleStatusConfirmed(): Promise<void> {
    const report = this.selectedReport();
    if (!report) return;
    await this._topicListServiceApi.deactivateTopic(report.topicId);
    await this._reportApi.deleteReport(report.id);
    this.data.set(this.data().filter((r) => r.id !== report.id));
    this.showToggleStatusModal.set(false);
    this.selectedReport.set(null);
  }

  async onDeleteConfirmed(): Promise<void> {
    const report = this.selectedReport();
    if (!report) return;
    await this._reportApi.deleteReport(report.id);
    this.data.set(this.data().filter((r) => r.id !== report.id));
    this.showDeleteModal.set(false);
    this.selectedReport.set(null);
  }
}
