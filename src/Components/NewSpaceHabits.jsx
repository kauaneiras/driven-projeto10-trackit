import { useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import RenderButton from "./RenderButton";
import { LoginUser, AddNewHabit, Requisition } from "../Contexts";
import { AXIOSHABITS } from '../AxiosRequisition';


const Weekdays = styled.div
`   width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
`
const Form = styled.div
`   width: 90%;
    height: 82%;
    display: flex;
    flex-direction: column;
`
const Habit = styled.input
`   width: 100%;
    height: 50px;
    color: grey;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 25px;
    padding-left: 10px;
    margin-bottom: 10px;
    border: none;
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    display: flex;
`
const Card = styled.div
`   width: 100%;
    height: auto;
    background-color: white;
    padding-top: 20px;
    padding-bottom: 20px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Day = styled.button
`   width: 13%;
    height: 100%;
    background-color: ${props => props.background};
    color: ${props => props.fontColor};
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 25px;
    margin-bottom: 1px;
    border-radius: 5px;   
    border: 1px solid #D4D4D4;
    display: flex;
    align-items: center;
    justify-content: center;
`
const AlignButtons = styled.div
`   width: 100%;
    height: auto;
    padding-top: 20px;
    display: flex;
    justify-content: flex-end;
`
const ButtonCancel = styled.button
`   width: 34%;
    height: 40px;
    border: none;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    color: #52B6FF;
    background-color: white;
`
const ButtonSave = styled.button
`   width: 34%;
    height: 40px;
    border-radius: 5px;
    border: none;
    background-color: #52B6FF;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`
export default function NewCardHabit() {
    const { loginUser } = useContext(LoginUser);
    const { token } = loginUser;
    const [ insertHabit, setInsertHabit ] = useState(""); 
    const { addNewHabit, setAddNewHabit } = useContext(AddNewHabit);
    const { requisition, setRequisition } = useContext(Requisition);   
    const [ selected, setSelected ] = useState([]);
    const [ disabled, setDisabled ] = useState(false);
    let array = [{day: "D", number: 7}, {day: "S", number: 1}, {day: "T", number: 2}, {day: "Q", number: 3}, {day: "Q", number: 4}, {day: "S", number: 5}, {day: "S", number: 6}];

    function postNewCardHabit(postnewcard) {
        if(selected.length > 0 && insertHabit !== ""){
            setDisabled(true);
            postnewcard.preventDefault();
            const promisse = axios.post(AXIOSHABITS, {name: insertHabit, days: selected, }, {headers: {'Authorization': `Bearer ${token}`}})
            promisse.then(() => {setAddNewHabit(false); setRequisition(!requisition);})
            promisse.catch((warning) => {alert("Não foi possível cadastrar seu hábito. Por favor, tente novamente."); setDisabled(false);})
        }
        else{alert("Preencha todos os dados pedidos abaixo");}
    }
    if(addNewHabit === true){
        return (
            <>
                <Card >
                    <Form>
                        <Habit disabled={disabled} type="text" placeholder="nome do hábito" onChange={(postnewcard) => setInsertHabit(postnewcard.target.value)}/>
                        <Weekdays>
                            {array.map(elem => {
                                if(!selected.includes(elem.number)){
                                    return (<Day disabled={disabled} type="button" fontColor="#DBDBDB" background="white" onClick={() => {setSelected([...selected, elem.number])}}>{elem.day}</Day>)
                                }
                                else{
                                    return (<Day disabled={disabled} type="button" fontColor="white" background="#DBDBDB" onClick={() => {setSelected(selected.filter((day) => day !== elem.number))}}>{elem.day}</Day>)
                                }
                            }
                        )} 
                        </Weekdays>
                        <AlignButtons>
                            <ButtonCancel onClick={() => setAddNewHabit(false)}>Cancelar</ButtonCancel>
                            <ButtonSave onClick={(postnewcard) => postNewCardHabit(postnewcard)}>
                                <RenderButton state={disabled} text="Entrar"/>
                            </ButtonSave>
                        </AlignButtons>
                    </Form>
                </Card>
            </>
        )
    }
    else{return (<></>)}
}   
