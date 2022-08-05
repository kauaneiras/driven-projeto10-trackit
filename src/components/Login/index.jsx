import axios from "axios";
import {useState, useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import Login from "../Contexts/Login";
import requisitionLogin from "./Requisition"

export default function Login() {
    const { LoginContext, setLoginContext } = useContext(LoginContext);
    const [ loginInfos, setLoginInfos ] = useState({
        email: "", 
        password: "",
    });
    const { email, password } = loginInfos;
    const [ disabled, setDisabled ] = useState(false);

    const navigate = useNavigate();

    function OnSubmit(e) {
        setDisabled(true);
        e.preventDefault();
        const promisse = axios.post(requisitionLogin, {email: email, password: password, })
        promisse.then((answer) => {
            localStorage.setItem("user", JSON.stringify({
                token: answer.data.token, image: answer.data.image, name: answer.data.name,})
        );
            setLoginContext(answer.data);
            navigate('/Today');
        })
        promisse.catch((warning) => {
            alert("FALHA LOGIN");
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
                        onChange={(e) => setLoginInfos({...loginInfos, email: e.target.value})}
                    />
                    <Input
                        disabled={disabled}
                        type="password"
                        value={password}
                        placeholder="senha"
                        required
                        onChange={(e) => setLoginInfos({...loginInfos, password: e.target.value})}
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

