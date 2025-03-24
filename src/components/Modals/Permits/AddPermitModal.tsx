import React, { ChangeEvent, FormEvent, useState } from 'react'
import MainModal from '../MainModal'
import { ModalProps, Option } from '@/types/propTypes'
import { Input, InputDate, Select, TextArea } from '@/components/ui/Forms/UserInputs'
import { HiPlusCircle } from 'react-icons/hi2'
import { IoClose } from 'react-icons/io5'
import { PermitProps } from '@/types/modelProps'
import { useParams } from 'next/navigation'
import { useGovernmentPermitStore } from '@/stores/govenmentAgencyStore'
import { useCompanyPlantStore } from '@/stores/companyPlantStore'
import { createPermit } from '@/services/permitServices'
import { usePermitStore } from '@/stores/permitStore'

const AddPermitModal = ({ modalOpen, setModalOpen }: ModalProps) => {
    const [formData, setFormData] = useState<PermitProps>({})
    const { governmentAgency } = useGovernmentPermitStore()
    const { fetchAllPermitByGovernmentAgency } = usePermitStore()
    const [companyPlantId, setCompanyPlantId] = useState<number>(0)
    const { companyPlant } = useCompanyPlantStore()
    const params = useParams()

    const companyList: Option[] = companyPlant.map((company) => ({
        value: company?.id!,
        title: company?.name!
    }))

    const calculateRenewalDate = (permitDate: string, frequency: string) => {
        if (!permitDate) return '';

        const permitDateObj = new Date(permitDate);

        if (frequency === 'Annual') {
            permitDateObj.setFullYear(permitDateObj.getFullYear() + 1);
        } else if (frequency === 'Every 3-years') {
            permitDateObj.setFullYear(permitDateObj.getFullYear() + 3);
        } else if (frequency === 'One-Time') {
            return ''; // No renewal needed
        }

        return permitDateObj.toISOString().split('T')[0]; // Format YYYY-MM-DD
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };

        // If permit_date or frequency changes, recalculate renewal
        if (name === 'frequency') {
            updatedFormData.renewal = calculateRenewalDate(updatedFormData?.permit_date!, updatedFormData?.frequency!);
        }

        setFormData(updatedFormData);
    };
    const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCompanyPlantId(Number(e.target.value) );
    }
    const frequencyOptions: Option[] = [
        { value: 'Annual', title: 'Annual' },
        { value: 'One-Time', title: 'One-Time' },
        { value: 'Every 3-years', title: 'Every 3-years' },
    ];
    const handleCloseModal = () => {
        setFormData({});
        setModalOpen(false);
    }
    const permit = governmentAgency.find((agency) => agency.id === Number(params?.name))?.name

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const newFormData = {
                ...formData,
                company_plant: companyPlantId,
                government_agency: Number(params?.name)
            }
            const response = await createPermit(newFormData)
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
        <div className='inline-block transitions inset-0 sm:w-4/6 border shadow-xl rounded-sm md:w-3/5 lg:w-3/6 w-full align-middle p-5 transform  h-full bg-mainColor'>
              <h2 className='text-2xl font-bold text-white text-left'> Add Permit </h2>
              <div className='w-full border relative'></div>
            <form onSubmit={handleSubmit} className='grid grid-cols-6 gap-6 text-left mt-6'>
                <div className='col-span-2 text-white'>
                    <Select label='Select Company Plant' name='company_plant' onChange={handleSelectChange} value={companyPlantId} selection_name={'Select Company Plant'} options={companyList} />
                </div>
                <div className='col-span-2 text-white'>
                    <Input disabled fontColor='text-white' name='' value={permit || ''} label={'Government Agency'} placeholder="Government Agency" type="text"  onChange={handleChange} />
                </div>
                <div className='col-span-2 text-black'>
                    <Input fontColor='text-white' name='permit_type' value={formData?.permit_type || ''} label={'Type of Permit'} placeholder="Type of Permit" type="text"  onChange={handleChange} />
                </div>
                <div className='col-span-2 text-white'>
                      <TextArea label='Requirements' placeholder={`Requirements`}  name='requirement' value={formData?.requirement || ''} textColor='text-black' onChange={handleChange} />
                </div>
                <div className='col-span-2 text-black'>
                    <Input fontColor='text-white' name='in_charge' value={formData?.in_charge || ''} label={'In Charge'} placeholder="In Charge" type="text"  onChange={handleChange} />
                 </div>
                <div className='col-span-2 text-black'>
                    <Input fontColor='text-white' name='contact_no' value={formData?.contact_no || ''} label={'Contact No.'} placeholder="Contact No." type="text"  onChange={handleChange} />
                </div>
                <div className='col-span-2 text-black'>
                    <InputDate fontColor='text-white' name='permit_date' value={formData?.permit_date! || ''} label={'Permit Date'} placeholder="Permit Date" type="date"  onChange={handleChange} />
                </div>
                <div className='col-span-2'>
                    <Select label='Frequency' name='frequency' onChange={handleChange} value={formData?.frequency || ''} selection_name={'Select Frequency'} options={frequencyOptions} />
                </div>
                <div className='col-span-2 text-white'>
                    <InputDate disabled fontColor='text-white' name='renewal' value={formData?.renewal! || ''} label={'Renewal Date'} placeholder="Renewal Date" type="date"  onChange={handleChange} />
                </div>
                <div className='col-span-2 text-black'>
                    <Input fontColor='text-white' name='permit_no' value={formData?.permit_no || ''} label={'Permit No.'} placeholder="Permit No." type="text"  onChange={handleChange} />
                </div>
                <div className='col-span-2 text-white'>
                      <TextArea label='Permit Conditions' name='permit_conditions' value={formData?.permit_conditions || ''} onChange={handleChange} textColor='text-black' placeholder='Permit Conditions' />
                </div>
                <div className='col-span-2 text-white'>
                    <TextArea label='Recomendation' name='recomendation' value={formData?.recomendation || ''} onChange={handleChange} textColor='text-black' placeholder='Recomendation' />
                </div>
                <span className='text-red-600 font-bold italic'>{''}</span>
                <div className='col-span-6'>
                        <button type='submit' className='w-full flex flex-row justify-center items-center gap-2 py-3 text-lg transitions border-2 border-lightColor hover:bg-lightColor rounded bg-fontColor text-white hover:text-darkColor'>
                        <HiPlusCircle />  ADD
                        </button>
                </div>
            </form>
            <div className='absolute right-4 top-4'>
                <button onClick={handleCloseModal} type='button' className=' w-8 h-8 flex-col flex justify-center items-center text-xl transitions  font-extrabold text-black bg-[#91e4bc] border border-border rounded-full hover:bg-dry'>
                    <IoClose />
                </button>
            </div>
        </div>
      </MainModal>
  )
}

export default AddPermitModal