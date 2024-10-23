package com.example.lakesidehotel.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.lakesidehotel.repository.RoomResponse;
import com.example.lakesidehotel.service.IRoomService;

@RestController
@RequestMapping("/rooms")
// @CrossOrigin(origins = "http://localhost:5173")

@CrossOrigin(origins = "https://lakesidehotelbyvinodmudavath.netlify.app")
public class RoomController {

    @Autowired
    public IRoomService iRoomService;

    @GetMapping("/room-types")
    public List<String> getRoomTypes() {
        System.out.println(iRoomService.getRoomTypes());
        return iRoomService.getRoomTypes();
    }

    @GetMapping("/all-rooms")
    public List<RoomResponse> getAllRooms() throws SQLException {
        System.out.println(iRoomService.getAllRooms());
        return iRoomService.getAllRooms();
    }

    @GetMapping("/room/{roomId}")
    public RoomResponse getRoomById(@PathVariable("roomId") Long roomId) {
        return iRoomService.getRoomById(roomId);
    }

    @PostMapping("/add/new-room")
    public RoomResponse addNewRoom(@RequestParam("file") MultipartFile photo,
            @RequestParam("roomPrice") BigDecimal roomPrice, @RequestParam("roomType") String roomType)
            throws SQLException, IOException {

        return iRoomService.addNewRoom(photo, roomType, roomPrice);
    }

    @PutMapping("/update-room/{roomId}")
    public RoomResponse updateRoom(
            @PathVariable("roomId") Long roomId,
            @RequestParam("roomType") String roomType,
            @RequestParam("roomPrice") BigDecimal roomPrice,
            @RequestParam("photo") MultipartFile file) {
            System.out.println(roomId +" " +roomType +" " +roomPrice +" " +file);
        return iRoomService.updateRoom(roomId, roomType, roomPrice, file);
    }

    @DeleteMapping("/delete-room/{roomId}")
    public void deleteRoom(@PathVariable("roomId") Long roomId) {
        iRoomService.deleteRoom(roomId);
    }

}
