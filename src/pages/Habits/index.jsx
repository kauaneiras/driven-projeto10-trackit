import { useContext, useEffect } from 'react';
import axios from 'axios';
import NewCardHabit from "../../Components/NewSpaceHabits";
import CardHabit from "../../Components/SpaceHabits";
import { AddNewHabit, AllHabits, LoginUser, Requisition } from "../../Contexts";
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import styled from 'styled-components';
import { AXIOSHABITS } from '../../AxiosRequisition';


const Icon = styled.div
`   width: 12%;
    height: 55%;
    color: white
    background-color: #52B6FF;
    border-radius: 5px;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const NewHabits = styled.div
`   width: 100%;
    height: auto;
    color: #666666;
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
    font-style: normal;
    padding-bottom: 40px;
`
const Center = styled.div
`   width: 92%;
    height: 100%;
`
const AddHabit = styled.div
`   width: 100%;
    height: 70px;
    color: #126BA5;
    font-size: 23px;
    font-weight: 400;
    line-height: 29px;
    font-style: normal;    
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Container = styled.div
`   width: 100%;
    height: 100%;
    background-color: #F2F2F2;
    font-family: Lexend Deca;
    padding-top: 80px;
    padding-bottom: 90px;
    display: flex;
    justify-content: center
`

export default function Habits() {
    const { setAllHabits } = useContext(AllHabits);
    const { addNewHabit, setAddNewHabit } = useContext(AddNewHabit);
    const { requisition } = useContext(Requisition);
    const { loginUser } = useContext(LoginUser);
    const { token } = loginUser;

    useEffect(() => {
        const promisse = axios.get(AXIOSHABITS, {headers: {'Authorization': `Bearer ${token}`}});
        promisse.then((answer) => {setAllHabits(answer.data);});
        promisse.catch((warning) => console.log(warning.response));}, [requisition]);

    function AddCard() {
        if(addNewHabit === true){return (<NewCardHabit/>)}
        else{return (<></>)}
    }

    function WhatToShow() {
        if(setAllHabits.length !== 0){return (<CardHabit/>)}
        else{return (<p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>)}
    }

    return (
        <>
            <Header />
            <Footer />
            <Container>
                <Center>
                    <AddHabit>
                        <p>Meus hábitos</p>
                        <Icon>
                            <ion-icon name="add-outline" onClick={() => setAddNewHabit(true)}></ion-icon>
                        </Icon>
                    </AddHabit>
                    <AddCard />
                    <NewHabits>
                        <WhatToShow />
                    </NewHabits>
                </Center>
            </Container>
        </>
    )
}   

