import { useEffect, useState } from "react"
import { deleteRoom, getAllRooms } from "../utils/ApiFunction";
import { Col, Row } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { FaEye, FaEdit, FaPlus } from "react-icons/fa";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import { Link } from "react-router-dom";

const ExistingRooms = () => {

    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage, setRoomsPerPage] = useState(8);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [selectedRoomType, setSelectedRoomType] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchRooms()
    }, []);


    const fetchRooms = async () => {
        setIsLoading(true);
        try {
            const data = await getAllRooms();
            setRooms(data);
            setIsLoading(false);
        } catch (error) {
            throw new Error(error.message);
        }
    }


    useEffect(() => {
        if (selectedRoomType === "") {
            setFilteredRooms(rooms);
        } else {
            const filtered = rooms.filter(room => room.roomType === selectedRoomType);
            setFilteredRooms(filtered)
        }
        setCurrentPage(1);
    }, [rooms, selectedRoomType]);

    const handleDeleteRoom = async (roomId) => {
        try {

            const response = await deleteRoom(roomId);
            console.log(response);
            if (response.ok) {
                setSuccessMessage(`Room No ${roomId} was deleted successfully!`);
                fetchRooms();
            } else {
                console.log(`Error room deleting ${error.message}`);
            }

        } catch (error) {
            setErrorMessage(`Error deleting room : ${error.message}`)
        }


        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        })
    }

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const calaculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms;
        return Math.ceil(totalRooms / roomsPerPage);
    }

    const indexOfLastRoom = currentPage * roomsPerPage;
    const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
    const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);



    return (
        isLoading ? (
            <p>Existing rooms Loading </p>
        ) : (
            <>
                {successMessage && (
                    <div className="alert alert-success fade show">{successMessage}</div>
                )}

                {errorMessage && (
                    <div className="alert alert-danger fade show">{errorMessage}</div>
                )}


                <section className="mb-5 mt-5 container">
                    <div className="d-flex justify-content-between mb-3 mt-5">
                        <h2>Existing Rooms</h2>
                    </div>
                    <Row >
                        <Col md={6} className="mb-3 mb-md-0">
                            <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
                        </Col>
                        <Col md = {6}  className="d-flex justify-content-end">
                            <Link to={`/add-room`}>
                                <FaPlus /> add Room
                            </Link>
                        </Col>
                    </Row>

                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr className="text-center">
                                <th>ID</th>
                                <th>Room Type</th>
                                <th>Room Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentRooms.map(room => (
                                    <tr key={room.id} className="text-center">
                                        <td>{room.id}</td>
                                        <td>{room.roomType}</td>
                                        <td>{room.roomPrice}</td>
                                        <td className="gap-2">
                                            <Link to={`/edit-room/${room.id}`}>
                                                <span className="btn btn-info btn-sm">
                                                    <FaEye />
                                                </span>
                                                <span className="btn btn-warning btn-sm">
                                                    <FaEdit />
                                                </span>
                                            </Link>
                                            <button
                                                type="button"
                                                className="btn btn-danger "
                                                onClick={() => handleDeleteRoom(room.id)}>
                                                <MdDelete size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <RoomPaginator
                        currentPage={currentPage}
                        totalPages={calaculateTotalPages(filteredRooms, roomsPerPage, rooms)}
                        onPageChange={handlePaginationClick}
                    />
                </section>
            </>
        )

    )
}

export default ExistingRooms