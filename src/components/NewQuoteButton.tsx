import React, { Component } from "react";
import {connect} from "react-redux";
import styled, { css } from "styled-components";
import {Dispatch} from "redux";
import {GlobalState} from "../index";

const Button = styled.button`
    ${props => props.color && css`
        background: ${props.color};
        border-radius: 3px; 
        border: none;
    `}
    
    color: white;
    margin: 30px 0px 0px;
    padding: 8px 18px;
    font-family: 'Raleway', sans-serif;
    font-size: 0.85em;
    width: 110px;
    height: 38px;
`

class NewQuoteButton extends Component<INewQuoteButtonProps >{
    handleNewQuoteRequest = () =>{
        this.props.changeColour();
        this.props.showQuote();
    }

    render(){
        return(
            <Button color={this.props.color} onClick={this.handleNewQuoteRequest}>New quote</Button>
        );
    }
}

interface INewQuoteButtonProps{
    color: string,
    changeColour: () => void,
    showQuote: () => void
}

export const CHANGE_COLOR:string = 'CHANGE_COLOR'; //ok
export const DISPLAY_QUOTE = 'DISPLAY_QUOTE'; //ok



export interface IChangeColorAction{
    type: typeof CHANGE_COLOR
}

const changeColor = () => {
    return {
        type: CHANGE_COLOR,
    }
}

export interface IDisplayQuoteAction{
    type: typeof DISPLAY_QUOTE,
}

const displayQuote = () => {
    return {
        type: DISPLAY_QUOTE,
    }
}

//export type ChatActionTypes = IChangeColorAction | IDisplayQuoteAction seria uma opção se CHANGE_COLOR E DISPLAY_QUOTE fosse handled no mesmo reducer, o que não é o caso

const mapStateToProps = (_store: GlobalState) => {
    return {
        color: _store.color.color,
    }

}

const mapDispatchToProps = (dispatch: Dispatch) => {

    return{
        changeColour: () => {
            dispatch(changeColor());
        },

        showQuote: () => {
            dispatch(displayQuote());
        }
    }
}

const ButtonContainer = connect(mapStateToProps, mapDispatchToProps)(NewQuoteButton);
export default ButtonContainer;