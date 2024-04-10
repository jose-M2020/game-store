import PropTypes from "prop-types";
import {GameDetailsModal} from "./GameDetailsModal.jsx";
import {Button} from "primereact/button";
import {Image} from "primereact/image";
import {useCartContext} from "../../context/CartContext.jsx";

export const GameCard = ({gameData}) => {
    const {addItemToCart} = useCartContext();

    return (
        <div className="card game-card">
            <div className="border-round border-1 surface-border p-4 surface-card">
                <Image
                    className='flex justify-content-center'
                    width='70%'
                    src='/images/swords.png'
                />
                <h4 className='text-lg text-center text-cyan-800'>{gameData.nombre}</h4>
                <div className='flex align-items-center justify-content-center gap-3'>
                    {/*<Button*/}
                    {/*    icon="pi pi-shopping-cart"*/}
                    {/*    className='bg-cyan-500 text-white'*/}
                    {/*    rounded text raised*/}
                    {/*    tooltip='Add to cart'*/}
                    {/*    tooltipOptions={{*/}
                    {/*        position: 'top'*/}
                    {/*    }}*/}
                    {/*    onClick={() => addItemToCart(gameData)}*/}
                    {/*/>*/}
                    <GameDetailsModal gameData={gameData} />
                </div>
            </div>
        </div>
    )
}

GameCard.propTypes = {
    gameData: PropTypes.object.isRequired,
}