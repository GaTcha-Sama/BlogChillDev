import { api } from '../api/config';

export const authService = {
  login: async (username, password) => {
    const response = await api.post('/token/', { username, password });
    if (response.data.access) {
      // Enregistrer temporairement le token
      localStorage.setItem('user', JSON.stringify({
        ...response.data,
        username
      }));
      
      // Récupérer les détails utilisateur
      const userDetails = await authService.getCurrentUserDetails(response.data.access);
      
      // Détecter si l'utilisateur est admin (soit par username, soit par d'autres attributs)
      const isAdmin = username.toLowerCase() === 'admin' || 
                     userDetails.is_staff === true || 
                     userDetails.is_superuser === true ||
                     userDetails.is_admin === true;
      
      // Créer un objet utilisateur complet avec toutes les informations
      const userWithDetails = {
        ...response.data,
        ...userDetails,
        is_admin: isAdmin, // Ajouter explicitement ce champ
        username: username // Garantir que le nom d'utilisateur est inclus
      };
      
      // Stocker l'objet utilisateur complet
      localStorage.setItem('user', JSON.stringify(userWithDetails));
      return userWithDetails;
    }
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('user');
  },
  
  register: async (username, email, password) => {
    return api.post('/users/', {
      username,
      email,
      password,
      password2: password // Le backend attend ce champ
    });
  },
  
  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
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
      console.error('Erreur lors de la récupération des détails utilisateur', error);
      return {};
    }
  },
  
  getAuthHeader: () => {
    const user = authService.getCurrentUser();
    if (user && user.access) {
      return { Authorization: `Bearer ${user.access}` };
    }
    return {};
  }
}; 