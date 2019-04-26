import {DISPLAY_QUOTE, IDisplayQuoteAction} from "../components/NewQuoteButton";
import {ISaveQuotesAction, SAVE_QUOTES} from "../components/QuoteCard";

export const randomQuotePicker = (quotes: IQuote[]) => {
    const min:number = 0;
    const max:number = quotes.length - 1;
    const index:number = Math.round(min + Math.random() * (max - min));

    return index;
}

export interface IQuote {
    quote: string,
    author: string,
}

export interface IQuotesState {
    quotes: IQuote[],
    fullQuote: null | IQuote,
}

const initialQuotesState:IQuotesState = {
    quotes: [],
    fullQuote: null
}

const quotesReducer = (state = initialQuotesState, action: IDisplayQuoteAction| ISaveQuotesAction) => {
    switch(action.type){
        case DISPLAY_QUOTE:
            return {...state, fullQuote: state.quotes[randomQuotePicker(state.quotes)]}//mesmo que Object.assign({}, state, {color: '#4D4516'})
        case SAVE_QUOTES:
            const collection = action.data.quotes;
            return {...state, quotes: collection, fullQuote: collection[randomQuotePicker(collection)]}
        default:
            return state;
    }

}

export default quotesReducer;