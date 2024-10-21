package com.example.lakesidehotel.service;

import java.util.List;

import com.example.lakesidehotel.model.BookedRoom;
import com.example.lakesidehotel.repository.BookingResponse;

public interface IBookingService {

    List<BookingResponse> getAllBookings();

    BookingResponse getBookingByComfiramationCode(String confirmationCode);

    String saveBooking(Long roomId, BookedRoom bookingRequest);

    void cancelBooking(Long bookindId);
}
