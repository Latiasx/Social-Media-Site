export type FeedPost = {
  id: string;
  user_id: string;
  caption: string;
  url: string;
  file_type: "image" | "video" | string;
  file_name: string;
  created_at: string;
  is_owner: boolean;
  email: string;
};

export type FeedResponse = { posts: FeedPost[] };
