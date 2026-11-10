import { Component } from '@angular/core';
import { ChartStatisticQuiz } from '@/features/statistic/components/chart-statistic-quiz/chart-statistic-quiz';

@Component({
  selector: 'app-statistic-content',
  imports: [ChartStatisticQuiz],
  templateUrl: './statistic-content.html',
  styleUrl: './statistic-content.css',
})
export class StatisticContent {}
