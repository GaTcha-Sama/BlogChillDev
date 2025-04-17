import { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();
  
  const validateForm = () => {
    setError('');
    
    if (!username || !email || !password || !confirmPassword) {
      setError('Veuillez remplir tous les champs');
      return false;
    }
    
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return false;
    }
    
    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Adresse e-mail invalide');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      await authService.register(username, email, password);
      setSuccess(true);
      
      // Rediriger vers la page de connexion après un court délai
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.username || 
        err.response?.data?.email || 
        err.response?.data?.password ||
        err.response?.data?.non_field_errors || 
        err.response?.data?.detail || 
        'Une erreur est survenue lors de l\'inscription'
      );
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Row className="w-100">
        <Col xs={12} md={6} className="mx-auto">
          <h2 className="mb-4">Inscription</h2>
          
          {success ? (
            <Alert variant="success">
              Inscription réussie ! Vous allez être redirigé vers la page de connexion...
            </Alert>
          ) : (
            <>
              {error && (
                <Alert variant="danger">{error}</Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Nom d'utilisateur</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Choisissez un nom d'utilisateur" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Adresse e-mail</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="Entrez votre adresse e-mail" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Choisissez un mot de passe sécurisé"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Form.Text className="text-muted">
                    Votre mot de passe doit contenir au moins 8 caractères.
                  </Form.Text>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Confirmer le mot de passe</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Confirmez votre mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Inscription en cours...
                    </>
                  ) : 'S\'inscrire'}
                </Button>
                <div className="mt-3">
                  <Link to="/login">Vous avez déjà un compte ? Connectez-vous</Link>
                </div>
              </Form>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Register; 