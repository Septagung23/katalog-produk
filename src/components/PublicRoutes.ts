import { useEffect } from "react";
import { useNavigate, useOutlet } from "react-router-dom";

export default function PublicRoutes() {
  const navigate = useNavigate();
  const Outlet = useOutlet();
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
  return Outlet;
}
