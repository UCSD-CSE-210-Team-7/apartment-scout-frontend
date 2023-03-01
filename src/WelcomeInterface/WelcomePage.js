import {useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';
import "./style.css"
import { getAuth, signInWithPopup } from "firebase/auth";
import { GoogleSignOn } from '../utils//firebase'

import Auth from '../utils/auth';

function WelcomePage() {

    const authContext = useContext(Auth)
    const navigate = useNavigate()

    const handleLogin = async () => {
        const auth = await getAuth()
        const result = await signInWithPopup(auth, GoogleSignOn)

        await authContext.login()
        navigate('/home')
    }

    return (
        <div className='center'>
            <Container fluid className="h-100 d-flex flex-column justify-content-center align-items-center">
                <Row>
                    <h1 className="text-center mb-4">Welcome to AptScout</h1>
                </Row>
                <Row className="d-grid gap-2">
                    <Col className="text-center">
                        <Button variant="success" onClick={handleLogin}>Log In</Button>
                    </Col>
                </Row>
            </Container>
        </div>

    );
}

export default WelcomePage;
