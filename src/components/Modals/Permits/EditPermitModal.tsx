import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import MainModal from '../MainModal'
import { ModalProps, Option } from '@/types/propTypes'
import { Input, InputDate, Select, TextArea } from '@/components/ui/Forms/UserInputs'
import { HiPlusCircle, HiCheckCircle } from 'react-icons/hi2'
import { IoClose } from 'react-icons/io5'
import { PermitProps } from '@/types/modelProps'
import { useParams } from 'next/navigation'
import { useGovernmentPermitStore } from '@/stores/govenmentAgencyStore'
import { useCompanyPlantStore } from '@/stores/companyPlantStore'
import { createPermit, updatePermitByID } from '@/services/permitServices'
import { usePermitStore } from '@/stores/permitStore'
import { useFrequencyStore } from '@/stores/frequencyStore'

const EditPermitModal = ({ modalOpen, setModalOpen, id }: ModalProps) => {
    const [formData, setFormData] = useState<PermitProps>({})
    const { governmentAgency } = useGovernmentPermitStore()
    const { fetchAllFrequency, frequency, fetchSpecificFrequency, specificFrequency } = useFrequencyStore()
    const { specificPermit, fetchAllPermitByGovernmentAgency } = usePermitStore()
    const { specificCompanyPlant, companyPlant } = useCompanyPlantStore()
    const [frequencyId, setFrequencyId] = useState<number>(0)
    const [file, setFile] = useState<File | null>(null)
    const params = useParams()

    useEffect(() => {
        fetchAllFrequency()
        if(frequencyId !== 0) {
            fetchSpecificFrequency(frequencyId)
        }
    }, [fetchAllFrequency, fetchSpecificFrequency, frequencyId])

    useEffect(() => {
        if (specificPermit) {
            setFormData(specificPermit!)
        }
    }, [specificPermit])

    useEffect(() => {
        if(formData?.permit_date && specificFrequency?.range_in_months) {
            const newRenewalDate = calculateRenewalDate(formData.permit_date, specificFrequency.range_in_months)
            setFormData((prev) => (
                { ...prev, 
                    renewal: newRenewalDate,
                }));
        }
    }, [formData.permit_date, specificFrequency?.range_in_months])
    const calculateRenewalDate = (permitDate: string, rangeMonths: number) => {
        const date = new Date(permitDate);
        date.setMonth(date.getMonth() + rangeMonths); 
        return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };

        // If permit_date or frequency changes, recalculate renewal
        if (name === 'frequency') {
            formData.frequency = value
            setFrequencyId(Number(value))
        }
        setFormData(updatedFormData);
    };
    const frequencyList: Option[] = frequency.map((frequency) => ({
            value: frequency?.id!,
            title: frequency?.name_of_frequency!
        }))
    const handleCloseModal = () => {
        setFormData({});
        setModalOpen(false);
    }
    const permit = governmentAgency.find((agency) => agency.id === specificPermit?.government_agency)?.name
    const company_plant = companyPlant.find((company) => company.id === specificPermit?.company_plant)?.name

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const formDatas = new FormData();
            formDatas.append('entityId', formData?.id!.toString());
            formDatas.append('file', file!);

            const response = await updatePermitByID(formData?.id!, formData)
            
            
            const response2 = await fetch('/api/uploads', {
                method: 'POST',
                body: formDatas,
            });

            const result = await response2.json();
            fetchAllPermitByGovernmentAgency(params.name?.toString()!)
            setFormData({})
            setModalOpen(false)
        } catch  (error) {
            if (error instanceof Error) { 
            console.log(error);
            }
        }
    }
    
    
  return (
      <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className='inline-block transitions inset-0 sm:w-4/6 border rounded-lg md:w-3/5 lg:w-3/6 w-full align-middle p-5 transform  h-full bg-white'>
              <h2 className='text-2xl font-bold  text-left'> Edit Permit </h2>
              <div className='w-full border relative'></div>
            <form onSubmit={handleSubmit} className='grid grid-cols-6 gap-6 text-left mt-6'>
                <div className='col-span-2 '>
                    <Input disabled fontColor=''  value={company_plant || ''} label={'Company Plant'} placeholder="Company Plant" type="text"  onChange={handleChange} />
                </div>
                <div className='col-span-2 '>
                    <Input disabled fontColor='' name='' value={permit || ''} label={'Government Agency'} placeholder="Government Agency" type="text"  onChange={handleChange} />
                </div>
                <div className='col-span-2 text-black'>
                    <Input fontColor='' name='permit_type' value={formData?.permit_type || ''} label={'Type of Permit'} placeholder="Type of Permit" type="text"  onChange={handleChange} />
                </div>
                <div className='col-span-2 '>
                      <TextArea label='Requirements' placeholder={`Requirements`}  name='requirement' value={formData?.requirement || ''} textColor='text-black' onChange={handleChange} />
                </div>
                <div className='col-span-2 text-black'>
                    <Input fontColor='' name='in_charge' value={formData?.in_charge || ''} label={'In Charge'} placeholder="In Charge" type="text"  onChange={handleChange} />
                 </div>
                <div className='col-span-2 text-black'>
                    <Input fontColor='' name='contact_no' value={formData?.contact_no || ''} label={'Contact No.'} placeholder="Contact No." type="text"  onChange={handleChange} />
                </div>
                <div className='col-span-2 text-black'>
                    <InputDate fontColor='' name='permit_date' value={formData?.permit_date! || ''} label={'Permit Date'} placeholder="Permit Date" type="date"  onChange={handleChange} />
                </div>
                <div className='col-span-2'>
                    <Select label='Frequency' name='frequency' onChange={handleChange} value={formData?.frequency || ''} selection_name={'Select Frequency'} options={frequencyList} />
                </div>
                <div className='col-span-2 '>
                    <InputDate disabled fontColor='' name='renewal' value={formData?.renewal! || ''} label={'Renewal Date'} placeholder="Renewal Date" type="date"  onChange={handleChange} />
                </div>
                <div className='col-span-2 text-black'>
                    <Input fontColor='' name='permit_no' value={formData?.permit_no || ''} label={'Permit No.'} placeholder="Permit No." type="text"  onChange={handleChange} />
                </div>
                <div className='col-span-2 '>
                      <TextArea label='Permit Conditions' name='permit_conditions' value={formData?.permit_conditions || ''} onChange={handleChange} textColor='text-black' placeholder='Permit Conditions' />
                </div>
                <div className='col-span-2 '>
                    <TextArea label='Recomendation' name='recomendation' value={formData?.recomendation || ''} onChange={handleChange} textColor='text-black' placeholder='Recomendation' />
                  </div>
                  <div className='col-span-4 flex flex-row'>
                        
                </div>
                <div className='col-span-2 flex flex-row gap-2 '>
                    <Input label='Attached Files' name={'permit_file'} type='file' onChange={(e) => setFile(e.target.files?.[0] || null)} />
                </div>
                <span className='text-red-600 font-bold italic'>{''}</span>
                <div className='col-span-6'>
                        <button type='submit' className='w-full flex flex-row justify-center items-center gap-2 py-3 text-lg transitions border-2 border-lightColor hover:bg-green-700 rounded bg-fontColor text-white hover:text-darkColor'>
                        <HiCheckCircle className='w-6 h-6 font-bold' />  UPDATE
                        </button>
                </div>
            </form>
            <div className='absolute right-3 top-2'>
                <button onClick={handleCloseModal} type='button' className=' w-8 h-8 flex-col flex justify-center items-center text-xl transitions  font-extrabold text-black bg-[#91e4bc] border border-border rounded-full hover:bg-dry'>
                    <IoClose />
                </button>
            </div>
        </div>
      </MainModal>
  )
}

export default EditPermitModal