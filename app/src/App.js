import './App.css';
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import User from './User'
import {useState, useEffect} from 'react'

function App() {
  const [mostraSignUpForm, setMostraSignUpForm] = useState(false);
  const [mostraLoginForm, setMostraLoginForm] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <button onClick={() => {setMostraSignUpForm(true); setMostraLoginForm(false); setUser(null)}}>Sign Up</button>
      {
        mostraSignUpForm
        ?
        <SignUpForm/>
        :
        ""
      }
      <hr/>
      <button onClick={() => {setMostraLoginForm(true); setMostraSignUpForm(false)}}>Login</button>
      {
        mostraLoginForm
        ?
        <LoginForm setUser={setUser}/>
        :
        ""
      }
      <hr/>
      {
        user != null &&
        <div>
          <User id={user.id} username={user.username} token={user.token} email={user.email} reg_date={user.reg_date}/>
        </div>
      }
    </div>
  );
}

export default App;
