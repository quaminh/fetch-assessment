import { login } from "../../api.ts"

export default function AuthenticationForm() {
    return (
        <form action={login}>
            <input name="name" type="text" placeholder="Name" required></input>
            <input name="email" type="email" placeholder="Email" required></input>
            <button type="submit">Login</button>
        </form>
    )
}