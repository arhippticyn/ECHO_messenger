import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'
import styles from '../styles/Auth/Auth.module.css'
import { useState } from 'react'

interface AuthProps {}

const Auth = ({}: AuthProps) => {
    const [toggle, setToggle] = useState(true)
  return (
    <div>
        <div className={styles.btnsList}>
            <button onClick={() => setToggle(prev => !prev)} className={`${styles.btnToggle} ${toggle ? styles.active : null}`}>Sign Up</button>
            <button onClick={() => setToggle(prev => !prev)} className={`${styles.btnToggle} ${toggle ? null : styles.active  } `}>Log In</button>
        </div>
        { toggle ? <Register /> : <Login />}
    </div>
  )
}

export default Auth
