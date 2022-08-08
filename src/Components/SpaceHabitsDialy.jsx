import { useContext, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { DailyHabit, LoginUser, Requisition } from '../Contexts';

const Record = styled.h4
`   color: ${props => props.fontColorRecord};
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;   
`
const Sequential = styled.h4
`   color: ${props => props.fontColorSequential};
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;   
`
const IconCheck = styled.button
`   width: 22%;
    background-color: ${props => props.background};
    color: white;
    margin-left: 10px;
    border-radius: 5px;
    font-size: 40px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
`
const CenterCards = styled.div
`   height: 100%;
    width: 100%;
    display: flex;
`
const Card = styled.div
`   width: 100%;
    height: auto;
    background-color: white;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Left = styled.div
`   height: 100%;
    width: 80%;
    background-color: white
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`
const Habit = styled.h3
`   color: #666666;
    font-size: 20px;
    font-weight: 400;
    line-height: 25px;
    padding-bottom: 10px;
`

export default function CardHabitDaily() {
    const { dailyHabit } = useContext(DailyHabit);
    const { requisition, setRequisition } = useContext(Requisition);
    const { loginUser } = useContext(LoginUser);
    const { token } = loginUser;
    const [ disabled, setDisabled ] = useState(false);

    function NotFinishCard(finishhabit, id) {
        finishhabit.preventDefault();
        setDisabled(true);
        const promisse = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, null, {headers: {'Authorization': `Bearer ${token}`}})
        promisse.then(() => {setRequisition(!requisition); setDisabled(false);})
        promisse.catch(() => {alert("Ocorreu um erro. Tente novamente."); setDisabled(false);})
    }

    function FinishCard(finishhabit,id) {
        finishhabit.preventDefault();
        setDisabled(true);
        const promisse = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, null, {headers: {'Authorization': `Bearer ${token}`}})
        promisse.then(() => {setRequisition(!requisition); setDisabled(false);})
        promisse.catch((warning) => {alert("Ocorreu um erro. Tente novamente."); setDisabled(false);})
    }
    
    return (
            <>
            {dailyHabit.map(elem => {
                return (
                <Card>
                    <CenterCards>
                        <Left> 
                            <Habit>{elem.name}</Habit>
                            <Sequential fontColorSequential={elem.done ? "#8FC549" : "#666666"}>Sequência atual: {elem.currentSequence} {elem.currentSequence > 1 ? "dias" : "dia"} </Sequential>
                            <Record fontColorRecord={elem.currentSequence === elem.highestSequence ? "#8FC549" : "#666666"}>Seu recorde: {elem.highestSequence} {elem.highestSequence > 1 ? "dias" : "dia"} </Record>
                        </Left>
                        <IconCheck disabled={disabled} background={elem.done ? "#8FC549" : "#E7E7E7"} onClick={(finishhabit) => {elem.done ? NotFinishCard(finishhabit, elem.id) : FinishCard(finishhabit, elem.id)}}>
                            <ion-icon name="checkmark-outline"></ion-icon>
                        </IconCheck>
                    </CenterCards>
                </Card>
            )})}
        </>
    )
}
