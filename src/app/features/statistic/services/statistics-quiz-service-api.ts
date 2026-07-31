import { Injectable } from '@angular/core';
import { BaseApi } from '@/shared/services/base.api';
import { StatisticQuizModel } from '@/features/statistic/models/statistic.model';

@Injectable({
  providedIn: 'root',
})
export class StatisticsQuizServiceApi extends BaseApi {
  private readonly _url = '/statistics/quiz';

  async getStatisticsQuiz(): Promise<StatisticQuizModel[]> {
    return this.get(this._url);
  }
}
