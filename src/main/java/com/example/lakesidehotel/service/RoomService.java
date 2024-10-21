package com.example.lakesidehotel.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.lakesidehotel.model.BookedRoom;
import com.example.lakesidehotel.model.Room;
import com.example.lakesidehotel.repository.RoomRepository;
import com.example.lakesidehotel.repository.RoomResponse;

@Service
public class RoomService implements IRoomService {

    @Autowired
    public RoomRepository roomRepository;

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private BookingService bookingService;

    @Override
    public RoomResponse addNewRoom(MultipartFile file, String roomType, BigDecimal roomPrice) {
        Room room = new Room();
        room.setRoomPrice(roomPrice);
        room.setRoomType(roomType);
        Map<String, String> imageDetails = uploadImage(file);
        room.setImagePublicId(imageDetails.get("public_id"));
        if (!file.isEmpty()) {
            room.setImageUrl(imageDetails.get("url"));
        }
        Room savedRoom = roomRepository.save(room);

        return new RoomResponse(savedRoom.getId(), savedRoom.getRoomType(), savedRoom.getRoomPrice());
    }

    private Map<String, String> uploadImage(MultipartFile file) {
        try {
            return cloudinary.uploader().upload(file.getBytes(), Map.of());
        } catch (Exception e) {
            throw new RuntimeException("Opps! image upload file" + e.getMessage());
        }
    }

    @Override
    public List<String> getRoomTypes() {
        try {
            return roomRepository.findDistinctRoomType();
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
    }

    /*
     * private byte[] getRoomPhotoByRoomId(Long roomId) throws SQLException {
     * Optional<Room> theRoom = roomRepository.findById(roomId);
     * if (theRoom.isEmpty())
     * throw new ResponseStatusException(HttpStatus.NOT_FOUND,
     * "Soory, room not found!");
     * Blob blobPhoto = theRoom.get().getPhoto();
     * if (blobPhoto != null)
     * return blobPhoto.getBytes(1, (int) blobPhoto.length());
     * return null;
     * }
     */

    @Override
    public List<RoomResponse> getAllRooms() {
        List<Room> rooms = roomRepository.findAll();
        List<RoomResponse> roomResponses = new ArrayList<>();
        for (Room room : rooms) {
            RoomResponse roomResponse = getRoomResponse(room);
            roomResponses.add(roomResponse);
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
        return new RoomResponse(room.getId(), room.getRoomType(), room.getRoomPrice(), room.isBooked(),
                room.getImageUrl());
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
    public RoomResponse updateRoom(Long roomId, String roomType, BigDecimal roomPrice, MultipartFile file) {
        try {

            Room theRoom = roomRepository.findById(roomId).get();

            if (roomType != null)
                theRoom.setRoomType(roomType);
            if (roomPrice != null)
                theRoom.setRoomPrice(roomPrice);
            if (file != null) {

                String imagePublicId = roomRepository.findImagePublicId(roomId);
                deleteImage(imagePublicId);
                Map<String, String> imageDetails = uploadImage(file);
                theRoom.setImageUrl(imageDetails.get("url"));
                theRoom.setImagePublicId(imageDetails.get("public_id"));
            }

            Room savedRoom = roomRepository.save(theRoom);
            return getRoomResponse(savedRoom);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "oops! room was not found! in the database");
        }
    }

    private void deleteImage(String imagePulicId) {
        try {
            cloudinary.uploader().destroy(imagePulicId, ObjectUtils.emptyMap());
        }catch(Exception e) {
            throw new RuntimeException("Opps! image not deleted.." +e.getMessage());
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
