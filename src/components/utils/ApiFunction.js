
export const baseUrl = "http://localhost:9192/rooms"
export const baseUrlForBookings = "http://localhost:9192/bookings"

/* this function for add new room in the database */

export async function addRoom(photo, roomType, roomPrice) {

    const formData = new FormData();

    formData.append('file', photo);
    formData.append('roomType', roomType);
    formData.append('roomPrice', roomPrice);

    for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
    }

    const requestOptions = {
        method: 'POST',
        body: formData
    }

    const response = await fetch(`${baseUrl}/add/new-room`, requestOptions);
    if (response.ok) return true
    else return false


}

/* this function for get room types from the database */

export async function getRoomTypes() {
    try {
        const response = await fetch(`${baseUrl}/room-types`)
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Error fetching room types!")
    }
}

/* The function get all rooms from the database */
export async function getAllRooms() {
    try {
        const response = await fetch(`${baseUrl}/all-rooms`);
        return await response.json();
    } catch (error) {
        throw new Error("Error fetching rooms");
    }
}


/* The function delete the specafic room from the database */
export async function deleteRoom(roomId) {
    try {
        const response = await fetch(`${baseUrl}/delete-room/${roomId}`, { method: 'DELETE' });
        return response;
    } catch (error) {
        throw new Error(`Error deleting room ${error.message}`);
    }
}

/* The function for updating room in the database */
export async function updateRoom(roomId, roomData) {
    const formData = new FormData();
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    formData.append("photo", roomData.photo);

    const response = await fetch(`${baseUrl}/update-room/${roomId}`, { method: 'PUT', body: formData })
    return await response.json();
}


export async function getRoomById(roomId) {
    console.log(`${baseUrl}/room/${roomId}`)
    try {
        console.log("getRoomByID")
        const response = await fetch(`${baseUrl}/room/${roomId}`);
        return response.json();
    } catch (error) {
        throw new Error(`Error fetching room ${error.message}`);
    }
}

/* the function save the new booking in the database */
export async function bookRoom(roomId, booking) {
    try {
        const response = await fetch(`${baseUrlForBookings}/room/${roomId}/booking`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(booking),
        });

        if (!response.ok) {
            const errorMessage = await response.text(); 
            throw new Error(errorMessage); 
        }

        return await response.text();
    } catch (error) {
        throw new Error(`Error booking room : ${error.message}`);
    }
}


/* the function get the all booking from database  */
export async function getAllBookings() {

    try {
        const response = await fetch(`${baseUrlForBookings}/all-bookings`);
        return response.json();
    } catch (error) {
        throw new Error(`Error fetching booking ${error.message}`)
    }
}

/*the function get booking by confirmation code from db */
export async function getBookingByConfirmationCode(confirmationCode) {
    try {
        const response = await fetch(`/bookings/comfirmation/${confirmationCode}`);
        return await response.json();
    } catch (error) {
        if (error.response && error.response.json())
            throw new Error(error.response.json())
        else throw new Error(`Error fetching booking : ${error.message}`);
    }
}

/*the function cancel or delete booking from db */
export async function cancelBooking(bookingId) {
    try {
        const response = await fetch(`/bookings/booking/${bookingId}/delete`);
        return response.json();
    } catch (error) {
        throw new Error(`Error cancel booking : ${error.message}`);
    }
}