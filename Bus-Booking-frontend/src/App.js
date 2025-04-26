import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./components/Auth/SignUp";
import Login from "./components/Auth/Login";
import BusList from "./components/User/BusList";
import BookBus from "./components/User/BookBus";
import ConfirmationPage from "./components/User/ConfirmationPage";
import BookingHistory from "./components/User/BookingHistory";
import Dashboard from "./components/Admin/Dashboard";
import ManageBuses from "./components/Admin/ManageBuses";
import UsersList from "./components/Admin/UsersList";
import AllBookings from "./components/Admin/AllBookings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* User routes */}
        <Route path="/BusList" element={<BusList />} />
        <Route path="/BookBus" element={<BookBus />} />
        <Route path="/BookingHistory" element={<BookingHistory />} />
        <Route path="/ConfirmationPage" element={<ConfirmationPage />}/>

        {/* Admin routes */}
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/UsersList" element={<UsersList />} />
        <Route path="/ManageBuses" element={<ManageBuses />} />
        <Route path="/AllBookings" element={<AllBookings />} />
      </Routes>
    </Router>
  );
}

export default App;
