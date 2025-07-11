import { Box, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutApiCall } from "../Store/userAuthentication/authenticationSlice.js";
import { useEffect } from "react";
export default function Header() {
  const { status } = useSelector((state) => state.authenticationSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleLogout() {
    dispatch(logoutApiCall());
  }
  function handleClick() {
    if (status === "success") {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }
  return (
    <nav className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleClick}
          >
            <Box className="h-8 w-8 text-gray-900" />
            <span className="text-xl font-bold text-gray-900">3D Studio</span>
          </div>
          {status === "failed" ? (
            <div className="flex items-center gap-3">
              <Link to="/signin">
                <Button variant="outline" className="bg-transparent">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gray-900 hover:bg-gray-800">
                  Get Started
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/">
                <Button
                  variant="outline"
                  className="bg-transparent"
                  onClick={handleLogout}
                >
                  <LogOut />
                  <span> Logout</span>{" "}
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button className="bg-gray-900 hover:bg-gray-800">
                  DashBoard{" "}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
