import './Cards.css'

export function Cards({ name, cardNumber, monthVal, yearVal, cvcNumber }: any) {

    return (
        <div className="cardsContainer">
            <div className="cardsBg">
            </div>
            <div className="cards">
                <div className="cardFront">
                    <div className="dots">
                        <div className='dot'></div>
                        <div className='dot2'></div>
                    </div>
                    <p className='numberFront'>
                        {cardNumber}
                    </p>
                    <div className='nameDate'>
                        <p>{name}</p>
                        <p>{monthVal}/{yearVal}</p>
                    </div>
                </div>
                <div className="cardBack">
                    <p>{cvcNumber}</p>
                </div>
            </div>
        </div>
    )
}