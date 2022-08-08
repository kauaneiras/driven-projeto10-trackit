import { DailyHabit, LoginUser, Requisition, Progress } from '../../Contexts';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import CardHabitDaily from '../../Components/SpaceHabitsDialy';
import styled from 'styled-components'; 
import {AXIOSTODAY} from '../../AxiosRequisition';


const Day = styled.h1
`   font-size: 23px;
    font-weight: 400;
    line-height: 29px;
    color: #126BA5;
`
const Number = styled.h2
`   font-size: 18px;
    font-weight: 400;
    line-height: 22px;
    color: #BABABA;
`
const Habits = styled.div
`   width: 100%;
    height: 100%;
`
const Center = styled.div
`   width: 92%;
    height: 100%;
`
const Container = styled.div
`   width: 100%;
    height: 100vh;
    background-color: #F2F2F2;
    padding-top: 80px;
    padding-bottom: 90px;
    font-family: Lexend Deca;
    display: flex;
    justify-content: center
`
const Title = styled.div
`   width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
`

export default function Today() {
    let counter = 0;
    let minCounter = 0;
    let percentage = 0;
    const { loginUser } = useContext(LoginUser);
    const { token } = loginUser;
    const { dailyHabit, setDailyHabit } = useContext(DailyHabit);
    const { requisition } = useContext(Requisition);
    const { setProgress } = useContext(Progress);

    useEffect(() => {
        const promisse = axios.get(AXIOSTODAY, {headers: {'Authorization': `Bearer ${token}`}});
        promisse.then((answer) => {
            setDailyHabit(answer.data);
        });
        promisse.catch((warning) => console.log(warning.response));
    }, [requisition]);

    const dayjs = require('dayjs');
    dayjs.locale('br');
    let now = dayjs();
    let today = new Date((now.format('dddd, MM/DD')))
    const option = {month: 'numeric', weekday: 'long', day: 'numeric',}
    let dayTranslate = (today.toLocaleDateString('pt-br',option));
    let removeFeira = dayTranslate.replace('-feira','');
    let renderDay = removeFeira[0].toUpperCase() + removeFeira.substr(1);

    for(let k = 0; k < dailyHabit.length; k++){
        if(dailyHabit[k].done === true){
            counter++;
            percentage = Math.round((counter/(dailyHabit.length)*100));
            setProgress(percentage);}
        else{minCounter++;}
        if(minCounter === dailyHabit.length){setProgress(0);}
    }

    return (
        <>  <Header/>
            <Footer/>
            <Container>
                <Center>
                    <Title>
                        <Day>{renderDay}</Day>
                        <Number>{percentage}% dos hábitos concluídos</Number>
                    </Title>
                    <Habits><CardHabitDaily/></Habits>
                </Center>
            </Container>
        </>
    )
}

