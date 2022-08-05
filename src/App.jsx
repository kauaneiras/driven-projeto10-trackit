import Routes from "./routes";
import { useState} from "react";
import GlobalStyle from "./Style.css/GlobalStyle";
import {Requisition, Login, AddHabit, HabitsList, HabitsToday, Score } from "./Contexts";
import "../reset.css";

export default function App() {
    const [requisition, setRequisition] = useState(false);
    const [login, setLogin] = useState({});
    const [addHabit, setAddHabit] = useState(false);
    const [habitList, setHabitList] = useState([]);
    const [habitsToday, setHabitsToday] = useState([]);
    const [score, setScore] = useState(0);

    return (
        <>
            <Requisition.Provider value={{requisition, setRequisition}}>
                <Login.Provider value={{login, setLogin}}>
                    <AddHabit.Provider value={{addHabit, setAddHabit}}>
                        <HabitsList.Provider value={{habitList, setHabitList}}>
                            <HabitsToday.Provider value={{habitsToday, setHabitsToday}}>
                                <Score.Provider value={{score, setScore}}>
                                    <GlobalStyle/>
                                    <Routes/>
                                </Score.Provider>
                            </HabitsToday.Provider>
                        </HabitsList.Provider>
                    </AddHabit.Provider>
                </Login.Provider>
            </Requisition.Provider>
        </>
    )
}