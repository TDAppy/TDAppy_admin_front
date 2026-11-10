export type PodcastModel = {
  id: number;
  title: string;
  description: string;
  audio: string;
  image: string | null;
  durationSeconds: number | null;
  duration: string;
  publishedAt: string;
};

export type PodcastCreateModel = {
  title: string;
  description: string;
  durationSeconds: number | null;
  audioFile: File | null;
  coverFile: File | null;
};
