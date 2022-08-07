import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import AnimatedProgressProvider from "./AnimatedProgressProvider"
import { easeQuadInOut } from "d3-ease";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { useContext } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { Progress } from '../Contexts';

export default function Footer() {
    const { progress } = useContext(Progress);
    
    return (
        <>
            <Link to="/Today">
                <ProgressBar>
                    <AnimatedProgressProvider
                        valueStart={0}
                        valueEnd={progress}
                        duration={1.4}
                        easingFunction={easeQuadInOut}
                        >
                        {value => {
                        return (
                            <CircularProgressbar
                                value={value}
                                text={"Hoje"}
                                background
                                backgroundPadding={6}
                                styles={buildStyles({
                                    pathTransition: "none",
                                    backgroundColor: "#52B6FF",
                                    textColor: "#ffffff",
                                    pathColor: "#ffffff",
                                    trailColor: "transparent"
                                })}
                            />
                        );
                        }}
                    </AnimatedProgressProvider>
                </ProgressBar>
            </Link>
            <FooterApp>
                <Link to="/Habits">
                    <Habits >Hábitos</Habits>
                </Link>
                <Link to="/Historic">
                    <Historic>Histórico</Historic> 
                </Link>
            </FooterApp>
        </>
    )
}

const ProgressBar = styled.div`
    width: 30%;
    position: fixed;
    bottom: 10px;
    right: 35%;
    z-index: 2;
`
const FooterApp = styled.footer`
    width: 100%;
    height: 80px;
    background-color: white;
    position: fixed;
    bottom: 0;
    display: flex;
    display: flex;
    justify-content: space-between;
    z-index: 1;
`
const Habits = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 40px;
    font-family: Lexend Deca;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    color: #52B6FF;
`
const Historic = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 35px;
    font-family: Lexend Deca;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    color: #52B6FF;
`