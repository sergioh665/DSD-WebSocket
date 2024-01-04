import React, {useRef} from 'react';
import io from 'socket.io-client'
import { IoMdPersonAdd } from "react-icons/io";


export default function Join({setChatVisibility, setSocket}){

    const usernameRef = useRef()

    const getEnterKey = (e) => {
        if(e.key === 'Enter') 
            handleSubmit()
    }

    const handleSubmit = async () => {
        const username = usernameRef.current.value
        if(!username.trim()) return
        const socket = await io.connect('http://localhost:3001')
        socket.emit('set_username', username)
        setSocket(socket)
        setChatVisibility(true)
    }

    return(
        <div>         
            <h1>Entrar no WhatsApp 2.0</h1>
            <input type="text" ref={usernameRef} placeholder='Nome do usuário' onKeyDown={(e)=>getEnterKey(e)} />
            <button id='button' onClick={()=> handleSubmit()}>entrar <IoMdPersonAdd id='icon-entrar'/></button>
        </div>
    )
}
