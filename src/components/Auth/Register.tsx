import { useForm } from "react-hook-form"
import { useTypificatedDispatch } from "../../hooks/reduxHooks"
import { RegisterUser, type RegisterUserType } from "../../redux/Auth/AuthOperation"
import styles from '../../styles/Auth/Auth.module.css'

interface RegisterProps {
    
}



const Register = ({}: RegisterProps) => {
    const dispatch = useTypificatedDispatch()

    const {register, handleSubmit} = useForm<RegisterUserType>({
        defaultValues: {username: '', email: '', password: ''},
        mode:'onSubmit'
    })

    const onSubmit = (data: RegisterUserType) => {
        dispatch(RegisterUser(data))
    }
    return (
        <div className={styles.register}>
            <h2 className={styles.registerTitle}>Sign Up</h2>
            <form className={styles.Form} action="" onSubmit={handleSubmit(onSubmit)}>
                <label className={styles.label} htmlFor="">Enter username</label>
                <input {...register('username')} className={styles.input} type="text" />
                <label className={styles.label} htmlFor="">Enter email</label>
                <input {...register('email')} className={styles.input} type="email"/>
                <label className={styles.label} htmlFor="">Enter password</label>
                <input {...register('password')} className={styles.input} type="password"  />

                <button className={styles.btnS} type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default Register 