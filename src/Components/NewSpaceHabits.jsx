import { useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import RenderButton from "./RenderButton";
import { LoginUser, AddNewHabit, Requisition } from "../Contexts";

export default function NewCard() {
    let array = [{day: "D", number: 7}, {day: "S", number: 1}, {day: "T", number: 2}, {day: "Q", number: 3}, {day: "Q", number: 4}, {day: "S", number: 5}, {day: "S", number: 6}];
    const { loginUser } = useContext(LoginUser);
    const { addNewHabit, setAddNewHabit } = useContext(AddNewHabit);
    const { requisition, setRequisition } = useContext(Requisition);
    const [ insertHabit, setInsertHabit ] = useState("");
    const [ selected, setSelected ] = useState([]);
    const [ disabled, setDisabled ] = useState(false);
    const { token } = loginUser;

    function postNewCard(e) {
        if(selected.length > 0 && insertHabit !== ""){
            setDisabled(true);
            e.preventDefault();
            const promisse = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", {
                name: insertHabit, days: selected, }, {headers: {'Authorization': `Bearer ${token}`}})
            promisse.then(() => {
                setAddNewHabit(false);
                setRequisition(!requisition);
            })
            promisse.catch((warning) => {
                alert("Não foi possível cadastrar seu hábito. Por favor, tente novamente.");
                setDisabled(false);
            })
        }else{
            alert("Preencha todos os campos abaixo");
        }

    }

    if(addNewHabit === true){
        return (
            <>
                <Card >
                    <Form>
                        <Habit
                            disabled={disabled}
                            type="text"
                            placeholder="nome do hábito"
                            onChange={(e) => setInsertHabit(e.target.value)}
                        />
                        <Weekdays>
                            {array.map(elem => {
                                if(!selected.includes(elem.number)){
                                    return (
                                        <Day 
                                        disabled={disabled}
                                        type="button"
                                        fontColor="#DBDBDB" 
                                        background="white" 
                                        onClick={() => {
                                            setSelected([...selected, elem.number])}
                                        }>{elem.day}</Day>
                                    )
                                }
                                else{
                                    return (
                                        <Day 
                                        disabled={disabled}
                                        type="button"
                                        fontColor="white"
                                        background="#DBDBDB" 
                                        onClick={() => {
                                            setSelected(selected.filter((day) => day !== elem.number))}
                                        }>{elem.day}</Day>
                                    )
                                }
                            }
                        )} 
                        </Weekdays>
                        <AlignButtons>
                            <ButtonCancel onClick={() => setAddNewHabit(false)}>
                                Cancelar
                            </ButtonCancel>
                            <ButtonSave onClick={(e) => postNewCard(e)}>
                                <RenderButton state={disabled} text="Entrar"/>
                            </ButtonSave>
                        </AlignButtons>
                    </Form>
                </Card>
            </>
        )
    }else{
        return (
            <></>
        )
    }
}   

const Card = styled.div`
    width: 100%;
    height: auto;
    background-color: white;
    border-radius: 5px;
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Form = styled.div`
    width: 90%;
    height: 82%;
    display: flex;
    flex-direction: column;
`
const Habit = styled.input`
    width: 100%;
    height: 50px;
    border: none;
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    padding-left: 10px;
    margin-bottom: 10px;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 25px;
    color: grey;
    display: flex;
`
const Weekdays = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
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
const AlignButtons = styled.div`
    width: 100%;
    height: auto;
    padding-top: 20px;
    display: flex;
    justify-content: flex-end;
`
const ButtonCancel = styled.button`
    width: 34%;
    height: 40px;
    border: none;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    color: #52B6FF;
    background-color: white;
`
const ButtonSave = styled.button`
    width: 34%;
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