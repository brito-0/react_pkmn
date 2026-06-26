// import { useState } from "react";
import Link from "./router/Link";
import './Navbar.css';

const nameCleanUp = (name) => 
{
    if (name.length === 1) return 'Home';

    const i = name.lastIndexOf('/') + 1;
    let newName = name.slice(i);

    return newName[0].toUpperCase() + newName.slice(1);
};

function NavBar({ paths }) 
{
    // const [state, setState] = useState(false);

    // const handleMouseEnter = () => setState(true);
    // const handleMouseLeave = () => setState(false);

    const navbarComponent = () => 
    {
        // if (!state) return null;

        return paths.map((path) => 
        {
            // let name = (path === '/') ? 'home' : path.slice(1);
            // name = name[0].toUpperCase() + name.slice(1);

            const name = nameCleanUp(path);

            return <Link key={path} href={path}>{name}</Link>;
        });
    };

    return (
        // <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div>
            {/* <h1>navbar</h1> */}
            {navbarComponent()}
        </div>
    );


    // return (
    //     // <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
    //     <nav>
    //         {/* <h1>navbar</h1> */}
    //         {navbarComponent()}
    //     </nav>
    // );
}

export default NavBar;
