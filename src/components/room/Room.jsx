import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap";
import { getAllRooms } from "../utils/ApiFunction";
import RoomCard from "./RoomCard";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";

const Room = () => {

    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [roomsPerPage, setRoomsPerPage] = useState(6);
    const [filteredData, setFilteredData] = useState([]);

    console.log(error)

    useEffect(() => {
        setIsLoading(true);
        getAllRooms().then(data => {
            console.log(data);
            setData(data);
            setFilteredData(data);
            setIsLoading(false);
        }).catch(error => {
            console.log(error.message)
            setError(error.message);
            setIsLoading(fasle);
        })
    }, [])

    if (isLoading)
        return <div>Loading rooms....</div>
    if (error)
        return <div className="text-danger">Error : {error}</div>

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const totalPages = Math.ceil(filteredData.length / roomsPerPage);

    const renderRooms = () => {
        const startIndex = (currentPage - 1) * roomsPerPage;
        const endIndex = startIndex + roomsPerPage;
        return filteredData.slice(startIndex, endIndex)
            .map(room => <RoomCard key={room.id} room={room} />)
    }

    return (
        <Container>
            <Row>
                <Col className="mb-3 mb-md-0">
                    <RoomFilter data={data} setFilteredData={setFilteredData} />
                </Col>
                <Col className="d-flex align-item-center justify-content-end">
                    <RoomPaginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>
            <Row>
                {renderRooms()}
            </Row>
            <Row>
            <Col className="d-flex align-item-center justify-content-center">
                    <RoomPaginator
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default Room