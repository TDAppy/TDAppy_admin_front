import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { LogServiceApi } from '@/features/logs/services/log-service-api';

const LINE_OPTIONS = [100, 300, 500, 1000, 2000] as const;

type LogLevel = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG' | 'TRACE' | 'OTHER';

const ALL_LEVELS: LogLevel[] = ['ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE', 'OTHER'];

type ParsedLogLine = {
  text: string;
  level: LogLevel;
};

type LevelSummary = {
  level: LogLevel;
  count: number;
};

// Format par défaut de Spring Boot : "... <niveau> <pid> --- [thread] logger : message".
const LEVEL_PATTERN = /\b(ERROR|WARN|INFO|DEBUG|TRACE)\b/;

@Component({
  selector: 'app-log-viewer',
  imports: [],
  templateUrl: './log-viewer.html',
  styleUrl: './log-viewer.css',
})
export class LogViewer implements OnInit {
  private readonly _logApi = inject(LogServiceApi);

  protected readonly lineOptions = LINE_OPTIONS;
  protected readonly selectedLines = signal(300);
  protected readonly lines = signal<string[]>([]);
  protected readonly totalLines = signal(0);
  protected readonly available = signal(true);
  protected readonly isLoading = signal(false);
  protected readonly error = signal<string | null>(null);

  // Toutes les catégories sont actives par défaut ; on désactive celles qu'on veut masquer.
  protected readonly activeLevels = signal<Set<LogLevel>>(new Set(ALL_LEVELS));

  // Une ligne de stack trace n'a pas de niveau propre : elle hérite du niveau de la ligne
  // précédente pour garder toute une erreur regroupée visuellement (même couleur/catégorie),
  // tout en restant affichée comme une carte séparée.
  protected readonly parsedLines = computed<ParsedLogLine[]>(() => {
    let lastLevel: LogLevel = 'INFO';
    return this.lines().map((line) => {
      const match = line.match(LEVEL_PATTERN);
      const level = (match?.[1] as LogLevel | undefined) ?? lastLevel;
      lastLevel = level;
      return { text: line, level };
    });
  });

  protected readonly levelSummaries = computed<LevelSummary[]>(() => {
    const counts = new Map<LogLevel, number>(ALL_LEVELS.map((level) => [level, 0]));
    for (const entry of this.parsedLines()) {
      counts.set(entry.level, (counts.get(entry.level) ?? 0) + 1);
    }
    return ALL_LEVELS.map((level) => ({ level, count: counts.get(level) ?? 0 }));
  });

  protected readonly filteredLines = computed<ParsedLogLine[]>(() =>
    this.parsedLines().filter((entry) => this.activeLevels().has(entry.level)),
  );

  ngOnInit(): void {
    this.refresh();
  }

  async refresh(): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const response = await this._logApi.getLogs(this.selectedLines());
      this.lines.set(response.lines);
      this.totalLines.set(response.totalLines);
      this.available.set(response.available);
    } catch {
      this.error.set('Impossible de récupérer les logs.');
    } finally {
      this.isLoading.set(false);
    }
  }

  onLineCountChange(value: string): void {
    this.selectedLines.set(Number(value));
    this.refresh();
  }

  protected isLevelActive(level: LogLevel): boolean {
    return this.activeLevels().has(level);
  }

  protected toggleLevel(level: LogLevel): void {
    const next = new Set(this.activeLevels());
    if (next.has(level)) {
      next.delete(level);
    } else {
      next.add(level);
    }
    this.activeLevels.set(next);
  }
}
