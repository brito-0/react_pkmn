import { useContext } from "react";
import { AltContext } from "../App";
import AbilitiesMovesTooltip from "./AbilitiesMovesTooltip.jsx";
import Failed from "../Failed";
import './Moves.css';

function Moves({ moves }) 
{
    const { dataAlt, fetcherAlt } = useContext(AltContext);

    const handleFetch = (url) =>
    {
        // console.log(url);

        fetcherAlt(url);
    };

    const movesComp = () => 
    {
        return moves?.map((m) => 
        {
            const name = m.move.name;

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

                const type = dataAlt?.type?.name;
                const power = dataAlt?.power;
                const cost = dataAlt?.pp;
                const accuracy = dataAlt?.accuracy;
                const damage_class = dataAlt?.damage_class?.name;

                const flavour_text = dataAlt?.flavor_text_entries.toReversed().find((f) =>
                    f.language.name === 'en')?.flavor_text;

                // return (
                //     <>
                //         <p key={dataAlt?.name} id='name'>{dataAlt?.name}</p>
                //         {/* <p key='name'>{dataAlt?.name}</p> */}
                //         <div>
                //             <p key='type' id='type'>type: {type}</p>
                //             {/* {power ? <p key='power'>power: {power}</p> : null} */}
                //             <p key='power' id='power'>power: {power ?? '-'}</p>
                //             <p key='cost' id='cost'>cost: {cost}</p>
                //             {/* {accuracy ? <p key='accuracy'>accuracy: {accuracy}</p> : null} */}
                //             <p key='accuracy' id='accuracy'>accuracy: {accuracy ?? '-'}</p>
                //             <p key='damage_type' id='damage_type'>damage class: {damage_class}</p>
                //         </div>
                //         <div>
                //             <p key='flavour_text'>{flavour_text}</p>
                //         </div>
                //     </>
                // );

                // return (
                //     <>
                //         <div>
                //             <div id='info1'>
                //                 <b key={dataAlt?.name} id='name'>{dataAlt?.name}</b>
                //                 <p key='type' id='type'>type: {type}</p>
                //             </div>
                //             <div id='info2'>
                //                 <p key='damage_type' id='damage_type'>damage class: {damage_class}</p>
                //                 <p key='cost' id='cost'>cost: {cost}</p>
                //             </div>
                //             <div id='info3'>
                //                 <p key='power' id='power'>power: {power ?? '-'}</p>
                //                 <p key='accuracy' id='accuracy'>accuracy: {accuracy ?? '-'}</p>
                //             </div>
                //         </div>
                //         <div>
                //             <p key='flavour_text'>{flavour_text}</p>
                //         </div>
                //     </>
                // );

                return (
                    <>
                        <div>
                            <b key={dataAlt?.name} id='name'>{dataAlt?.name}</b>
                            <div id='info'>
                                <div id='info_names'>
                                    <p key='type' id='type'>type</p>
                                    <p key='damage_type' id='damage_type'>category</p>
                                    <p key='cost' id='cost'>cost</p>
                                    <p key='power' id='power'>power</p>
                                    <p key='accuracy' id='accuracy'>accuracy</p>
                                </div>
                                <div id='info_values'>
                                    <p key='type_value' id='type_value'>{type}</p>
                                    <p key='damage_type_value' id='damage_type_value'>{damage_class}</p>
                                    <p key='cost_value' id='cost_value'>{cost}</p>
                                    <p key='power_value' id='power_value'>{power ?? '-'}</p>
                                    <p key='accuracy_value' id='accuracy_value'>{accuracy ?? '-'}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p key='flavour_text'>{flavour_text}</p>
                        </div>
                    </>
                );
            };

            return (
                <div key={name}>
                    <AbilitiesMovesTooltip name={name} data={formattedData()}
                        url={m.move.url} handleFetch={handleFetch} />
                </div>
            );
        });
    };

    return (
        <>
            {movesComp()}
            {/* <p>{JSON.stringify(moves, null, 2)}</p> */}
        </>
    );
}

export default Moves;
