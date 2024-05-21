import './App.css';
import Login from './Login'
import SignUp from './SignUp'
import {useState, useEffect} from 'react'

function App() {
  const [mostraSignUpForm, setMostraSignUpForm] = useState(false);
  const [mostraLoginForm, setMostraLoginForm] = useState(false);
  return (
    <div className="App">
      <button onClick={() => {setMostraSignUpForm(true); setMostraLoginForm(false)}}>Sign Up</button>
      {
        mostraSignUpForm
        ?
        <SignUp/>
        :
        ""
      }
      <hr/>
      <button onClick={() => {setMostraLoginForm(true); setMostraSignUpForm(false)}}>Login</button>
      {
        mostraLoginForm
        ?
        <Login/>
        :
        ""
      }
    </div>
  );
}

export default App;
