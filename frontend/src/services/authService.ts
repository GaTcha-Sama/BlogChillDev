import { api } from '../api/config';

// Créer un événement personnalisé pour les changements d'authentification
const createAuthEvent = () => {
  const event = new Event('authChange');
  window.dispatchEvent(event);
};

export const authService = {
  login: async (username, password) => {
    try {
      const response = await api.post('/token/', { username, password });
      if (response.data.access) {
        const userDetails = await authService.getCurrentUserDetails(response.data.access);
        
        const role = userDetails.is_staff === true ? 'admin' : 'user';
        
        const userWithDetails = {
          ...response.data,
          ...userDetails,
          role: role,
          username: username
        };
        
        localStorage.setItem('user', JSON.stringify(userWithDetails));
        createAuthEvent(); // Déclencher l'événement après la connexion
        return userWithDetails;
      }
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  },
  
  logout: () => {
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    createAuthEvent(); // Déclencher l'événement après la déconnexion
  },
  
  register: async (username, email, password) => {
    try {
      return await api.post('/users/', {
        username,
        email,
        password,
        password2: password
      });
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      throw error;
    }
  },
  
  getCurrentUser: () => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      return null;
    }
  },
  
  getCurrentUserDetails: async (token) => {
    try {
      const response = await api.get('/users/me/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des détails utilisateur:', error);
      return {};
    }
  },
  
  getAuthHeader: () => {
    const user = authService.getCurrentUser();
    if (user && user.access) {
      return { Authorization: `Bearer ${user.access}` };
    }
    return {};
  },
  
  getUserById: async (id: string) => {
    try {
      const response = await api.get(`/users/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des détails utilisateur:', error);
      throw error;
    }
  },
}; 