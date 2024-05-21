import {useState} from 'react';

export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [esito, setEsito] = useState("none");
    const [elaborando, setElaborando] = useState(false);

    async function registra(){
        setElaborando(true);
        const risposta = await fetch(`http://localhost:8080/signup`, 
            {  
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({username: username, password: password})
            }
        )
        const esito = await risposta.json();
        setEsito(esito["token"]);
        setElaborando(false);
    }

    function gestisciCambioEmail(e){
        setEmail(e.target.value);
    }
    function gestisciCambioUsername(e){
        setUsername(e.target.value);
    }
    function gestisciCambioPassword(e){
        setPassword(e.target.value);
    }
    
    return(
        <div>
            <div>Username: <input type="text"  onChange={gestisciCambioUsername} required/></div>
            <div>Password: <input type="password"  onChange={gestisciCambioPassword} required/></div>
            <div><button onClick={registra}>Registrati</button></div>
            {
                esito == true &&
                <p>Registrazione avvenuta con successo</p>
            }
            {
                esito == false &&
                <p>Email o username già esistenti</p>
            }
        </div>

    )
}