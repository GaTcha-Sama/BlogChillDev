import { api } from '../api/config';

export const postService = {
  getAllPosts: async () => {
    const response = await api.get('/posts/');
    return response.data;
  },
  
  getPostById: async (id) => {
    const response = await api.get(`/posts/${id}/`);
    return response.data;
  },
  
  createPost: async (createPostData) => {
    const response = await api.post('/posts/', createPostData);
    return response.data;
  },
  
  getComments: async (postId, page = 1) => {
    const response = await api.get(`/posts/${postId}/comments/?page=${page}`);
    return response.data;
  },
  
  addComment: async (postId, content) => {
    const response = await api.post(`/posts/${postId}/add_comment/`, { content });
    return response.data;
  },
  
  toggleEmoji: async (postId, emojiType) => {
    const response = await api.post(`/posts/${postId}/toggle_emoji/`, { 
      emoji_type: emojiType,
      post: parseInt(postId),
      type: emojiType.toString()
    });
    return response.data;
  }
};
