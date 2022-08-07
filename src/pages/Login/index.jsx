import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ImgLogo from "../../Images/Logo.png";
import RenderButton from "../../Components/RenderButton";
import {LoginUser} from "../../Contexts"

export default function Login() {
    const { loginUser, setLoginUser } = useContext(LoginUser);
    const [ loginInfos, setLoginInfos ] = useState({email: "", password: "",});
    const { email, password } = loginInfos;
    const [ disabled, setDisabled ] = useState(false);
    const navigate = useNavigate();

    function OnSubmit(submission) {
        setDisabled(true);
        submission.preventDefault();
        const promisse = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", { email: email, password: password})
        promisse.then((answer) => {
            localStorage.setItem("user", JSON.stringify({ token: answer.data.token, image: answer.data.image, name: answer.data.name}));
            setLoginUser(answer.data);
            console.log(setLoginUser)
            navigate('/Today');
        })
        promisse.catch((warning) => {
            alert("Não foi possível realizar seu login. Por favor, tente novamente.");
            setDisabled(false);
        });
    }

    return (
        <Container>
            <Center>
                <Logo src={ImgLogo} alt="" />
                <Form onSubmit={OnSubmit} >
                    <Input
                        disabled={disabled}
                        type="email"
                        value={email}
                        placeholder="email"
                        required
                        onChange={(submission) => setLoginInfos({...loginInfos, email: submission.target.value})}
                    />
                    <Input
                        disabled={disabled}
                        type="password"
                        value={password}
                        placeholder="senha"
                        required
                        onChange={(submission) => setLoginInfos({...loginInfos, password: submission.target.value})}
                    />
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

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: white;
    position: relative;
    display: flex;
    justify-content: center;
    bottom: 50px;
`
const Center = styled.div`
    width: 80%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const Logo = styled.img`
    width: 60%;
    height: auto;
`
const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Input = styled.input`
    width: 100%;
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
const Button = styled.button`
    width: 100%;
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
`
const GoTo = styled.p`
    margin-top: 20px;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
    text-align: center;
    color: #52B6FF;
    text-decoration: underline;
`