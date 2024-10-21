package com.example.lakesidehotel.repository;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class BookingResponse {

     private Long bookingId;

    private LocalDate checkInDate;

    private LocalDate checkOutDate;

    private String guestFullName;

    private String guestEmail;

    private int numOfAdults;

    private int numOfChildrens;

    private int totalNumOfGuest;

    private String bookingConfirmationCode;

    private RoomResponse roomResponse;

    public BookingResponse(Long bookingId, LocalDate checkInDate, LocalDate checkOutDate,
            String bookingConfirmationCode) {
        this.bookingId = bookingId;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.bookingConfirmationCode = bookingConfirmationCode;
    }

    

}
