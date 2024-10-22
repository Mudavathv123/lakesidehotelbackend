import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { getAllRooms } from '../utils/ApiFunction'
const RoomCarousal = () => {

    const [rooms, setRooms] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState("");

    useEffect(() => {
        setIsLoading(true);
        getAllRooms().then(data => {
            setRooms(data);
            setIsLoading(false);
        }).catch(error => {
            setErrorMessage(error.message);
            setIsLoading(false);
        })
    }, [])

    if (isLoading)
        return <div className="mb-5">Loading rooms...</div>
    if (errorMessage)
        return <div className="text-danger mb-5 mt-5">Error : {errorMessage}</div>

    return (
        <section className="bg-light mb-5 mt-5 shadow">
            <Link to={"/browse-all-rooms"} className="hotel-color text-center">
                Browse all rooms
            </Link>

            <Container>
                <Carousel>
                    {
                        [...Array(Math.ceil(rooms.length / 4))].map((_, index) =>
                            <Carousel.Item key={index} >
                                <Row>
                                    {rooms.slice(index * 4, index * 4 + 4).map(room =>
                                        <Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
                                            <Card>
                                                <Link to={`/book-room/${room.id}`} >
                                                    <Card.Img
                                                        variant="top"
                                                        src={room.imageUrl}
                                                        alt="room carsousal"
                                                        className="w-100"
                                                        style={{ height: "200px" }}
                                                    />
                                                </Link>
                                                <Card.Body>
                                                    <Card.Title className="room-type">{room.roomType}</Card.Title>
                                                    <Card.Title className="room-price">$ {room.roomPrice} /night</Card.Title>

                                                    <div className="flex-shrink-0">
                                                        <Link className="btn btn-sm btn-hotel" to={`/book-room/${room.id}`}>
                                                            View / Book Now
                                                        </Link>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )}
                                </Row>
                            </Carousel.Item>
                        )
                    }
                </Carousel>
            </Container>
        </section>
    )
}

export default RoomCarousal