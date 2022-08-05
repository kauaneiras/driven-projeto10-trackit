import {BrowserRouter, Routes, Route} from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Today from "../pages/Today";
import Habits from "../pages/Habits";
import Historic from "../pages/Historic";


export default function Router() {
	return (
        <BrowserRouter>
            <Routes>
                    <Route path="/Register" element={<Register />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/Today" element={<Today />} />
                    <Route path="/Habits" element={<Habits />} />
                    <Route path="/Historic" element={<Historic />} />
            </Routes>
        </BrowserRouter>
    )
}