
import HotelServices from "../common/HotelServices"
import Parallax from "../common/Parallax"
import RoomCarousal from "../common/RoomCarousal"
import MainHeader from "../layout/MainHeader"
const Home = () => {

    return (
        <section>
            <MainHeader />
            <section className="container">
                <RoomCarousal />
                <Parallax />
                <RoomCarousal />
                <HotelServices />
                <RoomCarousal />
                <Parallax />
            </section>
        </section>
    )
}

export default Home