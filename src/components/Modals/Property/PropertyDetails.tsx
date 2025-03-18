'use client'
import React, { useState } from 'react'
import MainModal from '../MainModal'
import { ModalProps } from '@/types/propTypes'
import { Input } from '@/components/ui/Forms/UserInputs'
import { CommonButton } from '@/components/ui/Forms/UserButton'
import { useMapStore } from '@/stores/mapStore'
import MapsComponent from '@/components/Maps/MapsComponent'
import MapComponent from '@/components/MapComponent'


const PropertyDetails = ({ id , modalOpen, setModalOpen} : ModalProps) => {
    const [mapsModal, setMapsModal] = useState<boolean>(false)
    const [files, setFiles] = useState<File[]>([])
    const { mapLocation} = useMapStore()

    const handleOpenMaps = () => {
        setMapsModal(true)
    }

    console.log(files)
    return (
    <>
            
        <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <div className='inline-block transitions mt-2 sm:w-4/5 shadow-xl rounded-sm md:w-3/5 lg:w-3/6 w-full p-5 transform h-full bg-white'>
                <div className='mb-5'>
                    <h1 className='text-3xl font-bold'>Property Details</h1>
                </div>
                <div className='grid grid-cols-6 bg-gray-100 p-2 gap-2 text-left'>
                    <div className='col-span-6'>
                        <h1 className='text-2xl font-bold'>Land</h1>
                        <div className='border bg-white p-2 rounded-sm grid-cols-6 grid gap-2'>                        
                            <div className='col-span-6 flex flex-row gap-2'>
                                <Input label='TCT No.' textColor='text-black' name={'tct_no'} type='text' />
                                <Input label='Upload File' multiple={true} name={'tct_file'} type='file' onChange={(e) => setFiles(Array.from(e.target.files || []))} />
                            </div>
                            
                            <div className='col-span-6 relative  flex flex-row gap-2'>
                                <Input label='Lot Area.' textColor='text-black' name={'lot_area'} type='text' />
                                <div className='relative w-full'>
                                    <Input label='Map Location' textColor='text-black' name={'map_location'} type='text' value={mapLocation || ''} />
                                    <CommonButton onClick={() => handleOpenMaps()} wFull={true} type={'button'} name='Pin in the Map' />
                                    
                                </div>
                                    <MapComponent mapHide={mapsModal} setMapHide={setMapsModal} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-6 bg-gray-100 p-2 gap-2 text-left mt-5'>
                    <div className='col-span-6'>
                        <h1 className='text-2xl font-bold'>Building</h1>
                        <div className='border bg-white  p-2 rounded-sm grid-cols-6 grid gap-2'>                        
                            <div className='col-span-6 flex flex-row gap-2'>
                                <Input label='Floor Area' textColor='text-black' name={'floor_area'} type='text' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-6 gap-2 bg-gray-100 p-2 text-left mt-5'>
                    <div className='col-span-6'>
                        <h1 className='text-2xl font-bold'>Machines</h1>
                        <div className='border bg-white p-2 rounded-sm grid-cols-6 grid gap-2'>                        
                            <div className='col-span-6 flex flex-row gap-2'>
                                    <Input label='Machine Type' textColor='text-black' name={'machine_type'} type='text' />
                                    <Input label='Upload Picture' name={'machine_picture'} type='file' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                
        </MainModal>
    </>
  )
}

export default PropertyDetails