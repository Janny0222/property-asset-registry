'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import {  MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { useCompanyPlantStore } from '@/stores/companyPlantStore'
import { TableColumn } from '@/types/propTypes'
import { CommonButton } from '../ui/Forms/UserButton'
import { PermitProps } from '@/types/modelProps'
import AddPermitModal from '../Modals/Permits/AddPermitModal'
import { useGovernmentPermitStore } from '@/stores/govenmentAgencyStore'
import { useRouter } from 'next/navigation'
import Table from '../ui/CustomUI/Table'
import { usePermitStore } from '@/stores/permitStore'
import EditPermitModal from '../Modals/Permits/EditPermitModal'
import RenewalHistoryModal from '../Modals/Permits/RenewalHistoryModal'

const permitTableHead: TableColumn[] = [
  { key: 'company_plant', label: 'Company Plant' },
  { key: 'permit_type', label: 'Type of Permit' },
  { key: 'frequency', label: 'Frequency'},
  { key: 'in_charge', label: 'In-Charge'},
  { key: 'contact_no', label: 'Contact No.'},
  { key: 'permit_no', label: 'Permit No.'},
  { key: 'permit_date', label: 'Permit Date'},
  { key: 'renewal', label: 'Renewal'},
  { key: 'action', label: 'Actions'},
]
const Text = 'text-xs text-center items-center justify-center w-auto truncate  py-2';
let forRenewal: boolean;

