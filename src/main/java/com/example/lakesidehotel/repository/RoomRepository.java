package com.example.lakesidehotel.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.lakesidehotel.model.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long>{

    @Query("SELECT DISTINCT r.roomType from Room r")
    List<String> findDistinctRoomType();

}
