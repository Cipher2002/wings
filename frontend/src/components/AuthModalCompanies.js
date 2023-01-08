import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const AuthModalCompanies = ({ setShowModal,  isSignUp }) => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    const [ cookies, setCookie, removeCookie] = useCookies(null)

    let navigate = useNavigate()

    console.log(email, password, confirmPassword)

    const handleClickCompanies = () => {
        setShowModal(false)
    }

    const handleSubmitCompanies = async (e) => {
        e.preventDefault()
 
        try {
            if (isSignUp && (password !== confirmPassword)) {
                setError('Passwords need to match!')
                return
            }

            const response = await axios.post(`http://localhost:8000/${isSignUp ? 'signup' : 'login'}`, { email, password })

            setCookie('AuthTokenCompany', response.data.token)
            setCookie('CompanyID', response.data.userId)

            const success = response.status === 201
            if (success && isSignUp) navigate ('/onboarding-companies')
            if (success && !isSignUp) navigate ('/dashboard')

            window.location.reload()

        } catch (error) {
            console.log(error)
        }
    }

        return (
            <div className="auth-modal">
                <div className="close-icon" onClick={handleClickCompanies}>ⓧ</div>
    
                <h2>{isSignUp ? 'CREATE ACCOUNT': 'LOG IN'}</h2>
                <p>By clicking Log In, you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
                <form onSubmit={handleSubmitCompanies}>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="email"
                        required={true}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="password"
                        required={true}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {isSignUp && <input
                        type="password"
                        id="password-check"
                        name="password-check"
                        placeholder="confirm password"
                        required={true}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />}
                    <input className="secondary-button" type="submit" value="Submit"/>
                    <p>{error}</p>
                </form>
            </div>
        )
}
export default AuthModalCompanies