import { useContext } from "react";
import { BrowserContext } from "./BrowserRouter.jsx";

function Route({ children, path, regex }) 
{
    const { currURL } = useContext(BrowserContext);
    // console.log(currURL, path);

    // if (regex !== undefined) console.log(regex, currURL.pathname, regex?.test(currURL.pathname));

    // if (currURL.pathname.match(path))
    // if (currURL.pathname === path || regex?.test(currURL.pathname))

    // console.log(regex, currURL.pathname, regex?.test(currURL.pathname));
    let reg;
    if (regex !== undefined) reg = new RegExp(regex);
    if (currURL.pathname === path || reg?.test(currURL.pathname))
    {
        return (
            <>
                {children}
            </>
        );
    }
    else return null;
}

export default Route;
