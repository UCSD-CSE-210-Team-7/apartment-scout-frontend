import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import "./style.css"
function PickRolePage() {
    return (
        <div className='center'>
            <Container fluid className="h-100 d-flex flex-column justify-content-center align-items-center">
                <Row>
                    <h1 className="text-center mb-4">I want to be a ...</h1>
                </Row>
                <div className="d-grid gap-2">
                    <Button variant="success" size="lg">
                        Scout
                    </Button>
                    <Button variant="success" size="lg">
                        Requester
                    </Button>
                </div>
            </Container>
        </div>
    );
}

export default PickRolePage;