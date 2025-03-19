'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import MainModal from '../MainModal'
import { ChildrenModalProps } from '@/types/propTypes'
import { Input } from '@/components/ui/Forms/UserInputs'
import { HiPlusCircle } from 'react-icons/hi'
import { IoClose } from 'react-icons/io5'
import { GovernmentPermitProps } from '@/types/modelProps'
import { createGovernmentAgency } from '@/services/governmentAgencyServices'
import { useGovernmentPermitStore } from '@/stores/govenmentAgencyStore'

const AddGovernmentAgencyModal = ({ modalOpen, setModalOpen }: ChildrenModalProps) => {
    const { fetchAllGovernmentAgency } = useGovernmentPermitStore()
    const [error, setError] = useState<string>('');
    const [formData, setFormData] = useState<GovernmentPermitProps>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const respose = await createGovernmentAgency(formData);
            fetchAllGovernmentAgency();
            setModalOpen(false);
        } catch (error) {
            if (error instanceof Error) { 
            console.log(error);
            setError(error.message)
            }
        }
    }
  
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className='inline-block transitions inset-0 sm:w-4/5 border shadow-xl rounded-2xl md:w-3/5 lg:w-2/5 w-full align-middle p-10 transform  h-full bg-darkColor'>
            <h2 className='text-3xl font-bold text-white'> Add Government Agency </h2>
            <form onSubmit={handleSubmit} className='grid grid-cols-6 gap-6 text-left mt-6'>
                <div className='col-span-6 text-black'>
                    <Input fontColor='text-white' name='name' label={'Permit Name'} placeholder="Permit Name" type="text"  onChange={handleChange} />
                </div>
                <span className='text-red-600 font-bold italic'>{error}</span>
                <div className='col-span-6'>
                    <button type='submit' className='w-full flex flex-row justify-center items-center gap-2 py-3 text-lg transitions border-2 border-lightColor hover:bg-lightColor rounded bg-fontColor text-white hover:text-darkColor'>
                    <HiPlusCircle />  ADD
                    </button>
                </div>
                
              </form>
              <div className='absolute right-4 top-4'>
                        <button onClick={handleCloseModal} type='button' className=' w-9 h-9 flex-col flex justify-center items-center text-xl transitions  font-extrabold text-white bg-text border border-border rounded-full hover:bg-dry'>
                            <IoClose />
                        </button>
                </div>
        </div>
    </MainModal>
  )
}

export default AddGovernmentAgencyModal