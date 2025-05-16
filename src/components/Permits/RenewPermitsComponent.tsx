'use client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { useGovernmentPermitStore } from '@/stores/govenmentAgencyStore'
import { usePermitStore } from '@/stores/permitStore'
import { useCompanyPlantStore } from '@/stores/companyPlantStore'
import { Input, InputDate, Select, TextArea } from '../ui/Forms/UserInputs'
import { PermitHistoryProps, PermitProps } from '@/types/modelProps'
import { Option } from '@/types/propTypes'
import { useFrequencyStore } from '@/stores/frequencyStore'
import { createPermitHistory } from '@/services/permitHistoryServices'
import { updatePermitByID } from '@/services/permitServices'


const RenewPermitsComponent = () => {
    const { specificGovernmentAgency, fetchSpecificGovernmentAgency } = useGovernmentPermitStore()
    const { specificPermit, fetchPermitByID } = usePermitStore()
    const { specificCompanyPlant, fetchSpecificCompanyPlant } = useCompanyPlantStore()

    const { frequency, fetchAllFrequency, fetchSpecificFrequency, specificFrequency } = useFrequencyStore()
    const [renewHistory, setRenewHistory] = useState<PermitHistoryProps>({})
    const [frequencyId, setFrequencyId] = useState<number>(0)
    const [formData, setFormData] = useState<PermitProps>({})
    const params = useParams()
    const router = useRouter()

    const frequencyList: Option[] = frequency.map((frequency) => ({
            value: frequency?.id!,
            title: frequency?.name_of_frequency!
        }))
    
    const calculateRenewalDate = (permitDate: string, rangeMonths: number) => {
        const date = new Date(permitDate);
        date.setMonth(date.getMonth() + rangeMonths); 
        return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    };

    useEffect(() => {
            if(formData?.permit_date && specificFrequency?.range_in_months) {
                const newRenewalDate = calculateRenewalDate(formData.permit_date, specificFrequency.range_in_months)
                setFormData((prev) => (
                    { ...prev, 
                        renewal: newRenewalDate,
                    }));
            } 
        }, [formData.permit_date, specificFrequency?.range_in_months])

    useEffect(() => {
        if (frequencyId) {
            fetchSpecificFrequency(frequencyId)
        }
    }
    , [frequencyId, fetchSpecificFrequency])
    useEffect(() => {
        if (specificPermit?.company_plant) {
            fetchSpecificCompanyPlant(specificPermit?.company_plant)
        }
    }, [specificPermit?.company_plant, fetchSpecificCompanyPlant])
    useEffect(() => {
        fetchPermitByID(Number(params.id))
        fetchAllFrequency()
        fetchSpecificGovernmentAgency(Number(params.name))
        if(specificPermit) {
            setRenewHistory(specificPermit)
            setFormData({
                company_plant: specificPermit?.company_plant,
                government_agency: specificPermit?.government_agency,
                permit_type: specificPermit?.permit_type,
                requirement: specificPermit?.requirement,
                in_charge: specificPermit?.in_charge,
                contact_no: specificPermit?.contact_no,
                permit_date: '',
                frequency: '',
                renewal: '',
                permit_no: specificPermit?.permit_no,
                permit_conditions: specificPermit?.permit_conditions,
                recomendation: specificPermit?.recomendation,
                filename: specificPermit?.filename || '',
            })
        }
        
    }, [params.name, params.id, specificPermit?.company_plant, fetchAllFrequency, fetchSpecificCompanyPlant, fetchPermitByID, fetchSpecificGovernmentAgency])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const updatedFormData = { 
            ...formData,
            [name]: value,
            company_plant: specificPermit?.company_plant,
            government_agency: specificPermit?.government_agency,
            recommendation: specificPermit?.recomendation,
            filename: specificPermit?.filename || '',
            permit_conditions: specificPermit?.permit_conditions,
        };

        // If permit_date or frequency changes, recalculate renewal
        if (name === 'frequency') {
            formData.frequency = value
            setFrequencyId(Number(value))
        }
        setFormData(updatedFormData);
    };
    
    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const newFormData = {
                ...renewHistory,
                permit_id: specificPermit?.id,
                renewal: formData?.permit_date,
                filename: formData?.filename || '',
            }
            const saveHistory = await createPermitHistory(newFormData)

            const updatePermit = await updatePermitByID(renewHistory?.id!, formData)
            setFormData({})
            setRenewHistory({})
            setFrequencyId(0)
            router.push(`/permits/${specificPermit?.government_agency}`)
            
            

        } catch (error) {
            console.error("Unable to create Permit History Data", error)
        }
    }

    console.log('formData', formData)
  return (
      <>
            <div className='bg-gray-100 p-5'>
                <div className='px-5 container mx-auto w-full'>
                    <div className='text-md w-full flex justify-between'>
                        <div className='text-md flex gap-2  items-center'>
                            <div className=' text-gray-500'>
                                <span>Permits</span>
                            </div>
                                <MdOutlineKeyboardArrowRight className='w-6 h-6' />
                            <div className=' text-gray-500'>
                                <span>
                                    {specificGovernmentAgency?.name!}
                                </span>
                                </div>
                                    <MdOutlineKeyboardArrowRight className='w-6 h-6' />
                            <div >
                                <span className=' font-bold' >
                                    Renew
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-gray-100 p-5 mt-2'>
                <div className='border mt-5 container mx-auto p-5 '>
                    <div className='grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-left'>
                        <div className='sm:col-span-2 md-col-span-4 col-span-4 text-black border-black border border-t-0 p-2 rounded-sm'>
                            <span className='font-bold'>Company Plant</span>
                            <p className='text-sm'>{specificCompanyPlant?.name}</p>
                        </div>
                        <div className='sm:col-span-2 md-col-span-4 col-span-4 text-black border-black border border-t-0 p-2 rounded-sm'>
                            <span className='font-bold'>Permit Type</span>
                            <p className='text-sm'>{specificPermit?.permit_type}</p>
                        </div>
                        <div className='sm:col-span-2 md-col-span-4 col-span-4 text-black border-black border border-t-0 p-2 rounded-sm'>
                            <span className='font-bold'>Permit No.</span>
                            <Input name='permit_no' value={specificPermit?.permit_no || ''} placeholder="Permit No." type="text"  onChange={handleChange} />
                        </div>
                        <div className='sm:col-span-2 md-col-span-4 col-span-4 text-black border-black border border-t-0 p-2 rounded-sm'>
                            <span className='font-bold'>Requirements</span>
                            <TextArea rows={8} name='requirement' value={specificPermit?.requirement || ''} placeholder="Requirements"  onChange={handleChange} />
                            <span className='text-xs italic'>Change if necessary</span>
                        </div>
                
                        <div className='sm:col-span-4 md-col-span-2 col-span-4 text-black border-black border border-t-0 p-2 rounded-sm'>
                            <div className='grid grid-cols-4 gap-6'>
                                <div className='gap-4 col-span-2 flex flex-col'>
                                    <div className='col-span-2 text-black border-black border border-t-0 p-2 rounded-sm'>
                                        <span className='font-bold mb-2'>Old Permit Date</span>
                                        <InputDate fontColor='text-red-500s' disabled type='date'  value={specificPermit?.renewal || ''}  onChange={handleChange} />
                                    </div>
                                    <div className='col-span-2 text-black border-black border border-t-0 p-2 rounded-sm'>
                                        <span className='font-bold'>New Permit Date</span>
                                        <InputDate name='permit_date' value={formData?.permit_date || ''}  type="date"  onChange={handleChange} />
                                    </div>
                                </div>
                                <div className='gap-4 col-span-2 flex flex-col'>
                                    <div className='col-span-2 text-black border-black border border-t-0 p-2 rounded-sm'>
                                        <span className='font-bold mb-2'>Frequency {specificFrequency?.range_in_months}</span>
                                        <Select name='frequency' onChange={handleChange} value={formData?.frequency || ''} selection_name={'Select Frequency'} options={frequencyList} />
                                    </div>
                                    <div className='col-span-2 text-black border-black border border-t-0 p-2 rounded-sm'>
                                        <span className='font-bold'>Renewal Date</span>
                                        <InputDate disabled name='renewal' value={formData?.renewal || ''}  type="date"  onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='sm:col-span-2 md-col-span-4 col-span-4 text-black border-black border border-t-0 p-2 rounded-sm'>
                            <span className='font-bold'>Recomendation</span>
                            <TextArea rows={2} name='recomendation' value={specificPermit?.recomendation || ''} placeholder="Requirements"  onChange={handleChange} />
                            <span className='text-xs italic'>Change if necessary</span>
                        </div>
                        <div className='sm:col-span-4 md-col-span-2 col-span-4 text-black border-black p-2 rounded-sm'>
                            <div className='flex gap-2 flex-row align-bottom justify-end'>
                                <form onSubmit={handleSave} className='w-full'>
                                    <button type='submit' className='bg-white border-2 w-full border-black text-fontColor px-2 rounded py-1 flex-col flex justify-center items-center  h-10'>
                                        <span className='text-sm font-bold'>Save</span>
                                    </button>
                                </form>
                                <button className='bg-white border-2 border-black text-fontColor px-2 rounded py-1 flex-col flex justify-center items-center w-full h-10'>
                                    <span className='text-sm font-bold'>Cancel</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </>
  )
}

export default RenewPermitsComponent