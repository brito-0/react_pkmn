import { useState, useRef } from "react";


function useFetch() 
{
    const [data, setData] = useState(null);
    const [dataAlt, setDataAlt] = useState(null);
    const fetchCache = useRef(new Map());

    const fixURL = (url, id, name) => 
    {
        const i = url.lastIndexOf('/');
        const newURLId = url.slice(0, i + 1) + id;
        const newURLName = url.slice(0, i + 1) + name;

        // console.log(url, newURLId, newURLName);

        return [newURLId, newURLName];
    };

    /**
     * 
     * @param {*} url 
     * @param {*} isList 
     * @returns 
     */
    function fetcher(url, isList = false)
    {
        if (!url) console.error('no url');
        setData(null);

        // console.log(url);
        if (url.at(-1) === '/') url = url.slice(0, -1);


        const cache = fetchCache.current;
        if (cache.has(url)) 
        {
            console.log('CACHE');
            setData(cache.get(url));
            return;
        }

        console.log('FETCH');

        try 
        {
            fetch(url).then((res) => 
            {
                if (!res.ok) 
                {
                    // console.log('failed', res.status, (typeof res.status));
                    // console.log('failed', (typeof res.status), (typeof res.status) === Number);

                    setData(res.status);
                    // console.log(data);
                    return null;
                }

                return res.json();
            }).then((res) => 
            {
                if (!res)
                {
                    // console.log(data);
                    return;
                }

                // figure out how to cache regardless of name or id search

                // console.log('succeeded', res.status, (typeof res.status));
                // console.log('succeeded');

                if (!isList)
                {
                    const [newURLId, newURLName] = fixURL(url, res?.id, res?.name);

                    cache.set(newURLId, res);
                    cache.set(newURLName, res);
                }
                else 
                {
                    cache.set(url, res);
                }


                setData(res);
            });
        }
        catch (e) 
        {
            throw new Error(e);
        }
    };

    function fetcherAlt(url)
    {
        setDataAlt(null);

        const cache = fetchCache.current;
        if (cache.has(url)) 
        {
            console.log('CACHE');
            setDataAlt(cache.get(url));
            return;
        }

        console.log('FETCH');

        try 
        {
            fetch(url).then((res) => 
            {
                if (!res.ok) 
                {
                    setDataAlt(res.status);
                    // console.log(data);
                    return null;
                }

                return res.json();
            }).then((res) => 
            {
                if (!res)
                {
                    // console.log(data);
                    return;
                }

                cache.set(url, res);

                setDataAlt(res);
            });
        }
        catch (e) 
        {
            throw new Error(e);
        }
    };

    return { data, fetcher, dataAlt, fetcherAlt };
}

export default useFetch;
