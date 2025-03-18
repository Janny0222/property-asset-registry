'use client'
import { TableColumn } from '@/types/propTypes';
import React, {  useState } from 'react'
import { FaLocationDot } from 'react-icons/fa6';
import { HiWrenchScrewdriver } from 'react-icons/hi2';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { CommonButton } from '../ui/Forms/UserButton';
import Table from '../ui/CustomUI/Table';
import { FaEdit } from 'react-icons/fa';
import { useCompanyPlantStore } from '@/stores/companyPlantStore';
import AddCompanyPlantModal from '../Modals/CompanyPlant/AddCompanyPlant';

const CompanyPlantComponent = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const {  companyPlant } = useCompanyPlantStore();
    const tableHead: TableColumn[] = [
        { key: 'id', label: 'ID'},
        { key: 'name', label: 'Name'}
    ]

    const handleAddGovernmentPermit = () => {
        setModalOpen(true);
    }
    return (
    <>
    <AddCompanyPlantModal modalOpen={modalOpen} setModalOpen={() => setModalOpen(false)} />
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
                            <span>Company's Plant</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-start items-start p-5'>
                <div className='w-auto'>
                    <CommonButton type={'button'} onClick={() => handleAddGovernmentPermit()} name="Add Company Plant" />
                </div>
            </div>
            <div className='text-center w-fulls px-5'>
                <Table tableHead={tableHead} rowData={companyPlant} rowRender={(data, i) => (
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

export default CompanyPlantComponent