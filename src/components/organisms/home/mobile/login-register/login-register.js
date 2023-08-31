import { loginRegister } from '../mobile-menu/utils/utils'

const LoginRegister = ({ setUserName, userName, isLoggedIn, setIsLoggedIn, openSnackbar, markedQuotes, setMarkedQuotes, password, setPassword, setIsFetching }) => {
    const capitalizedUserName = userName.charAt(0).toUpperCase() + userName.slice(1)

    return (
        <>
            {!isLoggedIn ? (
                <>
                    Username
                    <input type="text" className="userInput" onChange={(e) => setUserName(e.target.value)} value={userName} />
                    Password
                    <input type="password" className="userInput" onChange={(e) => setPassword(e.target.value)} value={password} />
                    <button className="menuBtn" onClick={() => loginRegister({ apiCallType: 'login', userName, password, setIsLoggedIn, openSnackbar, setIsFetching })}>
                        Login
                    </button>
                    <button className="menuBtn" onClick={() => loginRegister({ apiCallType: 'register', userName, password, setIsLoggedIn, openSnackbar, setIsFetching })}>
                        Register
                    </button>
                </>
            ) : (
                <>
                    <div className="userName">Hi {capitalizedUserName}!</div>
                    <button className="menuBtn" onClick={() => setIsLoggedIn(false)}>
                        Logout
                    </button>
                </>
            )}
        </>
    )
}

export default LoginRegister
