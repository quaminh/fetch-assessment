import { login } from "../../api.ts"

export default function AuthenticationForm() {
    return (
        <form action={login}>
            <input name="name" type="text"></input>
            <input name="email" type="email"></input>
            <button type="submit">Login</button>
        </form>
    )
}