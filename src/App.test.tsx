import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import quotesReducer, {IQuote, randomQuotePicker} from "./reducers/quotes-reducer";
import {SAVE_QUOTES, saveQuotes} from "./components/QuoteCard";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

const dummyData = {
  "quotes": [
      {"quote":"Test1", "author":"Test1Author"},
    ]
}


const paramState = {
    quotes: [],
    fullQuote: null
}

const paramAction = saveQuotes(dummyData);

/*const paramAction = {
    type: SAVE_QUOTES,
    data: dummyData
}*/

  it('should handle SAVE_QUOTES', () => {
    expect(
        quotesReducer(paramState, paramAction)
  ).toEqual(
      {
        quotes: dummyData.quotes,
        fullQuote: dummyData.quotes[randomQuotePicker(dummyData.quotes)]
      }
    )

  })

