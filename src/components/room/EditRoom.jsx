import { useEffect, useState } from "react"
import RoomTypeSelector from "../common/RoomTypeSelector";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getRoomById, updateRoom } from "../utils/ApiFunction";
import { Link, useParams } from "react-router-dom";

const EditRoom = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [count, setCount] = useState(10);
    const [room, setRoom] = useState({
        photo: null, roomType: "", roomPrice: ""
    });

    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const {roomid} = useParams();
    const roomId = roomid

    const handleRoomInputChange = (evt) => {
        const name = evt.target.name;
        let value = evt.target.value;

        if (name == "roomPrice") {
            if (!isNaN(value)) {
                value = parseInt(value);
            } else {
                value = "";
            }

            setRoom({ ...room, roomPrice: value })
        }
    }


    const handleRoomTypeInputChange = (evt) => {
        setRoom({ ...room, roomType: evt.target.value })
    }

    const handleImageChange = (evt) => {
        const selectedImg = evt.target.files[0];
        setRoom({ ...room, photo: selectedImg })
        setImagePreview(URL.createObjectURL(selectedImg))
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setIsLoading(true)
        const timerId = setInterval(() => {
            setCount(prevCount => prevCount - 1);
        }, 1000);
        try {
            const success = await updateRoom(roomId, room);
            if (success !== undefined) {
                setSuccessMessage("Room is updated successfully !");
                const updatedRoomData = await getRoomById(roomId);
                setRoom(updatedRoomData);
                setImagePreview(updatedRoomData.photo);
                setErrorMessage("");
                setIsLoading(false)
                clearInterval(timerId)
            } else {
                setErrorMessage("Error updating room");
                setIsLoading(false)
                clearInterval(timerId)
            }
        } catch (error) {
            setErrorMessage(error.message);
        }

        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    }


    useEffect(() => {
        const fatchData = async () => {
            
            try {
                const result = await getRoomById(roomId);
                setRoom(result);
                setImagePreview(result.photo);
            } catch (error) {
                console.log(error.message);
            }
        }
        fatchData();
    }, [roomId])

    return (
        <div>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="mt-5 mb-2">Update a existing room</h2>
                        
                        {isLoading && (
                            <div className="text-info ml-5">Please wait {count} seconds for update data...</div>
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
                                    <RoomTypeSelector handleRoomInputChange={handleRoomTypeInputChange} newRoom={room} />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="roomPrice" className="form-label">Room Price</label>
                                <input type="number"
                                    required
                                    id="roomPrice"
                                    className="form-control"
                                    name="roomPrice"
                                    value={room.roomPrice}
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
                            <div className="d-grid gap-2 d-md-flex mt-2">
                                <Link to={`/existing-rooms`} className="btn btn-outline-info">
                                    Back
                                </Link>
                                <button className="btn btn-outline-primary ml-5">Edit Room</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default EditRoom