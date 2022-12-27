import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

export default function PublicRoutes() {
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, [navigate]);
  async function fetchData() {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      navigate("/");
      return;
    }
  }
  return <Outlet />;
}
