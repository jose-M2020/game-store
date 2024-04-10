import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {Image} from "primereact/image";
import {usePostMutation} from "../../hooks/usePostMutation.js";
import {GAME_ENDPOINTS} from "../../api/gameApi.js";
export const GameDetailsModal = ({gameData}) => {
    const [visible, setVisible] = useState(false);

    const handleDialog = () => setVisible(!visible);

    const formHeader = (
        <h4 className='my-0'>{gameData.nombre}</h4>
    );

    return (
        <>
            <Button
                icon="pi pi-eye"
                rounded text raised
                className='bg-cyan-500 text-white'
                tooltip='See details'
                tooltipOptions={{
                    position: 'top'
                }}
                onClick={handleDialog}
            />
            <Dialog
                header={formHeader}
                visible={visible}
                style={{width: '33vw'}}
                onHide={handleDialog}
                dismissableMask={true}
            >
                <div>
                    <Image
                        className='flex justify-content-center'
                        width='70%'
                        src='/images/swords.png'
                    />

                </div>
            </Dialog>
        </>
    )
}

GameDetailsModal.propTypes = {
    gameData: PropTypes.object.isRequired,
}