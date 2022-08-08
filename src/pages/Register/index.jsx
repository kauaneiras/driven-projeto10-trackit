import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ImgLogo from "../../Images/Logo.png";
import RenderButton from "../../Components/RenderButton";
import {AXIOSSIGNUP} from "../../AxiosRequisition";

const Input = styled.input
`   width: 100%;
    height: 50px;
    border-radius: 5px;
    border: 1px solid #D4D4D4;
    box-sizing: border-box;
    margin-bottom: 10px;
    padding-left: 10px;
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    line-height: 25px;
    letter-spacing: 0em;
    text-align: left;
`
const Button = styled.button
`   width: 100%;
    height: 50px;
    border-radius: 5px;
    background: #52B6FF;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    font-size: 21px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
    color: white;
    cursor: pointer;
    &:disabled {
    opacity: 0.7;
    cursor: default;
  }
`
const Center = styled.div
`   width: 80%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const Logo = styled.img
`   width: 60%;
    height: auto;
`
const Form = styled.form
`   width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const GoTo = styled.p
`   margin-top: 20px;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
    text-align: center;
    color: #52B6FF;
    text-decoration: underline;
`
const Container = styled.div
`   width: 100vw;
    height: 100vh;
    background-color: white;
    position: relative;
    display: flex;
    justify-content: center;
    bottom: 50px;
`

export default function Register() {
    const [ registrationData, setRegistrationData] = useState({email: "", password: "", fullname: "", photo: ""})
    const { email, password, fullname, photo } = registrationData;
    const [ disabled, setDisabled ] = useState(false);
    const navigate = useNavigate();

    function OnSubmit(submitregister) {
        setDisabled(true)
        submitregister.preventDefault(); 
        const promisse = axios.post(AXIOSSIGNUP, {email: email, name: fullname, image: photo, password: password,})
        promisse.then(() => {navigate('/')})
        promisse.catch((warning) => { console.log("Não foi possível finalizar seu cadastro. Por favor, tente novamente."); setDisabled(false);});
    }

    return (
        <Container>
        <Center>
            <Logo src={ImgLogo} alt="" />
            <Form onSubmit={OnSubmit}>
                <Input disabled={disabled} type="email" value={email} placeholder="email" required onChange={(submitregister) => setRegistrationData({...registrationData, email: submitregister.target.value})}/>
                <Input disabled={disabled} type="password" value={password} placeholder="senha" required onChange={(submitregister) => setRegistrationData({...registrationData, password: submitregister.target.value})}/>
                <Input disabled={disabled} type="text" value={fullname} placeholder="nome" required onChange={(submitregister) => setRegistrationData({...registrationData, fullname: submitregister.target.value})}/>
                <Input disabled={disabled} type="url" value={photo} placeholder="foto" required onChange={(submitregister) => setRegistrationData({...registrationData, photo: submitregister.target.value})}/>
                <Button disabled={disabled} type="submit">
                    <RenderButton state={disabled} text="Entrar"/>
                </Button>
                <Link to="/"><GoTo>Já tem uma conta? Faça login!</GoTo></Link>
            </Form >
        </Center>
    </Container>
    )
}
