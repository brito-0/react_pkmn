import { useContext } from "react";
import { BrowserContext } from "./BrowserRouter.jsx";

const currHrefs = ['/', '/search', '/list', '/pokemon', '/pokemon/stats', '/pokemon/abilities', '/pokemon/moves', '/pokemon/sprites', '/pokemon/cries'];

function Link({ children, href, handleFetch, pURL }) 
{
    const { setCurrURL } = useContext(BrowserContext);

    const handleNavigation = () => 
    {
        if (currHrefs.includes(href))
        {
            handleFetch?.(pURL);

            window.history.pushState({}, '', href);
            setCurrURL(new URL(window.location.origin + href));
        }
        else 
        {
            window.history.pushState({}, '', '/404');
            setCurrURL(new URL(window.location.origin + '/404'));
        }
    };

    return (
        <a onClick={handleNavigation} style={{ cursor: 'pointer' }}>
            {children}
        </a>
    );
}

export default Link;
