import { useContext } from 'react';
import styled from 'styled-components';
import { LoginUser } from "../Contexts";
import LogoName from "../Images/LogoName.png";

const Logo = styled.img
`   width: 30%;
    height: auto;`

const UserPhoto = styled.img
`   width: 16%;
    height: 95%;
    background-color: orange;
    border-radius: 50%;`

const HeaderCenter = styled.div
`   height: 80%;
    width: 95%;  
    display: flex;
    align-items: center;
    justify-content: space-between;`

const HeaderApp = styled.header
`   position: fixed;
    width: 100%;
    height: 80px;
    background-color: #126BA5;
    display: flex;
    align-items: center;
    justify-content: center;`

export default function Header() {
    const {loginUser} = useContext(LoginUser);
    const {image} = loginUser; 
    return (
        <HeaderApp >
            <HeaderCenter>
                <Logo src={LogoName} alt=""/>
                <UserPhoto src={image} alt=""/> 
            </HeaderCenter>
        </HeaderApp>
    )
}


