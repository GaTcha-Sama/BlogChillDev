import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const getAuthHeader = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    const user = JSON.parse(userStr);
    return {
      'Authorization': `Bearer ${user.access}`
    };
  }
  return {};
};

export const postService = {
  getAllPosts: async (params = '') => {
    const response = await axios.get(`${API_URL}/posts/${params ? `?${params}` : ''}`);
    return response.data;
  },
  
  getPostById: async (id) => {
    const response = await axios.get(`${API_URL}/posts/${id}/`);
    return response.data;
  },
  
  createPost: async (postData) => {
    const response = await axios.post(`${API_URL}/posts/`, postData, {
      headers: getAuthHeader()
    });
    return response.data;
  },
  
  updatePost: async (id, postData) => {
    const response = await axios.put(`${API_URL}/posts/${id}/`, postData, {
      headers: getAuthHeader()
    });
    return response.data;
  },
  
  deletePost: async (id) => {
    const response = await axios.delete(`${API_URL}/posts/${id}/`, {
      headers: getAuthHeader()
    });
    return response.data;
  },
  
  getComments: async (postId, page = 1) => {
    const response = await axios.get(`${API_URL}/posts/${postId}/comments/?page=${page}`);
    return response.data;
  },
  
  addComment: async (postId, content) => {
    const response = await axios.post(`${API_URL}/posts/${postId}/add_comment/`, 
      { content },
      {
        headers: getAuthHeader()
      }
    );
    return response.data;
  },
  
  toggleEmoji: async (postId, emojiType) => {
    const response = await axios.post(`${API_URL}/posts/${postId}/toggle_emoji/`, 
      { emoji_type: emojiType },
      {
        headers: getAuthHeader()
      }
    );
    return response.data;
  }
};
