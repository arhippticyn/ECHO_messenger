import styles from '../../styles/Auth/Auth.module.css'
import { FaGoogle } from "react-icons/fa"

interface GoogleLoginProps {
    
}

const GoogleLogin = ({}: GoogleLoginProps) => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', }}>
            <button className={styles.GoogleBtn} onClick={() => window.location.href = 'https://echo-bj2n.onrender.com/auth/google'}>Log In with Google <FaGoogle /></button>
        </div>
    )
}

export default GoogleLogin