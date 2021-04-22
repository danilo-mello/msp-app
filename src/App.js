import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { auth } from './firebase/firebase'
import { selectUser, login, logout } from './features/userSlice'

import Login from './components/Login'
import Main from './components/Main'

const App = () => {

  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        }))
      } else {
        dispatch(logout())
      }
    })
  }, [dispatch])

  return (
    <>
    {
      user ? <Main /> : <Login />
    }
    </>
  )
}


export default App;
