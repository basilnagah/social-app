import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { TokenContext } from '../../context/token.context'

export default function GuesRoute({children}) {

    const {token} = useContext(TokenContext)

    if(token){
       return <Navigate to={'/home'} />
    }else{
        return children
    }


}



