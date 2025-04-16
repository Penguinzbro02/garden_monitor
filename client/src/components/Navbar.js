import { Link } from 'react-router-dom';
export const Navbar = () => {
    return (
        <div> NAVBAR
            <Link to="/"> Home </Link>
            <Link to="/Login"> Login </Link>
            <Link to="/Log"> Log </Link>
            <Link to="/Calendar"> Calendar </Link>
            <Link to="/Weather"> Weather </Link>
        </div>
    );


}