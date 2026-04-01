import GoogleLogin from '../components/Auth/GoogleLogin'
import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'
import styles from '../styles/Auth/Auth.module.css'
import { useState } from 'react'

interface AuthProps {}

const Auth = ({}: AuthProps) => {
    const [toggle, setToggle] = useState<boolean>(true)
  return (
    <div>
        <div className={styles.btnsList}>
            <button onClick={() => setToggle(prev => !prev)} className={`${styles.btnToggle} ${toggle ? styles.active : null}`}>Sign Up</button>
            <button onClick={() => setToggle(prev => !prev)} className={`${styles.btnToggle} ${toggle ? null : styles.active  } `}>Log In</button>
        </div>
        { toggle ? <Register /> : <Login />}

        <GoogleLogin />
    </div>
  )
}

export default Auth
