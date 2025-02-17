import { login } from "../../api.ts"

type AuthenticationFormProps = {
    handleLogin: (formData: FormData) => void;
}

export default function AuthenticationForm({ handleLogin } : AuthenticationFormProps) {
    return (
        <form action={handleLogin}>
            <input name="name" type="text" placeholder="Name" required></input>
            <input name="email" type="email" placeholder="Email" required></input>
            <button type="submit">Login</button>
        </form>
    )
}