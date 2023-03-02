import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import "./style.css";

function PickRolePage() {
  return (
    <div className="overlay">
      <Container
        fluid
        className="h-100 d-flex flex-column justify-content-center align-items-center"
      >
        <Row>
          <h1 className="text-center mb-4" style={{ color: "white" }}>
            I want to be a ...
          </h1>
        </Row>
        <div className="d-grid gap-2">
          <Button className="scout-button">Scout</Button>
          <Button className="requester-button">Requester</Button>
        </div>
      </Container>
    </div>
  );
}

export default PickRolePage;
