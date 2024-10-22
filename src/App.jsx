
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import EditRoom from './components/room/EditRoom'
import ExistingRooms from './components/room/ExistingRooms'
import AddRoom from './components/room/AddRoom'
import Home from './components/home/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/layout/Footer'
import RoomListing from './components/room/RoomListing'
import NavBar from './components/layout/Navbar'
import Admin from './components/admin/Admin'
import Checkout from './components/bookings/Checkout'
import BookingSuccess from './components/bookings/BookingSuccess'


function App() {


  return (
    <main>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-room/:roomid" element={<EditRoom />} />
          <Route path="/existing-rooms" element={<ExistingRooms />} />
          <Route path="/add-room" element={<AddRoom />} />
          <Route path="/book-room/:roomid" element={<Checkout />} />
          <Route path="/browse-all-rooms" element={<RoomListing />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
        </Routes>
      </Router>
      <Footer />
    </main>
  )
}

export default App
