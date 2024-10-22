import { useEffect, useState } from "react"
import { getRoomTypes } from "../utils/ApiFunction";
import './../../App.css'

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
    const [roomTypes, setRoomTypes] = useState([""]);
    const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false)
    const [newRoomType, setNewRoomType] = useState("")
    
    useEffect(() => {
        getRoomTypes().then((data) => {
           
            setRoomTypes([...data," "])
            
        })
    }, [])

    const handleNewRoomTypeInputChnage = (evt) => {
        setNewRoomType(evt.target.value)
    }

    const handleAddNewRoomType = () => {
        if (newRoomType !== "") {
            setRoomTypes([...roomTypes, newRoomType]);
            setNewRoomType("")
            setShowNewRoomTypeInput(false)
        }
    }

    return (
        <>
            {
                roomTypes.length > 0 && (
                    <div className="group-input">
                        <select
                            className="form-select"
                            id="roomType"
                            name="roomType"
                            value={newRoom.roomType}
                            onChange={(evt) => {
                                if (evt.target.value === "Add New")
                                    setShowNewRoomTypeInput(true);
                                else handleRoomInputChange(evt);
                            }}
                        >
                            <option value={""}>select a room type</option>
                            <option value={"Add New"}>Add New</option>
                            {
                                roomTypes.map((type, index) => (
                                    <option value={type} key={index}>{type}</option>
                                ))
                            }
                        </select>
                        {
                            showNewRoomTypeInput && (
                                <div className="mt-3 d-grid d-flex">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Enter a new room type"
                                        onChange={handleNewRoomTypeInputChnage}
                                        />
                                    <button type="button" className="btn btn-hotel ml-2" onClick={handleAddNewRoomType}>Add</button>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </>
    )

}

export default RoomTypeSelector