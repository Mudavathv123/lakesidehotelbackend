package com.example.lakesidehotel.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import javax.sql.rowset.serial.SerialBlob;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.example.lakesidehotel.exception.PhotoRetrievalException;
import com.example.lakesidehotel.model.BookedRoom;
import com.example.lakesidehotel.model.Room;
import com.example.lakesidehotel.repository.RoomRepository;
import com.example.lakesidehotel.repository.RoomResponse;

@Service
public class RoomService implements IRoomService {

    @Autowired
    public RoomRepository roomRepository;

    @Autowired
    private BookingService bookingService;

    @Override
    public RoomResponse addNewRoom(MultipartFile file, String roomType, BigDecimal roomPrice)
            throws SQLException, IOException {
        Room room = new Room();
        room.setRoomPrice(roomPrice);
        room.setRoomType(roomType);
        if (!file.isEmpty()) {
            byte[] photoBytes = file.getBytes();
            Blob photoBlob = new SerialBlob(photoBytes);
            room.setPhoto(photoBlob);
        }
        Room savedRoom = roomRepository.save(room);

        return new RoomResponse(savedRoom.getId(), savedRoom.getRoomType(), savedRoom.getRoomPrice());
    }

    @Override
    public List<String> getRoomTypes() {
        try {
            return roomRepository.findDistinctRoomType();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    private byte[] getRoomPhotoByRoomId(Long roomId) throws SQLException {
        Optional<Room> theRoom = roomRepository.findById(roomId);
        if (theRoom.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Soory, room not found!");
        Blob blobPhoto = theRoom.get().getPhoto();
        if (blobPhoto != null)
            return blobPhoto.getBytes(1, (int) blobPhoto.length());
        return null;
    }

    @Override
    public List<RoomResponse> getAllRooms() throws SQLException {
        List<Room> rooms = roomRepository.findAll();
        List<RoomResponse> roomResponses = new ArrayList<>();

        for (Room room : rooms) {
            byte[] photoBytes = getRoomPhotoByRoomId(room.getId());
            if (photoBytes != null && photoBytes.length > 0) {
                String base64Photo = Base64.getEncoder().encodeToString(photoBytes);
                RoomResponse roomResponse = getRoomResponse(room);
                roomResponse.setPhoto(base64Photo);
                roomResponses.add(roomResponse);
            }
        }
        return roomResponses;
    }

    private RoomResponse getRoomResponse(Room room) {
        List<BookedRoom> bookings = getAllBookingsByRoomId(room.getId());
        // List<BookingResponse> bookingInfo = bookings
        // .stream()
        // .map(booking -> new BookingResponse(
        // booking.getBookingId(),
        // booking.getCheckInDate(),
        // booking.getCheckOutDate(),
        // booking.getBookingConfirmationCode())
        // ).toList();
        byte[] photoBytes = null;
        Blob blobPhoto = room.getPhoto();
        if (blobPhoto != null) {
            try {
                photoBytes = blobPhoto.getBytes(1, (int) blobPhoto.length() / 2);
            } catch (SQLException e) {
                throw new PhotoRetrievalException("Error retrieving photo");
            }
        }

        return new RoomResponse(
                room.getId(), room.getRoomType(), room.getRoomPrice(), room.isBooked(), photoBytes);
    }

    private List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
        return bookingService.getAllBookingsByRoomId(roomId);
    }

    @Override
    public void deleteRoom(Long roomId) {

        try {
            roomRepository.deleteById(roomId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "room was Not found! in database");
        }

        throw new ResponseStatusException(HttpStatus.NO_CONTENT, "room was deleted successfully from database");

    }

    @Override
    public RoomResponse updateRoom(Long roomId, String roomType, BigDecimal roomPrice, MultipartFile photo) {
        try {

            Room theRoom = roomRepository.findById(roomId).get();

            if (roomType != null)
                theRoom.setRoomType(roomType);
            if (roomPrice != null)
                theRoom.setRoomPrice(roomPrice);
            if (photo != null) {
                try {
                    byte[] photoBytes = photo != null && !photo.isEmpty() ? photo.getBytes()
                            : getRoomPhotoByRoomId(roomId);
                    Blob blobPhoto = photoBytes != null && photoBytes.length > 0 ? new SerialBlob(photoBytes) : null;
                    theRoom.setPhoto(blobPhoto);

                } catch (SQLException e) {
                    throw new PhotoRetrievalException("Error retrieving photo");
                }
            }

            Room savedRoom = roomRepository.save(theRoom);
            return getRoomResponse(savedRoom);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "oops! room was not found! in the database");
        }
    }

    @Override
    public RoomResponse getRoomById(Long roomId) {
        try {
            Room room = roomRepository.findById(roomId).get();
            System.out.println(room.getId());
            return getRoomResponse(room);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Sorry! room not found.");
        }
    }
}
