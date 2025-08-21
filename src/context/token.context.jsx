import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


export const TokenContext = createContext(null)



export default function TokenProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token')) //asdasdasdasdasd
  const [userId , setUserId] = useState('')

  function logout() {
    setToken(null)
    localStorage.removeItem('token')
  }


  useEffect(() => {

    if (token) {
      const {user} = jwtDecode(token)
      setUserId(user)
      
    }

  }, [token])




  return <TokenContext.Provider value={{ token, setToken, logout , userId }} >
    {children}
  </TokenContext.Provider>
}