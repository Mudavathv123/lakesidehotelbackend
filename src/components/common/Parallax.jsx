import { Container } from "react-bootstrap"
import './../../App.css'

const Parallax = () => {

    return (
        <div className="parallax mb-5">
            <Container className="text-center px-5 py-5 justify-content-center">
                <div>
                    <h1>
                        Welcome to <span className="hotel-color"> lakeside hotel</span>
                    </h1>
                    <h3>We offer the best services for all your needs</h3>
                </div>
            </Container>
        </div>
    )
}

export default Parallax