import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from 'react';
import axios from 'axios';
import ImgLogo from "../../Images/Logo.png";
import RenderButton from "../../Components/RenderButton";
import {LoginUser} from "../../Contexts"
import {AXIOSLOGIN} from "../../AxiosRequisition";
import styled from 'styled-components';

const Button = styled.button
`   width: 100%;
    height: 50px;
    color: white;
    background: #52B6FF;
    border: none;
    border-radius: 5px;
    font-size: 21px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Center = styled.div
`    width: 80%;
    height: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`
const Logo = styled.img
`   width: 60%;
    height: auto;
`
const Container = styled.div
`   position: relative; 
    bottom: 50px;
    width: 100vw;
    height: 100vh;
    background-color: white;
    display: flex;
    justify-content: center;   
`
const Form = styled.form
`   width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`
const Input = styled.input
`   width: 100%;
    height: 50px;
    font-size: 20px;
    font-style: normal;
    line-height: 25px;
    letter-spacing: 0em;
    text-align: left;
    font-weight: 300;
    border-radius: 5px;
    border: 1px solid #D4D4D4;
    box-sizing: border-box;
    margin-bottom: 10px;
    padding-left: 10px;
`
const GoTo = styled.p
`   color: #52B6FF;
    margin-top: 20px;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
    text-align: center;
    text-decoration: underline;
`

export default function Login() {
    const { loginUser, setLoginUser } = useContext(LoginUser);
    const [ loginInfos, setLoginInfos ] = useState({email: "", password: "",});
    const { email, password } = loginInfos;
    const [ disabled, setDisabled ] = useState(false);
    const navigate = useNavigate();

    function OnSubmit(logindata) {
        setDisabled(true);
        logindata.preventDefault();
        const promisse = axios.post(AXIOSLOGIN, { email: email, password: password})
        promisse.then((answer) => {
            localStorage.setItem("user", JSON.stringify({ token: answer.data.token, image: answer.data.image, name: answer.data.name}));
            setLoginUser(answer.data);
            navigate('/Today');
        })
        promisse.catch((warning) => {
            alert("Algo deu errado. Não foi possível realizar seu login. Por favor, tente novamente.");
            setDisabled(false);
        });
    }

    return (
        <Container>
            <Center>
                <Logo src={ImgLogo} alt="" />
                <Form onSubmit={OnSubmit} >
                    <Input disabled={disabled} type="email" value={email} placeholder="email" required onChange={(logindata) => setLoginInfos({...loginInfos, email: logindata.target.value})}/>
                    <Input disabled={disabled} type="password" value={password} placeholder="senha" required onChange={(logindata) => setLoginInfos({...loginInfos, password: logindata.target.value})}/>
                <Button disabled={disabled} type="submit">
                    <RenderButton state={disabled} text="Entrar"/>
                </Button>
                </Form >
                    <Link to="/Register">
                        <GoTo>Não tem uma conta? Cadastre-se!</GoTo>
                    </Link>
            </Center>
        </Container>
    )

}

