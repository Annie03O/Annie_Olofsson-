import { Nav } from "./Nav"
import "../style/Header.css"

export const Header = () => {
    return (
        <header className="font-serif">
            <div className="logo">The Zoo</div>
            <Nav/>
        </header>
    )
}