
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

const API = 'http://localhost:5000/api'

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const nav = useNavigate()
  console.log('user data',user)

  // CHECK WHETHER USER IS ALREADY LOGGED IN

  const checkAuth = async () => {

    try {

      const response = await fetch(`${API}/auth/me`, {
        method: 'GET',
        credentials: 'include'
      })

      const data = await response.json()

      if (response.ok) {
        console.log('data',data)
        localStorage.setItem('player',JSON.stringify(data.playerData))
        setUser(data.playerData)
      } else {
        setUser(null)
      }

    } catch (error) {

      console.log('Authentication Error:', error)
      setUser(null)

    } finally {

      setLoading(false)

    }

  }

  // SIGNUP

  const signup = async (formData) => {

    try {

      const response = await fetch(`${API}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed')
      }

      console.log('data',data)

      setUser(data.user)

      return data

    } catch (error) {

      throw error

    }

  }

  // LOGIN

  const login = async (formData) => {

    try {

      const response = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }
      console.log('login data',data)

      setUser(data.playerData)

      return data

    } catch (error) {

      throw error

    }

  }

  // LOGOUT

  const logout = async () => {

    try {

      const response = await fetch(`${API}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Logout failed')
      }

      setUser(null)
      localStorage.removeItem('player')
      nav('/')

      

    } catch (error) {

      throw error

    }

  }

  useEffect(()=>{
    checkAuth()
  },[])

  // CHECK LOGIN WHEN APP LOADS

 

  return (

    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        signup,
        login,
        logout,
        checkAuth
      }}
    >

      {children}

    </AuthContext.Provider>

  )

}


// CUSTOM HOOK

export function useAuth() {
  return useContext(AuthContext)
}
