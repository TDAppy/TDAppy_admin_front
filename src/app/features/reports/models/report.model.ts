export type ReportTopicModel = {
  id: number;
  topicTitle: string;
  username: string;
  reporterUser: string;
  reportedMessage: string;
  reasons: string[];
  reportedAt: string;
  topicId: number;
  isActive: boolean;
};

export type ReportReplyModel = {
  id: number;
  userId: number;
  topicId: number;
  replyId: number;
  username: string;
  reporterUser: string;
  reasons: string[];
  reportedMessage: string;
  reportedAt: string;
  isBanned: boolean;
};
