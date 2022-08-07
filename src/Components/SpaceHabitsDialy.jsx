import { useContext, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { DailyHabit, LoginUser, Requisition } from '../Contexts';



export default function CardToday() {
    const { dailyHabit } = useContext(DailyHabit);
    const { requisition, setRequisition } = useContext(Requisition);
    const { loginUser } = useContext(LoginUser);
    const { token } = loginUser;
    const [ disabled, setDisabled ] = useState(false);

    function DoneCard(e,id) {
        e.preventDefault();
        setDisabled(true);
        const promisse = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, null, {headers: {'Authorization': `Bearer ${token}`}})
        promisse.then(() => {
            setRequisition(!requisition);  
            setDisabled(false);
        })
        promisse.catch((warning) => {
            alert("Ocorreu um erro. Tente novamente.");
            setDisabled(false);
        })
    }
    function NotDoneCard(e, id) {
        e.preventDefault();
        setDisabled(true);
        const promisse = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, null, {headers: {'Authorization': `Bearer ${token}`}})
        promisse.then(() => {
            setRequisition(!requisition);
            setDisabled(false);
        })
        promisse.catch(() => {
            alert("Ocorreu um erro. Tente novamente.");
            setDisabled(false);
        })
    }

    return (
            <>
            {habitsToday.map(elem => {
                return (
                <Card>
                    <CenterCards>
                        <Left> 
                            <Habit>{elem.name}</Habit>
                            <Sequential fontColorSequential={elem.done ? "#8FC549" : "#666666"}>Sequência atual: {elem.currentSequence} {elem.currentSequence > 1 ? "dias" : "dia"} </Sequential>
                            <Record fontColorRecord={elem.currentSequence === elem.highestSequence ? "#8FC549" : "#666666"}>Seu recorde: {elem.highestSequence} {elem.highestSequence > 1 ? "dias" : "dia"} </Record>
                        </Left>
                        <IconCheck disabled={disabled} background={elem.done ? "#8FC549" : "#E7E7E7"} onClick={(e) => {elem.done ? NotDoneCard(e, elem.id) : DoneCard(e, elem.id)}}>
                            <ion-icon name="checkmark-outline"></ion-icon>
                        </IconCheck>
                    </CenterCards>
                </Card>
            )})}
        </>
    )
}

const Card = styled.div`
    width: 100%;
    height: auto;
    background-color: white;
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`
const CenterCards = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`
const Left = styled.div`
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    background-color: white
`
const Habit = styled.h3`
    font-size: 20px;
    font-weight: 400;
    line-height: 25px;
    color: #666666;
    padding-bottom: 10px;
`
const Sequential = styled.h4`
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    color: ${props => props.fontColorSequential};
`

const Record = styled.h4`
font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    color: ${props => props.fontColorRecord};
`
const IconCheck = styled.button`
    width: 22%;
    background-color: ${props => props.background};
    margin-left: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 40px;
    border: none;
`