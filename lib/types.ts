export type Confession = {
  id: string;
  nickname: string;
  content: string;
  createdAt: string;
};

export type PublicConfessionInput = {
  nickname?: string;
  content: string;
};
