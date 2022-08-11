import React, { useEffect } from "react";
import { useState } from 'react'
import apiService from "../services/api.service"
import RoomPost from "../components/RoomPost.js";
import { useContext } from 'react'
import { AuthContext } from '../contexts/authContext'

function Home() {

  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(true)
  const [roomPosts, setRoomPosts] = useState([])
  const { isLoading, loggedInUser} = useContext(AuthContext)


  useEffect(() => {
    async function fetchData(){
      try {
        const rooms = await apiService.getRooms()
        setRoomPosts(rooms)
        setLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()
  }, [refresh])

  const deleteRoom = async (id) => {
    try {
      await apiService.deleteRoom(id)
      setRefresh(!refresh)
    } catch (error){
      console.log(error)
    }
  }

  if(loading){
    return (
      <p>Loading...</p>
    )
  }

  return (
    <div className = "container mt-20 d-flex justify-content-center">
      <div className = 'row'>
        {roomPosts.map( post => { 
          return <RoomPost 
            post={post} 
            key={post._id} 
            loggedInUser={loggedInUser} 
            deleteRoom={deleteRoom} />
        })}
      </div>
    </div>
  );
}

export default Home;
