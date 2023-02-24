import React, { useState } from "react";
import { Container, Row, Col, Button, Alert, Form, Spinner } from "react-bootstrap"
// import { auth } from "../firebase";

function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = () => {
        // todo
    };

    return (
        <Container>
            <Row className="mt-4 justify-content-md-center">
                <Col md={5}>
                    <h1>Sign Up</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder=""
                                name="firstName"
                            />
                            <Form.Control.Feedback type="invalid">Invalid first name</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder=""
                                name="lastName"
                            />
                            <Form.Control.Feedback type="invalid">Invalid last name</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder=""
                                name="email"
                            />
                            <Form.Control.Feedback type="invalid">Invalid email address</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder=""
                                name="password"
                                minLength={6}
                                isInvalid={false} // assume always valid
                            />
                            <Form.Control.Feedback type="invalid">Invalid password</Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Password should have at least 6 characters
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
                            <Form.Label>Re-enter password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder=""
                                name="confirmPassword"
                                minLength={6}
                                isInvalid={true}
                            />
                            <Form.Control.Feedback type="invalid">Your passwords don't match </Form.Control.Feedback>
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicZipCode">
                            <Form.Label>Which zip codes would you like to provide services for?</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                name="zipCode"
                            />
                            <Form.Control.Feedback type="invalid">Invalid zipCode</Form.Control.Feedback>
                        </Form.Group>

                        <Row className="pb-2">
                            <Col>
                                Have an account already? {'\u00A0'}
                                Login
                            </Col>
                        </Row>
                        <Button type="submit">
                            {true ? (<Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />) : ("")}
                            Submit
                        </Button>
                        <Alert show={true}
                            variant="danger">
                            User with the email already exists!
                        </Alert>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default SignUpPage;