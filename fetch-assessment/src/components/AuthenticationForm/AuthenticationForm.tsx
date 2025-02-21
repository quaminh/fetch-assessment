import "./AuthenticationForm.css"

type AuthenticationFormProps = {
    handleLogin: (formData: FormData) => void;
}

export default function AuthenticationForm({ handleLogin } : AuthenticationFormProps) {
    return (
        <form className="flex-col authForm" action={handleLogin}>
            <div className="flex-col">
                <label htmlFor="name">Enter your name:</label>
                <input id="name" className="authInput" name="name" type="text" placeholder="Name" required />
            </div>

            <div className="flex-col">
                <label htmlFor="email">Enter your email:</label>
                <input id="email" className="authInput" name="email" type="email" placeholder="Email" required />
            </div>
            <button className="loginBtn" type="submit">LOGIN</button>
        </form>
    )
}