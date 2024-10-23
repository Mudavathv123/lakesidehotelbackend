import { Card, Col } from "react-bootstrap"
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
const BookingCard = ({ booking }) => {

    return (

        <Col lg={4} md = {6} className="mt-3" key={booking.bookingId}>
            <Card>
                <Card.Body>
                    <p className="text-success ">
                        <strong>Booking Confirm</strong>
                        <span className=" p-1 text-center" style={{background:"#a3d470", borderRadius:"50%"}} >
                            <FaCheck />
                        </span>
                        </p>
                    <p>Booking confiramtion code : <strong>{booking.bookingConfirmationCode}</strong></p>
                    <p>Guest FullName : <strong>{booking.guestFullName}</strong></p>
                    <p>Guest Email Address : <strong>{booking.guestEmail}</strong></p>
                    <p>Room No : <strong>{booking.roomResponse.id}</strong></p>
                    <Link className = "btn btn-hotel" to = {"view-room"}>View Room</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default BookingCard