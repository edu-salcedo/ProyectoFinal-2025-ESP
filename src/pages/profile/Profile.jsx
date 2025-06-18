import { useParams } from "react-router-dom"
import { UseAuth } from "../../hooks/UseAuth";

function Profile() {

    const { user } = UseAuth();
    return (
        <>
            <div>welcome  {user}</div>
        </>
    )
}


export default Profile