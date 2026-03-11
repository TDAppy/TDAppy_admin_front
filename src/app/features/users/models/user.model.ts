export type UserModel = {
  id: number;
  username: string;
  status: string;
};

export type UserBannedModel = {
  id: number;
  username: string;
  bannedAt: string;
  bannedUntil: string | null;
  duration: string;
};
