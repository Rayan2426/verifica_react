import {useState} from 'react';

export default function LoginForm({setUser}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState(null);
    const [elaborando, setElaborando] = useState(false);

    async function login(){
        setElaborando(true);
        const risposta = await fetch(`http://localhost:8080/login`, 
            {  
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({username: username, password: password})
            }
        )

        const esito = await risposta.json();
        setToken(esito["token"]);
        console.log(esito["token"]);
        if(esito["token"] == null || esito["token"] == ""){
            setUser(null);
        } else{
            const richiestadati = await fetch(`http://localhost:8080/user/` + esito["token"], 
                {  
                method: "GET"
                }
            )
            const user = await richiestadati.json();
            console.log(user)
            setUser(user);
        }
        setElaborando(false);
    }

    function gestisciCambioUsername(e){
        setUsername(e.target.value);
    }

    function gestisciCambioPassword(e){
        setPassword(e.target.value);
    }

    function gestisciMessaggioErrore(){
        let str = "";
        if (token == null) {
            
        } else if(token == ""){
            str = "username o password errati";
        } else{
            str = "accesso conseguito con successo";
        }

        return str;
    }
    
    return(
        <div>
            <h1>Login</h1>
            {
                elaborando
                ?
                <div>
                    <div>Username: <input type="text" disabled/></div>
                    <div>Password: <input type="password" disabled/></div>
                </div>
                :
                <div>
                    <div>Username: <input type="text"  onChange={gestisciCambioUsername} required/></div>
                    <div>Password: <input type="password"  onChange={gestisciCambioPassword} required/></div>
                </div>
            }
            <div><button onClick={login}>Accedi</button></div>
            {
                <p>{gestisciMessaggioErrore()}</p>
            }
        </div>

    )
}