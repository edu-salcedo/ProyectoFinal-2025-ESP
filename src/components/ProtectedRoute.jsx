import { Navigate } from "react-router-dom"
import { UseAuth } from "../hooks/UseAuth";

export default function ProtectedRoute({ children }) {
    const { token } = UseAuth();
    return token ? children : <Navigate to="/home" />;
}

