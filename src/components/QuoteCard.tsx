import ButtonContainer from './NewQuoteButton';
import QuoteText from './QuoteText';
import Author from './Author';
import React, {Component} from "react";
import {connect} from "react-redux";
import styled, {css} from "styled-components";
import '../QuoteCard.css';
import {Dispatch} from "redux";
import {GlobalState} from "../index";
import {IQuote} from "../reducers/quotes-reducer";

const Card = styled.div`

    display:flex;
    flex-direction:column;
    align-items:flex-end;
    ${props => props.color && css`
        color: ${props.color};
        border-radius: 5px; 
        border: 2px ${props.color};
    `}
    
    background: white;
    margin: 0.5em 1em;
    padding: 2em 3em;
    width: 450px;
    
`

const Background = styled.div`
    display: flex;
    justify-content: center;
    ${props => props.color && css`
        background-image: linear-gradient(${props.color}, goldenrod);
    `}
    height: 100vh;
    align-items:center;
     transition: background-image 1000ms
`

interface IQuoteCardProps{
    color: string,
    fullQuote: null | IQuote,
    saveData: (data: {quotes: IQuote[]}) => void,

}


class QuoteCard extends Component<IQuoteCardProps>{

    componentDidMount() {
        setTimeout(()=>{
            fetch(
                'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
                .then(response => response.json())
                .then(data => this.props.saveData(data));
        }, 2000);
    }

    render(){
        return(
            <Background color={this.props.color}>{
                (this.props.fullQuote == null) ? (
                    <div className="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                ):(
                    <Card color={this.props.color}>
                        <QuoteText sentence={this.props.fullQuote.quote}/>
                        <Author authorName ={this.props.fullQuote.author}/>
                        <ButtonContainer/>
                    </Card>
                )
            }
            </Background>
        );
    }
}

export const SAVE_QUOTES = 'SAVE_QUOTES';

export interface ISaveQuotesAction{
        type: string,
        data: {quotes: IQuote[]},
}



export const saveQuotes = (data: {quotes: IQuote[]}) =>{

    const result = {
        type: SAVE_QUOTES,
        data
    };

   //const resultCast: ISaveQuotesAction = result as ISaveQuotesAction;

    return result;
}

const mapStateToProps = (_store: GlobalState) => {

    return{
        color: _store.color.color,
        quotes: _store.quotes.quotes,
        fullQuote: _store.quotes.fullQuote
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    debugger;
    return{
        saveData: (data: {quotes: IQuote[]}) => {
            dispatch(saveQuotes(data));
        }
    }
}

export const QuoteContainer = connect(mapStateToProps, mapDispatchToProps)(QuoteCard);