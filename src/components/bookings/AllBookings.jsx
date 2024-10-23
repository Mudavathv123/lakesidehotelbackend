import { useEffect, useState } from "react"
import { getAllBookings } from "../utils/ApiFunction";
import { Col, Container, Row } from "react-bootstrap";
import BookingCard from "./BookingCard";
import { Link } from "react-router-dom";

const AllBookings = () => {

    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setIsLoading(true)
        getAllBookings().then(data => {
            setBookings(data)
            setIsLoading(false)
            setErrorMessage("")
        }).catch(error => {
            setErrorMessage(`Error feching bookigns ${error}`);
            isLoading(false)
        })
    }, [])

    console.log(bookings);

    return (
        <Container>
            {
                bookings.length > 0 ?

                    <Row>
                        {
                            bookings.map(eachBooking => <BookingCard booking={eachBooking} key={eachBooking.bookingId} />)
                        }
                    </Row> : (
                        <div className="container d-flex justify-content-center align-items-center flex-wrap" style={{height:"50vh"}}>
                            <h1>Opps! There is no booking</h1>
                            <Link to = {"/"} className="btn btn-hotel">Home</Link>
                        </div>
                    )
            }
        </Container>
    )
}

export default AllBookings