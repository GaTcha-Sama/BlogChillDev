import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Form, Alert, Badge } from 'react-bootstrap';
import { postService } from '../services/postService';
import { authService } from '../services/authService';
import { Link } from 'react-router-dom';

export const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Map pour convertir les types d'emoji en caractères Unicode
  const emojiMap = {
    'like': '👍',
    'love': '❤️',
    'laugh': '😂',
    'wow': '😮',
    'sad': '😢',
    'angry': '😡'
  };

  // Map pour convertir les caractères Unicode en types d'emoji
  const emojiTypeMap = {
    '👍': 'like',
    '❤️': 'love',
    '😂': 'laugh',
    '😮': 'wow',
    '😢': 'sad',
    '😡': 'angry'
  };

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        setLoading(true);
        const postData = await postService.getPostById(id);
        setPost(postData);
        
        // Charger les commentaires
        const commentsData = await postService.getComments(id);
        setComments(commentsData.results || []);
        setTotalPages(Math.ceil((commentsData.count || 0) / 10));
        
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement de l'article:", error);
        setError("Impossible de charger l'article. Veuillez réessayer plus tard.");
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    try {
      setCommentLoading(true);
      await postService.addComment(id, newComment.trim());
      
      // Recharger les commentaires
      const commentsData = await postService.getComments(id);
      setComments(commentsData.results || []);
      setTotalPages(Math.ceil((commentsData.count || 0) / 10));
      
      setNewComment('');
      setCommentLoading(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire:", error);
      setError("Impossible d'ajouter le commentaire. Veuillez réessayer plus tard.");
      setCommentLoading(false);
    }
  };

  const handleEmojiToggle = async (emojiType) => {
    try {
      const updatedPost = await postService.toggleEmoji(id, emojiType);
      setPost(updatedPost);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'emoji:", error);
    }
  };

  const loadMoreComments = async (page) => {
    try {
      const commentsData = await postService.getComments(id, page);
      setComments(commentsData.results || []);
      setCurrentPage(page);
    } catch (error) {
      console.error("Erreur lors du chargement des commentaires:", error);
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={() => navigate(-1)}>
          Retourner en arrière
        </Button>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container className="my-5">
        <Alert variant="warning">Article non trouvé</Alert>
        <Button variant="primary" onClick={() => navigate('/')}>
          Retourner à l'accueil
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Button variant="outline-secondary" className="mb-4" onClick={() => navigate(-1)}>
        &larr; Retour
      </Button>
      
      <Card className="mb-4">
        <Card.Body>
          <Card.Title as="h1">{post.title}</Card.Title>
          <Card.Subtitle className="mb-3 text-muted">
            Par <Link to={`/users/${post.author?.id}`}>{post.author?.username}</Link> - {new Date(post.created_at).toLocaleDateString()}
          </Card.Subtitle>
          <Card.Text style={{ whiteSpace: 'pre-line' }}>
            {post.content}
          </Card.Text>
          
          {/* Réactions emoji */}
          <div className="d-flex gap-2 my-3">
            <Button 
              variant={post.user_reactions?.includes('like') ? "primary" : "outline-primary"} 
              onClick={() => handleEmojiToggle('👍')}
              disabled={!currentUser}
            >
              👍 {post.emoji_counts?.find(e => e.emoji_type === 'like')?.count || 0}
            </Button>
            <Button 
              variant={post.user_reactions?.includes('love') ? "danger" : "outline-danger"} 
              onClick={() => handleEmojiToggle('❤️')}
              disabled={!currentUser}
            >
              ❤️ {post.emoji_counts?.find(e => e.emoji_type === 'love')?.count || 0}
            </Button>
            <Button 
              variant={post.user_reactions?.includes('laugh') ? "warning" : "outline-warning"} 
              onClick={() => handleEmojiToggle('😂')}
              disabled={!currentUser}
            >
              😂 {post.emoji_counts?.find(e => e.emoji_type === 'laugh')?.count || 0}
            </Button>
          </div>
        </Card.Body>
      </Card>
      
      <h3 className="mb-3">Commentaires</h3>
      
      {currentUser ? (
        <Form onSubmit={handleCommentSubmit} className="mb-4">
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ajouter un commentaire..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" disabled={commentLoading || !newComment.trim()}>
            {commentLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Envoi en cours...
              </>
            ) : 'Publier'}
          </Button>
        </Form>
      ) : (
        <Alert variant="info" className="mb-4">
          Connectez-vous pour ajouter un commentaire
        </Alert>
      )}
      
      {comments.length === 0 ? (
        <Alert variant="light">Aucun commentaire pour le moment</Alert>
      ) : (
        <>
          {comments.map((comment) => (
            <Card key={comment.id} className="mb-3">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <strong><Link to={`/users/${comment.author?.id}`}>{comment.author?.username || 'Utilisateur'}</Link></strong>
                  <small className="text-muted">{new Date(comment.created_at).toLocaleString()}</small>
                </div>
                <Card.Text>{comment.content}</Card.Text>
              </Card.Body>
            </Card>
          ))}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center my-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'primary' : 'outline-primary'}
                  onClick={() => loadMoreComments(page)}
                  className="mx-1"
                >
                  {page}
                </Button>
              ))}
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default PostDetail; 