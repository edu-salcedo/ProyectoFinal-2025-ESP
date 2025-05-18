import { Image } from "react-bootstrap"
import banner from "../../assets/banner.jpg"
function Home() {

    return (
        <>
            <Image src={banner} alt="banner" className=" mw-100 mt-5" />

        </>
    )
}

export default Home