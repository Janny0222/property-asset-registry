'use client'
import React, { use, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { FaLocationDot } from 'react-icons/fa6'
import { MdModeEdit, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { BsCardChecklist } from 'react-icons/bs'
import { Select } from '../ui/Forms/UserInputs'
import { useCompanyPlantStore } from '@/stores/companyPlantStore'
import { Option, TableColumn } from '@/types/propTypes'
import { CommonButton } from '../ui/Forms/UserButton'
import { PermitProps } from '@/types/modelProps'
import AddPermitModal from '../Modals/Permits/AddPermitModal'
import { useGovernmentPermitStore } from '@/stores/govenmentAgencyStore'
import { FaTrash } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import Table from '../ui/CustomUI/Table'
import { usePermitStore } from '@/stores/permitStore'
import EditPermitModal from '../Modals/Permits/EditPermitModal'

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


const PermitsComponent = () => {
    const { companyPlant } = useCompanyPlantStore()
    const { specificGovernmentAgency, fetchSpecificGovernmentAgency } = useGovernmentPermitStore()
    const { fetchSpecificCompanyPlant } = useCompanyPlantStore()
    const { fetchPermitByID } = usePermitStore()
    const { permit, fetchAllPermitByGovernmentAgency} = usePermitStore()
    const [permitModal, setPermitModal] = useState<boolean>(false)
    const [editPermitModal, setEditPermitModal] = useState<boolean>(false)
    const [companyPlantId, setCompanyPlantId] = useState<number>(0)
    const params = useParams()
    const router = useRouter()
    const companyList: Option[] = companyPlant.map((company) => ({
        value: company?.id!,
        title: company?.name!
    }))

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

    const rowRender = (data: PermitProps, i: number) => {
        return (
        <>
            <td className={`${Text} truncate `}>{ companyPlant.find((company) => company.id === data.company_plant)?.name }</td>
            <td className={`${Text} `}>{data.permit_type}</td>
            <td className={`${Text} `}>{data.frequency}</td>
            <td className={`${Text} `}>{data.in_charge}</td>
            <td className={`${Text} `}>{data.contact_no}</td>
            <td className={`${Text} `}>{data.permit_no}</td>
            <td className={`${Text} `}>{data.permit_date}</td>
            <td className={`${Text} `}>{data.renewal}</td>
            <td className={`${Text} flex gap-2`}>
                <button type='button' onClick={() => handleEdit(data?.id!)} className='p-1 border rounded-sm text-green-800'><MdModeEdit /></button>
                <button className='p-1 border rounded-sm text-red-500'><FaTrash/></button>
            </td>
        </>
        )
    }
    return (
    <>  
        <EditPermitModal modalOpen={editPermitModal} setModalOpen={setEditPermitModal}/>
        <AddPermitModal modalOpen={permitModal} setModalOpen={setPermitModal} />
        <div className='bg-gray-100 p-5'>
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
                            <CommonButton type={'button'} onClick={handleAddPermitButton} name="Add Permit Data" />
                        </div>
                    </div>
                </div>
                <div className=''>
                    <CommonButton type={'button'} onClick={handleViewSummary} name="View Summary" />
                </div>
            </div>
        </div>
        <div className='px-5 mt-5 w-auto'>
            <Table tableHead={permitTableHead} rowData={permit} rowRender={rowRender} bgColor='bg-white' />
            {permit?.length === 0 &&
            <>
            <div className='flex justify-center items-center'><span>No record/s found</span></div>
            </>}
        </div>
    </>
  )
}

export default PermitsComponent