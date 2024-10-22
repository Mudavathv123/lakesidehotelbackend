import { useEffect, useState } from "react"
import { bookRoom, getRoomById } from "../utils/ApiFunction"
import { useNavigate, useParams } from "react-router-dom"
import moment from "moment"

import BookingSummary from "./BookingSummary"
import { Form } from "react-bootstrap"

const BookingForm = () => {

    const [isValidated, setIsValidated] = useState(false)
    const [isSubmited, setIsSubmited] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const [roomPrice, setRoomPrice] = useState();
    const [booking, setBooking] = useState({
        guestFullName: "",
        guestEmail: "",
        checkInDate: "",
        checkOutDate: "",
        numOfAdults: "",
        numOfChildrens: "0"
    });

    const [roomInfo, setRoomInfo] = useState({
        roomType: "",
        roomPrice: "",
        imageUrl: ""
    });

    const { roomid } = useParams();
    const roomId = roomid
    const navigate = useNavigate();

    const handleInputChange = (evt) => {
        const { name, value } = evt.target
        setBooking({ ...booking, [name]: value });
    }

    const getRoomPriceById = async (roomId) => {
        try {
            const response = await getRoomById(roomId);
            setRoomPrice(response.roomPrice);
        } catch (error) {
            throw new Error(error);
        }
    }

    useEffect(() => {
        getRoomPriceById(roomId);
    }, [roomId])

    const calculatePayment = () => {
        const checkInDate = moment(booking.checkInDate);
        const checkOutDate = moment(booking.checkOutDate);
        const diffIndays = checkOutDate.diff(checkInDate, "days");
        console.log("diffInDays", diffIndays)
        const price = roomPrice ? roomPrice : 0;
        return diffIndays * price;
    }

    const isGuestValid = () => {
        const adultCount = parseInt(booking.numOfAdults);
        const chindrensCount = parseInt(booking.numOfChildrens);
        const totalGuest = adultCount + chindrensCount;
        return totalGuest >= 1 && adultCount >= 1;
    }

    const isCheckOutDateValid = () => {
        if (!moment(booking.checkOutDate).isSameOrAfter(booking.checkInDate)) {
            setErrorMessage("Check-out date must be come after check-in date");
            return true;
        } else {
            setErrorMessage("");
            return false;
        }
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const form = evt.currentTarget;
        console.log("guest valid", isGuestValid())
        console.log("check out date valid", isCheckOutDateValid())
        console.log(form.checkValidity())
        if (form.checkValidity() === false || !isGuestValid() || isCheckOutDateValid())
            evt.stopPropagation();
        else
            setIsSubmited(true)
        setIsValidated(true)
    }

    const handleBooking = async () => {
        try {
            const confirmationCode = await bookRoom(roomId, booking);
            setIsSubmited(true);
            navigate("/booking-success", { state: { message: confirmationCode } });
        } catch (error) {
            const errorMessage = error.message || "An error occurred while booking the room.";
            setErrorMessage(errorMessage);
            navigate("/booking-success", { state: { error: errorMessage } });
        }
    }

    return (
        <>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card card-body mt-5">
                            <h4 className="card card-title">Reserve Room</h4>
                            <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label htmlFor="guestFullName" >Full Name : </Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        id="guestFullName"
                                        name="guestFullName"
                                        value={booking.guestFullName}
                                        placeholder="Enter your full name"
                                        onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your fullname
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="guestEmail" >Full Name : </Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        id="guestEmail"
                                        name="guestEmail"
                                        value={booking.guestEmail}
                                        placeholder="Enter your email"
                                        onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your email address
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <fieldset style={{ border: "2px" }}>
                                    <legend>Lodging period</legend>
                                    <div className="row">
                                        <div className="col-6">
                                            <Form.Label htmlFor="checkInDate" >Check-in date : </Form.Label>
                                            <Form.Control
                                                required
                                                type="date"
                                                id="checkInDate"
                                                name="checkInDate"
                                                value={booking.checkInDate}
                                                placeholder="check-in-date"
                                                onChange={handleInputChange}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                Please select check-in date
                                            </Form.Control.Feedback>
                                        </div>

                                        <div className="col-6">
                                            <Form.Label htmlFor="checkOutDate" >Check-out date : </Form.Label>
                                            <Form.Control
                                                required
                                                type="date"
                                                id="checkOutDate"
                                                name="checkOutDate"
                                                value={booking.checkOutDate}
                                                placeholder="check-out-date"
                                                onChange={handleInputChange}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                Please select check-out date
                                            </Form.Control.Feedback>
                                        </div>
                                        {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
                                    </div>
                                </fieldset>

                                <fieldset>
                                    <legend>Number Of Guests : </legend>
                                    <div className="row">
                                        <div className="col-6">
                                            <Form.Label htmlFor="numOfAdults" >Adult : </Form.Label>
                                            <Form.Control
                                                required
                                                type="number"
                                                id="numOfAdults"
                                                name="numOfAdults"
                                                value={booking.numOfAdults}
                                                placeholder="0"
                                                min={1}
                                                onChange={handleInputChange}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                Please select at least 1 adult
                                            </Form.Control.Feedback>
                                        </div>

                                        <div className="col-6">
                                            <Form.Label htmlFor="numOfChildrens" >Children : </Form.Label>
                                            <Form.Control
                                                type="number"
                                                id="numOfChildrens"
                                                name="numOfChildrens"
                                                value={booking.numOfChildrens}
                                                placeholder="0"
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </fieldset>
                                <div className="form-group mt-2 mb-2">
                                    <button type="submit" className="btn btn-hotel">Continue</button>
                                </div>
                            </Form>
                        </div>
                    </div>
                    {
                        isSubmited && (
                            <BookingSummary
                                booking={booking}
                                payment={calculatePayment()}
                                isFormValid={isValidated}
                                onConfirm={handleBooking}
                            />
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default BookingForm