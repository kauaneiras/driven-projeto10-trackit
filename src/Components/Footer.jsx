import { Link } from "react-router-dom";
import React from "react";
import { useContext } from 'react';
import {Animate} from "react-move";
import { Progress } from '../Contexts';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { easeQuadInOut } from "d3-ease";
import 'react-circular-progressbar/dist/styles.css';
import styled from 'styled-components';

//styles
const Historic = styled.div
`   color: #52B6FF;
    width: 100%;
    height: 100%;
    padding-right: 35px;
    font-family: Lexend Deca;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    display: flex;
    align-items: center;
    justify-content: flex-end;`

const FooterApp = styled.footer
`   z-index: 1;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 80px;
    background-color: white;
    display: flex;
    display: flex;
    justify-content: space-between;`

const Habits = styled.div
`   color: #52B6FF;
    width: 100%;
    height: 100%;
    padding-left: 40px;
    font-family: Lexend Deca;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    display: flex;
    align-items: center;
    justify-content: flex-start;`

const ProgressBar = styled.div
`   z-index: 2;
    position: fixed;
    width: 30%;
    bottom: 10px;
    right: 35%;`

class AnimatedProgressProvider extends React.Component {
  interval = undefined;
  state = {isAnimated: false};
  static defaultProps = {valueStart: 0};

  Mounted() {
    if (this.props.repeat) {
        this.interval = window.setInterval(() => {this.setState({isAnimated: !this.state.isAnimated});}, 
        this.props.duration * 1000);} 
    else {this.setState({isAnimated: !this.state.isAnimated});}
  }

  Dismantled() {window.clearInterval(this.interval);}

  render() {
    return (
    <Animate
        start={() => ({value: this.props.valueStart})}
        update={() => ({value: [this.state.isAnimated ? this.props.valueEnd : this.props.valueStart], timing: {duration: this.props.duration * 1000, ease: this.props.easingFunction}})}>
        {({ value }) => this.props.children(value)}
    </Animate>);
    }
}

export default function Footer() {
    const { progress } = useContext(Progress);
    return (
        <>  <Link to="/Today">
                <ProgressBar>
                    <AnimatedProgressProvider valueStart={0} valueEnd={progress} duration={1.4} easingFunction={easeQuadInOut}>
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
                                })}/>
                            );}}
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
