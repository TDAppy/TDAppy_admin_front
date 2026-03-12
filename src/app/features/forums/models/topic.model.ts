export type TopicModel = {
  id: number;
  topicTitle: string;
  authorUsername: string;
  createdAt: string;
  status: string;
  message: string;
  categoryName: string;
};

export type TopicDeactivatedModel = {
  id: number;
  topicTitle: string;
  authorUsername: string;
};

export type TopicUpdateModel = {
  title: string;
  message: string;
  categoryName: string;
};
