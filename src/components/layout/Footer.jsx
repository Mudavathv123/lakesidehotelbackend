import { Col, Container, Row } from "react-bootstrap"
import './../../App.css'

const Footer = () => {
    let today = new Date();
    return (
        <footer className="bg-dark text-light footer py-3 mt-lg-5">
            <Container>
                <Row>
                    <Col className="text-center" xs={12} md={12}>
                        <p className="mb-0">&copy; {today.getFullYear()} lakSide Hotel</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer