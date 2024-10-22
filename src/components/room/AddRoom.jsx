import { useState } from "react"
import { addRoom } from './../utils/ApiFunction'
import RoomTypeSelector from "../common/RoomTypeSelector";
import { Link } from "react-router-dom";

const AddRoom = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [count, setCount] = useState(5);
    const [newRoom, setNewRoom] = useState({
        photo: null, roomType: "", roomPrice: ""
    });

    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const handleRoomInputChange = (evt) => {
        const name = evt.target.name;
        let value = evt.target.value;

        if (name == "roomPrice") {
            if (!isNaN(value)) {
                value = parseInt(value);
            } else {
                value = "";
            }

            setNewRoom({ ...newRoom, roomPrice: value })
        }
    }


    const handleRoomTypeInputChange = (evt) => {
        setNewRoom({ ...newRoom, roomType: evt.target.value })
    }

    const handleImageChange = (evt) => {
        const selectedImg = evt.target.files[0];
        setNewRoom({ ...newRoom, photo: selectedImg })
        setImagePreview(URL.createObjectURL(selectedImg))
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setIsLoading(true);
        const timerId = setInterval(() => {
            setCount(prevCount => prevCount - 1);
        }, 1000);
        try {
            const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice);
            if (success !== undefined) {
                setSuccessMessage("A new room is added successfully !");
                setNewRoom({ photo: null, roomPrice: "", roomType: "" });
                setImagePreview("");
                setErrorMessage("");
                setIsLoading(false);
                clearInterval(timerId);
            } else {
                setErrorMessage("Error adding room");
                setIsLoading(false);
            }
        } catch (error) {
            setErrorMessage(error.message);
            clearInterval(timerId);
        }

        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    }



    return (
        <div>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="mt-5 mb-2">Add a new Room</h2>

                        {isLoading && (
                            <div className="text-info ml-5">Please wait for {count} seconds to add data..</div>
                        )}

                        {successMessage && (
                            <div className="alert alert-success fade show">{successMessage}</div>
                        )}

                        {errorMessage && (
                            <div className="alert alert-danger fade show">{errorMessage}</div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="roomType" className="form-label">Room Type</label>
                                <div>
                                    <RoomTypeSelector handleRoomInputChange={handleRoomTypeInputChange} newRoom={newRoom} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="roomPrice" className="form-label">Room Price</label>
                                <input type="number"
                                    required
                                    id="roomPrice"
                                    className="form-control"
                                    name="roomPrice"
                                    value={newRoom.roomPrice}
                                    onChange={handleRoomInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="photo" className="form-label">Room Price</label>
                                <input type="file"
                                    id="photo"
                                    className="form-control"
                                    name="photo"
                                    onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <img src={imagePreview} alt="preview room"
                                        style={{ maxWidth: "400px", maxHeight: "400px" }} className="mt-3" />
                                )}
                            </div>
                            <div className="d-grid d-md-flex gap-2">
                                <Link to={`/existing-rooms`} className="btn btn-outline-info ml-5">
                                    Back
                                </Link>
                                <button className="btn btn-outline-primary ml-5">Save Room</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AddRoom