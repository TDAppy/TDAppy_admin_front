export type ResourcesModel = {
  id: number;
  title: string;
  content: string;
  image: string;
  type: string;
  description: string;
  reference: string;
  theme: string;
  publishedAt: string;
};

export type ResourceCreateModel = {
  title: string;
  content: string;
  file: File | null;
  type: string;
  description: string;
  reference: string;
  theme: string;
};
