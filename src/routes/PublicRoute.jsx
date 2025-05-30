import { Navigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const PublicRoute = ({ element }) => {
  const { username} = useAuthStore();

  return username ? <Navigate to="/" replace /> : element;
};

export default PublicRoute;