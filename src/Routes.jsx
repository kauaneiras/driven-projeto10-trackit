import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Habits from "./pages/Habits";
import Today from "./pages/Today"
import Historic from "./pages/Historic"

export default function Router() {
	return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/Register" element={<Register/>}/>
                <Route path="/Habits" element={<Habits/>}/>
                <Route path="/Today" element={<Today/>}/>
                <Route path="/Historic" element={<Historic/>}/>
            </Routes>
        </BrowserRouter >
    )
}