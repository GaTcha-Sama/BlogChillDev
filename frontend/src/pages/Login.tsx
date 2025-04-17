import { useState } from 'react'
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setError('');
    
    try {
      await authService.login(username, password);
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.detail || 
        'Une erreur est survenue lors de la connexion'
      );
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Row className="w-100">
        <Col xs={12} md={6} className="mx-auto">
          <h2 className="mb-4">Connexion</h2>
          
          {error && (
            <Alert variant="danger">{error}</Alert>
          )}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Nom d'utilisateur</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Entrez votre nom d'utilisateur" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Connexion en cours...
                </>
              ) : 'Connexion'}
            </Button>
            <div className="mt-3">
              <Link to="/register">Vous n'avez pas de compte ? Inscrivez-vous</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
