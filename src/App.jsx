import {BrowserRouter, Routes, Route} from "react-router-dom";
import { useState, useEffect } from "react";
import "../reset.css";

export default function App() {
    const [login, setLogin] = useState({});
    const [addHabit, setAddHabit] = useState(false);
    const [habitList, setHabitList] = useState([]);

    return (
        <>
        <BrowserRouter>
            <Routes>
                    <Route path="/Register" element={<Register />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/Habits" element={<Habits />} />
                    <Route path="/Today" element={<Today />} />
                    <Route path="/Historic" element={<Historic />} />
            </Routes>
        </BrowserRouter>
        </>
    )
}