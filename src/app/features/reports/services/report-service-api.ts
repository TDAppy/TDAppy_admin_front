import { Injectable } from '@angular/core';
import { BaseApi } from '@/shared/services/base.api';
import { ReportReplyModel, ReportTopicModel } from '@/features/reports/models/report.model';

@Injectable({
  providedIn: 'root',
})
export class ReportServiceApi extends BaseApi {
  private readonly _url = '/reports';

  reasonLabels: Record<string, string> = {
    INAPPROPRIATE_CONTENT: ' Contenu inapproprié',
    SPAM: ' Spam',
    HARASSMENT: ' Harcèlement',
    HATE_SPEECH: ' Discours haineux',
    OFFENSIVE_NAME: ' Nom offensant',
    OTHER: ' Autre',
  };

  async getAllTopicReports(): Promise<ReportTopicModel[]> {
    const response = await this.get<any[]>(this._url + '/topics');

    return response.map((item) => ({
      id: item.id,
      topicTitle: item.topicTitle,
      topicId: item.topicId,
      username: item.username,
      reporterUser: item.reporterUser,
      reportedMessage: item.reportedMessage,
      reasons: item.reasons.map((r: string) => this.reasonLabels[r] ?? r),
      reportedAt: new Date(item.reportedAt).toLocaleDateString('FR-fr', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      isActive: item.isActive,
    }));
  }

  async getAllReplyReports(): Promise<ReportReplyModel[]> {
    const response = await this.get<any[]>(this._url + '/reply');
    return response.map((item) => ({
      id: item.id,
      userId: item.userId,
      replyId: item.replyId,
      topicId: item.topicId,
      username: item.username,
      reporterUser: item.reporterUser,
      reasons: item.reasons.map((r: string) => this.reasonLabels[r] ?? r),
      reportedMessage: item.reportedMessage,
      reportedAt: new Date(item.reportedAt).toLocaleDateString('FR-fr', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      isBanned: item.isBanned,
    }));
  }

  async deleteReply(replyId: number): Promise<void> {
    await this.delete(`/reply/${replyId}`);
  }

  async deleteReport(id: number): Promise<void> {
    await this.delete(`${this._url}/${id}`);
  }
}
