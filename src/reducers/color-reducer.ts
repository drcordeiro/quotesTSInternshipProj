import {CHANGE_COLOR, IChangeColorAction} from "../components/NewQuoteButton";

const generateRandomColor = () => {
    const min:number = 0;
    const max:number = 220;
    const r:number = min + Math.random() * (max - min);
    const g:number = min + Math.random() * (max - min);
    const b:number = min + Math.random() * (max - min);
    return(
        `rgb(${r}, ${g}, ${b})`
    );
}

export interface IColorState {
    color: string;
}

const initialColorState: IColorState = {
    color: generateRandomColor(),
}

const colorReducer = (state=initialColorState, action: IChangeColorAction) => {
    switch (action.type) {
        case CHANGE_COLOR:
            return {...state, color: generateRandomColor()}
        default:
            return state;
    }
}

export default colorReducer;