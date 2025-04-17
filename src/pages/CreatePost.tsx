import { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { postService } from '../services/postService';
import { authService } from '../services/authService';

export const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || !currentUser.is_admin) {
      navigate('/');
      return;
    }
    setUser(currentUser);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      const postData = {
        title: title.trim(),
        content: content.trim()
      };
      
      const response = await postService.createPost(postData);
      setLoading(false);
      
      // Rediriger vers la page de détail du nouvel article
      navigate(`/posts/${response.id}`);
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.detail || 
        "Une erreur est survenue lors de la création de l'article. Veuillez réessayer."
      );
    }
  };

  if (!user) {
    return (
      <Container className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Créer un nouvel article</h1>
      
      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Titre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez le titre de l'article"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Contenu</Form.Label>
          <Form.Control
            as="textarea"
            rows={15}
            placeholder="Rédigez votre article ici..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{ fontFamily: 'monospace' }}
          />
          <Form.Text className="text-muted">
            Astuce : Vous pouvez utiliser des sauts de ligne pour structurer votre texte.
          </Form.Text>
        </Form.Group>
        
        <div className="d-flex gap-2">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Publication en cours...
              </>
            ) : 'Publier'}
          </Button>
          <Button variant="outline-secondary" onClick={() => navigate('/')}>
            Annuler
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default CreatePost; 