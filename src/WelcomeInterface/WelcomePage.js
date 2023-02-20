import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import "./style.css"
function WelcomePage() {
  return (
    <div className='center'>
      <Container fluid className="h-100 d-flex flex-column justify-content-center align-items-center">
        <Row>
          <h1 className="text-center mb-4">Welcome to AptScout</h1>
        </Row>
        <Row className="d-grid gap-2">
          <Col className="text-center">
            <Button variant="success" >Log In</Button>
          </Col>
          <Col className="text-center">
            <Button variant="primary" >Sign Up</Button>
          </Col>
        </Row>
      </Container>
    </div>

  );
}

export default WelcomePage;