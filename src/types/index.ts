export interface PostData {
  id: number;
  title: string;
  content: string;
  author: string;
  excerpt: string | null;
  featuredImage: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostInput {
  title: string;
  content: string;
  author: string;
  excerpt?: string;
  featuredImage?: string;
}

export interface UpdatePostInput {
  title?: string;
  content?: string;
  author?: string;
  excerpt?: string;
  featuredImage?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
