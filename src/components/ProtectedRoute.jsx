import { Navigate } from "react-router-dom"
import { UseAuth } from "../hooks/UseAuth";

export default function ProtectedRoute({ children }) {
    const { token, isLoading } = UseAuth();
    if (isLoading) {
        return <div className="text-center mt-5">Cargando...</div>;
    }
    return token ? children : <Navigate to="/" />;
}

