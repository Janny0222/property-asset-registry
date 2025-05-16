'use client'

import React, { useEffect } from 'react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { useParams } from 'next/navigation'
import { useGovernmentPermitStore } from '@/stores/govenmentAgencyStore'
import { CommonButton } from '../ui/Forms/UserButton'
import { Select } from '../ui/Forms/UserInputs'
import { Option } from '@/types/propTypes'
import { useCompanyPlantStore } from '@/stores/companyPlantStore'

const RenewalHistoryComponent = () => {
    const { specificGovernmentAgency, fetchSpecificGovernmentAgency } = useGovernmentPermitStore()
    const { companyPlant, fetchAllCompanyPlant, specificCompanyPlant } = useCompanyPlantStore()
    const [companyPlantId, setCompanyPlantId] = React.useState<number>(0)

    const params = useParams()
    const companyList: Option[] = companyPlant.map((company) => ({
        value: company?.id!,
        title: company?.name!
    }))

    const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
            setCompanyPlantId(Number(e.target.value) );
        }
    
    useEffect(() => {
        fetchAllCompanyPlant()
        fetchSpecificGovernmentAgency(Number(params.name))
    }
    , [params.name, fetchSpecificGovernmentAgency, fetchAllCompanyPlant])
  return (
    <>
        <div className=' p-5 container mx-auto'>
            <div className='px-5 w-full'>
                <div className='text-md w-full flex justify-between'>
                    <div className='text-md flex gap-2  items-center'>
                        <div className=' text-gray-500'>
                            <span>Renewal History</span>
                        </div>
                            <MdOutlineKeyboardArrowRight className='w-6 h-6' />
                        <div className=' font-bold'>
                            <span>
                                {specificGovernmentAgency?.name!}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='w-40 flex-row flex items-center justify-between mt-5'>
                    <Select label={`Choose Planta ${typeof companyPlantId}` } name='company_plant' onChange={handleSelectChange} value={companyPlantId} selection_name={'All'} options={companyList} />
                </div>
            </div>
        </div>
    </>
  )
}

export default RenewalHistoryComponent