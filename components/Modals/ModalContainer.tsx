import {FC, useCallback} from 'react'
import {TModalId} from '../../providers/ModalProvider'
import {useModalManager} from '../../hooks/useModalManager'
import {Modal} from '@mui/material'
import {Box} from '@mui/system'

interface IProps {
    name: TModalId
}

export const ModalContainer: FC<IProps> = ({name, children}) => {

    const {currentModal, setCurrentModal} = useModalManager()

    const handleClose = useCallback(() => {
        setCurrentModal(null)
    }, [])

    return <Modal
        open={currentModal === name}
        onClose={handleClose}

    >
        <Box>
            {
                children
            }
        </Box>
    </Modal>
}