const PermitsComponent = () => {
    const { companyPlant } = useCompanyPlantStore()
    const { specificGovernmentAgency, fetchSpecificGovernmentAgency } = useGovernmentPermitStore()
    const { fetchSpecificCompanyPlant } = useCompanyPlantStore()
    const { fetchPermitByID } = usePermitStore()
    const { permit, fetchAllPermitByGovernmentAgency} = usePermitStore()
    const [permitModal, setPermitModal] = useState<boolean>(false)
    const [permitHistoryId, setPermitHitoryId] = useState<number>(0)
    const [editPermitModal, setEditPermitModal] = useState<boolean>(false)
    const [renewalHistoryModal, setRenewalHistoryModal] = useState<boolean>(false)
    const [companyPlantId, setCompanyPlantId] = useState<number>(0)

    const params = useParams()
    const router = useRouter()

    const handleAddPermitButton = () => {
        setPermitModal(true)
    }

    const handleViewSummary = () => {
        router.push('/summary')
    }

    const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCompanyPlantId(Number(e.target.value) );
    }

    useEffect(() => {
        if (companyPlantId > 0) {
            fetchSpecificCompanyPlant(companyPlantId)
        }

        fetchAllPermitByGovernmentAgency(params.name?.toString()!)
        
        fetchSpecificGovernmentAgency(Number(params.name))
    }, [fetchSpecificGovernmentAgency, fetchSpecificCompanyPlant, companyPlantId, fetchAllPermitByGovernmentAgency])

    const handleEdit = (id: number) => {
        fetchPermitByID(id)
        setEditPermitModal(true)
    }

    const handleRenewHistory = (id: number) => {
        setPermitHitoryId(id)
        setRenewalHistoryModal(true)
    }

    const handleRenew = (id: number) => {
        fetchPermitByID(id)
        router.push(`/permits/${params.name}/renew/${id}`);
    }

    const getRowColor = (data: PermitProps) => {
        const today = new Date();
        const sixMonthsFromNow = new Date();
        sixMonthsFromNow.setMonth(today.getMonth() + 6);

        const renewalDate = new Date(data?.renewal!);
        if (data?.renewal && renewalDate < today) {
            return 'bg-red-400';  // expired = red
        }

        if (data?.renewal && renewalDate <= sixMonthsFromNow) {
            return 'bg-yellow-300';  // within 6 months = yellow
        }

            return '';
    }

    const rowRender = (data: PermitProps, i: number) => {
        const permitDate = new Date(data?.permit_date!).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });

        const renewalDate = new Date(data?.renewal!).toLocaleDateString('en-US', {
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        const today = new Date();
        const sixMonthsFromNow = new Date();
        const renewal = new Date(data?.renewal!);
        sixMonthsFromNow.setMonth(today.getMonth() + 6);

        return (
        <>
            <td className={`${Text} truncate `}>{ companyPlant.find((company) => company.id === data.company_plant)?.name }</td>
            <td className={`${Text} `}>{data.permit_type}</td>
            <td className={`${Text} `}>{data.frequency}</td>
            <td className={`${Text} `}>{data.in_charge}</td>
            <td className={`${Text} `}>{data.contact_no}</td>
            <td className={`${Text} `}>{data.permit_no}</td>
            <td className={`${Text} `}>{permitDate}</td>
            <td className={`${Text} `}>{renewalDate}</td>
            <td className={`${Text} flex gap-2`}>
                {sixMonthsFromNow < renewal ? (
                    <>
                    <button type='button' onClick={() => handleEdit(data?.id!)} className='p-1 rounded-sm border text-black font-bold'>Edit</button>
                    <button type='button' onClick={() => handleRenewHistory(data?.id!)} className='p-1 rounded-sm border text-black font-bold'>Renew History</button>
                    </>
                ) : (
                    <button type='button' onClick={() => handleRenew(data?.id!)} className='p-1 border border-black rounded-lg  text-black font-bold'>Renew</button>
                )}
            </td>
        </>
        )
    }
    return (
    <>  
        <RenewalHistoryModal modalOpen={renewalHistoryModal} setModalOpen={setRenewalHistoryModal} id={permitHistoryId} />
        <EditPermitModal modalOpen={editPermitModal} setModalOpen={setEditPermitModal}/>
        <AddPermitModal modalOpen={permitModal} setModalOpen={setPermitModal} />
        <div className=' p-5 container mx-auto'>
            <div className='px-5 w-full'>
                <div className='text-md w-full flex justify-between'>
                    <div className='text-md flex gap-2  items-center'>
                        <div className=' text-gray-500'>
                            <span>Permits</span>
                        </div>
                            <MdOutlineKeyboardArrowRight className='w-6 h-6' />
                        <div className=' font-bold'>
                            <span>
                                {specificGovernmentAgency?.name!}
                            </span>
                        </div>
                    </div>
                    <div className='flex w-auto gap-2 justify-end items-center'>
                        <div className=''>
                            <CommonButton type={'button'} onClick={handleAddPermitButton} name="New Application" />
                        </div>
                    </div>
                </div>
                <div className=''>
                    <CommonButton type={'button'} onClick={handleViewSummary} name="View Summary" />
                </div>
            </div>
        </div>
        <div className='bg-gray-100  p-5 mt-5 container mx-auto'>
            <ol className='text-xs gap-1 my-1'>
                <li>
                    <div className='flex gap-1'>
                        <div className='px-[2px] border border-black bg-white w-4'>
                        </div>
                        <div>
                            <span className=''>- Updated</span>
                        </div>
                    </div>
                </li>
                <li>
                    <div className='flex gap-1'>
                        <div className='px-[2px] border border-black bg-yellow-500 w-4'>
                        </div>
                        <div>
                            <span className=''>- For Renewal</span>
                        </div>
                    </div>
                </li>
                <li>
                    <div className='flex gap-1'>
                        <div className='px-[2px] border border-black bg-red-500 w-4'>
                        </div>
                        <div>
                            <span className=''>- Expired</span>
                        </div>
                    </div>
                </li>
            </ol>
            <Table getRowColor={getRowColor} tableHead={permitTableHead} rowData={permit} rowRender={rowRender} bgColor='bg-white' />
            {permit?.length === 0 &&
            <>
            <div className='flex justify-center items-center'><span>No record/s found</span></div>
            </>}
        </div>
    </>
  )
}

export default PermitsComponent