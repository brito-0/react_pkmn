import './tooltip.css';

function AbilitiesMovesTooltip({ name, data, url, handleFetch }) 
{

    // return <p key={name}>{name}</p>;

    const handleMouseEnter = () => handleFetch(url);

    return (
        <div className='tooltip' key={name} onMouseEnter={handleMouseEnter}>
            {name}
            <span className='tooltiptext'>
                {data}
            </span>
        </div>
    );
}

export default AbilitiesMovesTooltip;
