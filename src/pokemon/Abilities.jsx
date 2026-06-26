import { useContext } from "react";
import { AltContext } from "../App";
import AbilitiesMovesTooltip from "./AbilitiesMovesTooltip.jsx";
import Failed from "../Failed";

function Abilities({ abilities }) 
{
    const { dataAlt, fetcherAlt } = useContext(AltContext);

    const handleFetch = (url) =>
    {
        // console.log(url);

        fetcherAlt(url);
    };

    const abilitiesComp = () => 
    {
        return abilities?.map((a) => 
        {
            const name = a.ability.name;

            const formattedData = () => 
            {
                if (!dataAlt) 
                {
                    return (
                        <>
                            <p>loading...</p>
                        </>
                    );
                }

                if ((typeof dataAlt) === 'number')
                {
                    return Failed();
                }

                const flavour_text = dataAlt?.flavor_text_entries.toReversed().find((f) =>
                    f.language.name === 'en')?.flavor_text;

                return (
                    <>
                        <b key={dataAlt?.name}>{dataAlt?.name}</b>
                        <div>
                            <p key='flavour_text'>{flavour_text}</p>
                        </div>
                    </>
                );
            };

            return (
                <div key={name}>
                    <AbilitiesMovesTooltip name={name} data={formattedData()}
                        url={a.ability.url} handleFetch={handleFetch} />
                </div>
            );
        });
    };

    return (
        <>
            {abilitiesComp()}
            {/* <p>{JSON.stringify(abilities, null, 2)}</p> */}
        </>
    );
}

export default Abilities;
