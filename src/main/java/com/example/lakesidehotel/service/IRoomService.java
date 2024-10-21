package com.example.lakesidehotel.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.lakesidehotel.repository.RoomResponse;

public interface IRoomService {

    RoomResponse addNewRoom(MultipartFile file, String roomType, BigDecimal roomPrice) throws SQLException, IOException;

    List<String> getRoomTypes();

    List<RoomResponse> getAllRooms() throws SQLException;
    
    RoomResponse getRoomById(Long roomId);

    RoomResponse updateRoom(Long roomId,String roomType, BigDecimal roomPrice,MultipartFile file);

    void deleteRoom(Long roomId);
}
