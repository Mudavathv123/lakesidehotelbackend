package com.example.lakesidehotel.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lakesidehotel.model.BookedRoom;
import com.example.lakesidehotel.repository.BookingResponse;
import com.example.lakesidehotel.service.IBookingService;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private IBookingService iBookingService;

    @GetMapping("/all-bookings")
    public List<BookingResponse> getAllBookings() {
        return iBookingService.getAllBookings();
    }

    @GetMapping("/confirmation/{confirmationcode}")
    public BookingResponse getBookingByComfiramationCode(@PathVariable("confirmationcode") String confirmationCode){
        return iBookingService.getBookingByComfiramationCode(confirmationCode);
    }

    @PostMapping("/room/{roomId}/booking")
    public String saveBooking(@PathVariable("roomId") Long roomId,
        @RequestBody BookedRoom bookingRequest) {
            return iBookingService.saveBooking(roomId,bookingRequest);
    }

    @DeleteMapping("/booking/{bookingId}/delete")
    public void cancelBooking(@PathVariable("bookingId") Long bookingId){
        iBookingService.cancelBooking(bookingId);
    }
    
}

