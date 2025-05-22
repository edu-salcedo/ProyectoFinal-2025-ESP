import { useParams } from "react-router-dom"

function Profile() {

    const { id } = useParams();
    return (
        <>
            <div>welcome  {id}</div>
        </>
    )
}


export default Profile