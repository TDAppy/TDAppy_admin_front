import { Component, inject, OnInit, signal } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { StatisticsQuizServiceApi } from '@/features/statistic/services/statistics-quiz-service-api';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart-statistic-quiz',
  imports: [BaseChartDirective],
  templateUrl: './chart-statistic-quiz.html',
  styleUrl: './chart-statistic-quiz.css',
})
export class ChartStatisticQuiz implements OnInit {
  private readonly _statisticsQuizServiceApi = inject(StatisticsQuizServiceApi);

  childrenTotal = signal(0);
  adultsTotal = signal(0);

  childrenChartData = signal<ChartData<'pie'>>({
    labels: ['Signes faibles', 'Signes modérés', 'Signes élevés'],
    datasets: [{ data: [0, 0, 0], backgroundColor: ['', '', ''] }],
  });

  adultsChartData = signal<ChartData<'pie'>>({
    labels: ['Signes faibles', 'Signes modérés', 'Signes élevés'],
    datasets: [{ data: [0, 0, 0], backgroundColor: ['', '', ''] }],
  });

  chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  ngOnInit(): void {
    this._statisticsQuizServiceApi.getStatisticsQuiz().then((result) => {
      const stats = result[0];

      this.childrenTotal.set(
        stats.childrenLowSigns + stats.childrenModerateSigns + stats.childrenHighSigns,
      );
      this.adultsTotal.set(
        stats.adultsLowSigns + stats.adultsModerateSigns + stats.adultsHighSigns,
      );

      this.childrenChartData.set({
        labels: ['Signes faibles', 'Signes modérés', 'Signes élevés'],
        datasets: [
          {
            data: [stats.childrenLowSigns, stats.childrenModerateSigns, stats.childrenHighSigns],
            backgroundColor: ['#0A7B79FF', '#7CA8A1FF', '#FF6467FF'],
          },
        ],
      });

      this.adultsChartData.set({
        labels: ['Signes faibles', 'Signes modérés', 'Signes élevés'],
        datasets: [
          {
            data: [stats.adultsLowSigns, stats.adultsModerateSigns, stats.adultsHighSigns],
            backgroundColor: ['#0A7B79FF', '#7CA8A1FF', '#FF6467FF'],
          },
        ],
      });
    });
  }
}
