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
    
    return(
        <div>
            <h1>Login</h1>
            <div>Username: <input type="text"  onChange={gestisciCambioUsername} required/></div>
            <div>Password: <input type="password"  onChange={gestisciCambioPassword} required/></div>
            <div><button onClick={login}>Accedi</button></div>
            {
                token != "" &&
                <p>Accesso conseguito con successo</p>
            }
            {
                token == "" &&
                <p>Username o password sono errati</p>
            }
        </div>

    )
}