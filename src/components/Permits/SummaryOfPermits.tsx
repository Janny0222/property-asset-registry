'use client'
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { GrFormView } from "react-icons/gr";
import Table from '../ui/CustomUI/Table'
import { Option, TableColumn } from '@/types/propTypes'
import { FilesProps, PermitProps } from '@/types/modelProps'
import { useCompanyPlantStore } from '@/stores/companyPlantStore'
import { useGovernmentPermitStore } from '@/stores/govenmentAgencyStore'
import { usePermitStore } from '@/stores/permitStore'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { useFileStore } from '@/stores/fileStore';
import { useRouter } from 'next/navigation';

const permitTableHead: TableColumn[] = [
    { key: 'company_plant', label: 'Company Plant' },
    { key: 'government_agency', label: 'Government Agency'},
    { key: 'permit_type', label: 'Type of Permit' },
    { key: 'frequency', label: 'Frequency'},
    { key: 'permit_no', label: 'Permit No.'},
    { key: 'permit_date', label: 'Permit Date'},
    { key: 'renewal', label: 'Renewal'},
    { key: 'file', label: 'PDF File'},
]
const Text = 'text-xs text-center items-center justify-center w-auto truncate  py-2';

const SummaryOfPermits = () => {
    const { companyPlant, fetchAllCompanyPlant } = useCompanyPlantStore()
    const { governmentAgency, fetchAllGovernmentAgency } = useGovernmentPermitStore()
    const { permit, fetchAllPermit } = usePermitStore()
    const { specificFile, fetchFilesByID } = useFileStore()
    const [file, setFile] = useState<FilesProps | null>(null)
    const [viewModal, setViewModal] = useState<boolean>(false)
    
    const companyList: Option[] = companyPlant.map((company) => ({
            value: company?.id!,
            title: company?.name!
    }))

    const router = useRouter()

    const governemntAgencyList: Option[] = governmentAgency.map((company) => ({
            value: company?.id!,
            title: company?.name!
    }))
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        
    }

    const handleViewPermit = async (id: number) => {
       await fetchFilesByID(id)
        
        setViewModal(true)
    }

    console.log(specificFile)
    useEffect(() => {
        fetchAllCompanyPlant()
        fetchAllGovernmentAgency()
        fetchAllPermit()
    }, [fetchAllCompanyPlant, fetchAllGovernmentAgency, fetchAllPermit])
    const rowRender = (data: PermitProps, i: number) => {
            return (
            <>
                <td className={`${Text} truncate `}>{ companyPlant.find((company) => company.id === data.company_plant)?.name }</td>
                <td className={`${Text} truncate `}>{ governmentAgency.find((governmentAgency) => governmentAgency.id === data.government_agency)?.name }</td>
                <td className={`${Text} `}>{data.permit_type}</td>
                <td className={`${Text} `}>{data.frequency}</td>
                <td className={`${Text} `}>{data.permit_no}</td>
                <td className={`${Text} `}>{data.permit_date}</td>
                <td className={`${Text} `}>{data.renewal}</td>
                    <td className={`${Text} flex gap-2`}>
                        {data.filename ? (
                            <span onClick={() => window.open(`/uploads/${data.filename}`, '_blank')} className=' text-green-800 underline cursor-pointer font-bold'>View file</span>
                        ) : <span>No uploaded file</span>}
                </td>
            </>
            )
        }
    return (
    <>     
        <div className='bg-gray-100  p-5'>
            <div className='px-5 container mx-auto w-full'>
                <div className='text-md w-full flex flex-col'>
                    <div className='text-md flex gap-2  items-center'>
                        <div className=' text-gray-500'>
                            <span>Permits</span>
                        </div>
                            <MdOutlineKeyboardArrowRight className='w-6 h-6' />
                        <div className=' font-bold'>
                            <span>
                                Summary
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='container p-5 mx-auto'>
            <div className=''>
                <Table tableHead={permitTableHead} rowData={permit} rowRender={rowRender} />
            </div>
        </div>
    </>
  )
}

export default SummaryOfPermits