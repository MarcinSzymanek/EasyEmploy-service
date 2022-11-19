import {useNavigate } from "react-router-dom";

import './App.css';

function App({component, title}) {
  const navigate = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
         <h1 onClick={() => navigate("/")}>
          EasyEmploy
          </h1>
      </header>
      <div className='App-content'>
        <div className='row-header'>
            <h2 style={{textAlign:'center'}}>{title}</h2>
        </div>
        <div className='row-entries'>
          {component}
        </div>
      </div>
    </div>
  );
}

export default App;
