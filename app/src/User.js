import {useState} from 'react';

export default function User({id, username, token, email, reg_date}){
    
    return(
        <div>
            id: {id} <br/>
            username: {username} <br/>
            token: {token} <br/>
            email: {email} <br/>
            data di registrazione: {reg_date} <br/>
        </div>
    )
}