import { Nav } from "./Nav"
import "../style/Header.css"

export const Header = () => {
    return (
        // Header section with logo and navigation
        <header className="font-serif">
            <div className="logo">The Zoo</div>
            {/* Navbar is in seperate component */}
            <Nav/>
        </header>
    )
}