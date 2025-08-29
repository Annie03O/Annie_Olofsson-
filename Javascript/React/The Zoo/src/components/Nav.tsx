import { NavLink } from "react-router";
import "../style/Nav.css"

export const Nav = () => {
    return (
        <ul className="nav">
            <li>
                <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
                <NavLink to={"/Zoo"}>Zoo</NavLink>
            </li>
            <li>
                <NavLink to={"/About"}>About</NavLink>
            </li>
            <li>
                <NavLink to={"/Contact"}>Contact</NavLink>
            </li>
        </ul>
    )
}