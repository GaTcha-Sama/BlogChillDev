import React, { useEffect, useState } from 'react';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { authService } from '../services/authService';

interface User {
  id: number;
  username: string;
  email: string;
}

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        setError("ID utilisateur non trouvé");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userData = await authService.getUserById(id);
        setUser(userData);
        setLoading(false);
      } catch (err) {
        setError("Impossible de charger les informations de l'utilisateur.");
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  return (
    <Container className="py-4">
      <Card>
        <Card.Body>
          <Card.Title className="text-center mb-4">Profil utilisateur</Card.Title>
          
          {loading && (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          )}

          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}

          {user && (
            <div>
              <p><strong>Nom d'utilisateur :</strong> {user.username}</p>
              <p><strong>Email :</strong> {user.email}</p>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserDetail;