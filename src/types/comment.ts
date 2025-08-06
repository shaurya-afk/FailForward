export type Comment = {
  id: number;
  storyId: number;
  userId: string;
  displayName: string;
  isAnonymous: boolean;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type CommentRequest = {
  storyId: number;
  userId: string;
  commenterName?: string;
  isAnonymous: boolean;
  content: string;
}; 