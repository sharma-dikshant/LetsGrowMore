// App.js
import { useState } from "react";
import * as math from "mathjs";

function App() {
  const [text, setText] = useState([]);
  const [result, setResult] = useState([]);

  const addToText = (val) => {
    // const validCharacters = /^[0-9+\-*/().\s]*$/;

    setText((text) => [...text, val]);
    // const expression = text.join("");

    // if (validCharacters.test(expression)) {
    //   setResult(math.evaluate(expression));
    // }
  };

  const onClear = () => {
    setResult([]);
    setText([]);
  };

  const onEqual = () => {
    const expression = text.join("");
    try {
      const evaluatedResult = math.evaluate(expression);
      setResult(evaluatedResult);
    } catch (error) {
      setResult("Invalid Expression");
    }
  };

  return (
    <div className="App">
      <div className="calc-wrapper">
        <Input text={text} result={result} />
        <div className="row">
          <Button symbol={"9"} handleClick={addToText} />
          <Button symbol={"8"} handleClick={addToText} />
          <Button symbol={"7"} handleClick={addToText} />
          <Button symbol={"/"} handleClick={addToText} />
        </div>
        <div className="row">
          <Button symbol={"6"} handleClick={addToText} />
          <Button symbol={"5"} handleClick={addToText} />
          <Button symbol={"4"} handleClick={addToText} />
          <Button symbol={"*"} handleClick={addToText} />
        </div>
        <div className="row">
          <Button symbol={"3"} handleClick={addToText} />
          <Button symbol={"2"} handleClick={addToText} />
          <Button symbol={"1"} handleClick={addToText} />
          <Button symbol={"+"} handleClick={addToText} />
        </div>
        <div className="row">
          <Button symbol={"0"} handleClick={addToText} />
          <Button symbol={"."} handleClick={addToText} />
          <Button symbol={"-"} handleClick={addToText} />
          <Button symbol={"="} handleClick={onEqual} />
        </div>
        <Button symbol={"clear"} handleClick={onClear} />
      </div>
    </div>
  );
}

function Button({ symbol, handleClick }) {
  return (
    <div className="button-wrapper" onClick={() => handleClick(symbol)}>
      <strong>{symbol}</strong>
    </div>
  );
}

function Input({ text, result }) {
  return (
    <div className="input-wrapper">
      <div className="result">{result}</div>
      <div className="text">{text}</div>
    </div>
  );
}

export default App;
