import React, { useState } from 'react'
import MainModal from '../MainModal'
import { ModalProps } from '@/types/propTypes'

const ViewFilesModal = ({modalOpen, setModalOpen, id}: ModalProps) => {
    return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div>

        </div>
    </MainModal>
  )
}

export default ViewFilesModal