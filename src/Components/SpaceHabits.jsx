import { useContext } from "react";
import { LoginUser, Requisition, AllHabits } from "../Contexts";
import axios from "axios";
import styled from "styled-components";

export default function Card() {
    let array = [{day: "D", number: 7}, {day: "S", number: 1}, {day: "T", number: 2}, {day: "Q", number: 3}, {day: "Q", number: 4}, {day: "S", number: 5}, {day: "S", number: 6}];
    const { loginUser } = useContext(LoginUser);
    const { token } = loginUser;
    const { requisition, setRequisition } = useContext(Requisition);
    const { allHabits } = useContext(AllHabits);
    
    function postDelete(deleteclick, id){
        deleteclick.preventDefault();
        const promisse = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, {headers: {'Authorization': `Bearer ${token}`}})
            promisse.then(() => {setRequisition(!requisition);})
            promisse.catch(() => {alert("Não foi possível deletar o hábito. Por favor, tente novamente");})
    }
    return (
        <>
            {allHabits.map(card => {
                    let days = card.days;

                    return (
                    <HabitCreated>
                    <CenterHabit>
                        <HabitDescription>
                            <P>{card.name}</P>
                            <IconTrash>
                                <ion-icon onClick={(deleteclick) => postDelete(deleteclick, card.id)} name="trash-outline"></ion-icon>
                            </IconTrash>
                        </HabitDescription>
                        <Weekdays>
                            {array.map((elem) => {
                                if(days.includes(elem.number)){
                                    return(
                                        <Day background="#CFCFCF" fontColor="white" >{elem.day}</Day>
                                    )
                                }else{
                                    return(
                                        <Day background="white" fontColor="#CFCFCF" >{elem.day}</Day>
                                    )
                                }
                            })}
                        </Weekdays>
                    </CenterHabit>
                </HabitCreated>)
            })}
        </>
    )
}

const HabitCreated = styled.div`
    width: 100%;
    height: auto;
    background-color: white;
    border-radius: 5px; 
    padding-top: 10px;
    padding-bottom: 15px;
    margin-bottom: 10px;;
    display: flex;
    align-items: center;
    justify-content: center;

`
const CenterHabit = styled.div`
    width: 90%;
    height: 82%;
    display: flex;
    flex-direction: column;
`
const HabitDescription = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    font-weight: 400;
    line-height: 25px;
    color: #666666;
`
const Weekdays = styled.div`
    width: 80%;
    height: 33px;
    display: flex;
    justify-content: space-between;
`
const P = styled.p`
    width: 85%;
    height: auto;
    padding: 5px;
    margin-bottom: 5px;
    display: flex;
    flex-wrap: wrap;
`
const IconTrash = styled.div`
    font-size: 25px;
`
const Day = styled.button`
    width: 13%;
    height: 100%;
    margin-bottom: 1px;
    border-radius: 5px;
    color: ${props => props.fontColor};
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 25px;
    background-color: ${props => props.background};
    border: 1px solid #D4D4D4;
    display: flex;
    align-items: center;
    justify-content: center;
`