import { useState } from 'react';
import GlobalStyle from "./Style.css/GlobalStyle";
import Routes from "./Routes";
import { LoginUser, AddNewHabit, AllHabits, Requisition, DailyHabit, Progress } from "../src/Contexts"

export default function App() {
    const [loginUser, setLoginUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);
    const [addNewHabit, setAddNewHabit] = useState(false);
    const [allHabits, setAllHabits] = useState([]);
    const [requisition, setRequisition] = useState(false);
    const [dailyHabit, setDailyHabit] = useState([]);
    const [progress, setProgress] = useState(0);
    return ( <>
        <LoginUser.Provider value={{loginUser, setLoginUser}}>
            <AllHabits.Provider value={{allHabits, setAllHabits}}>
                <AddNewHabit.Provider value={{addNewHabit, setAddNewHabit}}>
                    <Requisition.Provider value={{requisition, setRequisition}}>
                        <DailyHabit.Provider value={{dailyHabit, setDailyHabit}}>
                            <Progress.Provider value={{progress, setProgress}}>
                                <GlobalStyle/>
                                <Routes/>
                            </Progress.Provider>
                        </DailyHabit.Provider>
                    </Requisition.Provider>
                </AddNewHabit.Provider>
            </AllHabits.Provider>
        </LoginUser.Provider>
        </>)
}