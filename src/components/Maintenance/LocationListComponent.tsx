'use client'
import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { CommonButton } from '@/components/ui/Forms/UserButton'
import { HiWrenchScrewdriver } from 'react-icons/hi2'
import { FaLocationDot } from "react-icons/fa6";
import Table from '@/components/ui/CustomUI/Table'
import { TableColumn } from '@/types/propTypes'
import AddLocationModal from '../Modals/LocationList/AddLocationModal'
import { useLocationStore } from '@/stores/locationStore'
import { FaEdit } from 'react-icons/fa'

const LocationListComponents = () => {
    const [formData, setFormData] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const { locations } = useLocationStore();
    const tableHead: TableColumn[] = [
        { key: 'id', label: 'ID'},
        { key: 'name', label: 'Name'},
        { key: 'Action', label: 'Action'},
    ]
const Text = 'text-sm text-center items-center justify-center whitespace-nowrap px-3 py-2';
    const handleAddLocation = () => {
        setModalOpen(true);
    }
    
    return (
    <>
    <AddLocationModal modalOpen={modalOpen} setModalOpen={() => setModalOpen(false)} />
        <div className='bg-gray-100 p-5'>
            <div className='p-5 w-full'>
                <div className='text-md'>
                    <div className='text-md flex gap-2  items-center'>
                        <div className='flex gap-1 text-gray-500'>
                            <HiWrenchScrewdriver className='w-5 h-5 ' />
                            <span>Maintenance</span>
                        </div>
                            <MdOutlineKeyboardArrowRight className='w-6 h-6' />
                        <div className='flex gap-1'>
                            <FaLocationDot className='w-5 h-5' />
                            <span>Location List</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-start items-start p-5'>
                <div className='w-auto'>
                    <CommonButton type={'button'} onClick={() => handleAddLocation()} name="Add Location" />
                </div>
            </div>
            <div className='text-center w-fulls px-5'>
                <Table tableHead={tableHead} rowData={locations} rowRender={(data, i) => (
                        <>
                            <td key={i} className={`${Text} truncate`}>{data?.id}</td>
                            <td className={`${Text}`}>{data.name}</td>
                            <td className={` ${Text} `}>
                                <div className='flex gap-2 justify-center items-center'>
                                    <button onClick={() => ({})} aria-label="Edit item" className=" bg-white border-2 border-black text-fontColor px-2 rounded py-1 flex-col flex justify-center items-center w-7 h-7">
                                            <FaEdit className="text-text" />
                                    </button>
                                    {/* <button onClick={() => handleDeleteData(data.id)} aria-label="Delete item" className="bg-white border-2 border-black text-white px-2 rounded py-1 flex-colo w-7 h-7">
                                        <MdDelete className="text-red-500" />
                                    </button> */}
                                </div>
                            </td>
                        </>
                    )}
                />
            </div>
        </div>
    </>
    )

}

export default LocationListComponents