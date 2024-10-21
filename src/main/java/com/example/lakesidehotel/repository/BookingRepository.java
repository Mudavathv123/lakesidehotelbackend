package com.example.lakesidehotel.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.lakesidehotel.model.BookedRoom;

public interface BookingRepository extends JpaRepository<BookedRoom, Long>{

    List<BookedRoom> findByRoomId(Long roomId);

    BookedRoom findByBookingConfirmationCode(String confirmationCode);
} 