import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Pagination } from 'react-bootstrap';
import { postService } from '../services/postService';
import { authService } from '../services/authService';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentPages, setCommentPages] = useState({});
  const currentUser = authService.getCurrentUser();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await postService.getAllPosts();
        setPosts(data.results || data);
        
        // Initialiser les pages de commentaires pour chaque post
        const pages = {};
        (data.results || data).forEach(post => {
          if (post.comments && post.comments.length > 0) {
            pages[post.id] = 1;
          }
        });
        setCommentPages(pages);
        
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const loadMoreComments = async (postId, page) => {
    try {
      const updatedPosts = await postService.getAllPosts(`comment_page=${page}`);
      const post = updatedPosts.results.find(p => p.id === postId);
      if (post) {
        setPosts(prevPosts => prevPosts.map(p => 
          p.id === postId ? { ...p, comments: post.comments } : p
        ));
        setCommentPages(prev => ({
          ...prev,
          [postId]: page
        }));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des commentaires:', error);
    }
  };

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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Articles récents</h1>
        {currentUser && currentUser.role === 'admin' && (
          <Button as={Link} to="/create-post" variant="primary" size="lg">
            Créer un nouvel article
          </Button>
        )}
      </div>
      
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
                      {post.total_comments || 0} commentaires
                    </Badge>
                    
                    {/* Affichage des commentaires avec pagination */}
                    {post.comments && post.comments.length > 0 && (
                      <div className="mt-3">
                        <h6>Derniers commentaires :</h6>
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="comment-preview mb-2">
                            <small className="text-muted">
                              <strong>{comment.author?.username}</strong> - {new Date(comment.created_at).toLocaleDateString()}
                            </small>
                            <p className="mb-1">{comment.content}</p>
                          </div>
                        ))}
                        
                        {/* Pagination des commentaires */}
                        {post.total_comments > 5 && (
                          <div className="d-flex justify-content-between align-items-center mt-2">
                            <Button 
                              variant="link" 
                              className="p-0 text-decoration-none"
                              onClick={() => loadMoreComments(post.id, commentPages[post.id] - 1)}
                              disabled={commentPages[post.id] <= 1}
                            >
                              &larr; Précédent
                            </Button>
                            <span className="text-muted">
                              Page {commentPages[post.id]} sur {Math.ceil(post.total_comments / 5)}
                            </span>
                            <Button 
                              variant="link" 
                              className="p-0 text-decoration-none"
                              onClick={() => loadMoreComments(post.id, commentPages[post.id] + 1)}
                              disabled={commentPages[post.id] >= Math.ceil(post.total_comments / 5)}
                            >
                              Suivant &rarr;
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
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
