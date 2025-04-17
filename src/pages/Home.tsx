import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { postService } from '../services/postService';
import { authService } from '../services/authService';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await postService.getAllPosts();
        setPosts(data.results || data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const truncateContent = (content) => {
    const lines = content.split('\n').slice(0, 5);
    return lines.join('\n');
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4">Articles récents</h1>
      
      {currentUser && currentUser.is_admin && (
        <Button as={Link} to="/create-post" variant="primary" className="mb-4">
          Créer un nouvel article
        </Button>
      )}
      
      {posts.length === 0 ? (
        <div className="alert alert-info">Aucun article disponible.</div>
      ) : (
        <Row>
          {posts.map((post) => (
            <Col key={post.id} xs={12} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Par {post.author?.username} - {new Date(post.created_at).toLocaleDateString()}
                  </Card.Subtitle>
                  <Card.Text style={{ whiteSpace: 'pre-line' }}>
                    {truncateContent(post.content)}
                    {post.content.split('\n').length > 5 && <span>...</span>}
                  </Card.Text>
                  <Button as={Link} to={`/posts/${post.id}`} variant="primary">
                    Lire la suite
                  </Button>
                  
                  <div className="mt-3">
                    <Badge bg="secondary" className="me-2">
                      {post.comments?.length || 0} commentaires
                    </Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};
