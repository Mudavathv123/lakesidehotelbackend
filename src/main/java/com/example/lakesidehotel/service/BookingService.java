package com.example.lakesidehotel.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.lakesidehotel.exception.InvalidBookingRequestException;
import com.example.lakesidehotel.model.BookedRoom;
import com.example.lakesidehotel.model.Room;
import com.example.lakesidehotel.repository.BookingRepository;
import com.example.lakesidehotel.repository.BookingResponse;
import com.example.lakesidehotel.repository.RoomRepository;
import com.example.lakesidehotel.repository.RoomResponse;

@Service
public class BookingService implements IBookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    public List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
        return bookingRepository.findByRoomId(roomId);
    }

    @Override
    public List<BookingResponse> getAllBookings() {
        List<BookedRoom> bookedRooms = bookingRepository.findAll();
        List<BookingResponse> bookingResponses = new ArrayList<>();

        for (BookedRoom booking : bookedRooms) {
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return bookingResponses;
    }

    @Override
    public BookingResponse getBookingByComfiramationCode(String confirmationCode) {

        try {
            BookedRoom booking = bookingRepository.findByBookingConfirmationCode(confirmationCode);
            BookingResponse bookingResponse = getBookingResponse(booking);
            return bookingResponse;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @Override
    public ResponseEntity<?> saveBooking(Long roomId, BookedRoom bookingRequest) {
        try {

            if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate()))
                return ResponseEntity.badRequest().body("Check-in date must come before check-out date");

            Room room = roomRepository.findById(roomId).get();
            List<BookedRoom> existingBookings = room.getBookings();
            boolean roomIsAvailabe = isRoomAvilabe(bookingRequest, existingBookings);
            if (roomIsAvailabe) {
                room.addBooking(bookingRequest);
                bookingRepository.save(bookingRequest);
            } else {
                return ResponseEntity.badRequest().body("Sorry, This is not avialbale for the selected dates");
            }

            return ResponseEntity.ok(
                    "Room booked successfully, Your booking code is : " + bookingRequest.getBookingConfirmationCode());

        } catch (InvalidBookingRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Override
    public void cancelBooking(Long bookindId) {
        bookingRepository.deleteById(bookindId);
    }

    private BookingResponse getBookingResponse(BookedRoom booking) {
        Room theRoom = roomRepository.findById(booking.getRoom().getId()).get();
        RoomResponse roomResponse = new RoomResponse(
                theRoom.getId(),
                theRoom.getRoomType(),
                theRoom.getRoomPrice());

        return new BookingResponse(
                booking.getBookingId(), booking.getCheckInDate(),
                booking.getCheckOutDate(), booking.getGuestFullName(), booking.getGuestEmail(),
                booking.getNumOfAdults(), booking.getNumOfChildrens(),
                booking.getTotalNumOfGuest(), booking.getBookingConfirmationCode(),
                roomResponse);

    }

    private boolean isRoomAvilabe(BookedRoom bookingRequest, List<BookedRoom> existingBookedRooms) {
        return existingBookedRooms.stream()
                .noneMatch(existingBooking -> bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                        || bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())
                        || bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())

                                && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate())
                        || bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate())
                        || bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                                && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate())

                        || bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate())
                                && bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate()));
    }

}
