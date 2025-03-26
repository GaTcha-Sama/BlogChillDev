import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Login = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Row>
        <Col xs={12} md={6}>
          <h2 className="mb-4">Login</h2>
          <Form>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
            <div className="mt-3">
              <Link to="/register">Don't have an account? Register</Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
