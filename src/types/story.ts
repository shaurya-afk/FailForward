export type Story = {
  id: number;
  userId: string;
  founderName: string;
  isAnonymous: boolean;
  storyTitle: string;
  industry: string;
  previewText: string;
  helpfulVotes: number;
  commentCount: number;
};

export type StoryRequest = {
  userId: string;
  founderName: string;
  isAnonymous: boolean;
  storyTitle: string;
  industry: string;
  previewText: string;
};

export type StoryResponse = {
  id: string;
  userId: string;
  founderName: string;
  isAnonymous: boolean;
  storyTitle: string;
  industry: string;
  previewText: string;
  helpfulVotes: number;
  commentCount: number;
};