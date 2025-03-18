'use client'
import React, { useEffect, useState } from 'react'
import { IoHome } from 'react-icons/io5'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { LuWarehouse } from 'react-icons/lu'
import { Input, Select } from '../ui/Forms/UserInputs';
import { CommonButton } from '../ui/Forms/UserButton';
import Link from 'next/link';
import { useLocationStore } from '@/stores/locationStore';
import { Option } from '@/types/propTypes';
import { PropertyProps } from '@/types/modelProps';
import { createProperty } from '@/services/propertyServices';
import { usePropertyStore } from '@/stores/propertyStore';
import { useParams } from 'next/navigation';
import PropertyDetails from '../Modals/Property/PropertyDetails';
import MapComponent from '../MapComponent';

const EditPropertyComponent = () => {
    const { locations, fetchLocations, fetchSpecificLocation, specificLocation } = useLocationStore();
    const { fetchAllProperty, property, fetchSpecificProperty, specificProperty} = usePropertyStore()
    const [formData, setFormData] = useState<PropertyProps>({});
    const [propertyDetailsModal, setPropertyDetailsModal] = useState<boolean>(false)

    const params = useParams()
    useEffect(() => {
        fetchSpecificProperty(Number(params?.id));
        fetchAllProperty()
        fetchLocations()
        formData.propertyNo = Number(property?.length) + 10001
    }, [fetchSpecificProperty, fetchLocations, property?.length, formData?.propertyNo, fetchAllProperty])

    useEffect(() => {
        if (specificProperty) {
            fetchSpecificLocation(specificProperty?.location!)
        }
    }, [specificProperty?.location, fetchSpecificLocation])
    console.log(typeof(specificProperty?.location!))
    const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, location: Number(e.target.value) });
    }
    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, company_owner: e.target.value });
    }
    const handlePropertyDetails = (id: number) => {
        console.log(id)
        setPropertyDetailsModal(true)
    }

    return (
        <>
            <PropertyDetails modalOpen={propertyDetailsModal} setModalOpen={setPropertyDetailsModal} id={specificProperty?.id!} />
        <div className='container mx-auto'>
            <div className='p-5 '>
                <div className='text-md'>
                    <div className='text-md flex gap-2 items-center'>
                        <Link href={'/dashboard'} className='flex gap-1 text-gray-500 cursor-pointer'>
                            <IoHome className='w-5 h-5' />
                            <span>Dashboard</span>
                        </Link>
                        <MdOutlineKeyboardArrowRight className='w-6 h-6' />
                        <div className='flex gap-1'>
                            <LuWarehouse className='w-5 h-5' />
                            <span>Edit Property</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-6 gap-2 py-2 border rounded-md p-5 w-5/6 mx-auto'>
                
                <div className='sm:col-span-2 col-span-3 w-full'>
                    <Input label='Property No.' type='text' disabled value={specificProperty?.propertyNo || ''} />
                </div>
                <div className='col-span-4 '>

                </div>
                <div className='sm:col-span-2 col-span-3 w-full'>
                    <Input label='Location' type='text' disabled value={specificLocation?.name || ''} />
                </div>
                <div className='sm:col-span-2 col-span-3 w-full'>
                    <Input label='Company Name' type='text' disabled value={specificProperty?.company_owner || ''} />
                </div>
                <div className='sm:col-span-2 col-span-3 w-full'>
                    <Input label='Address' type='text' name='address' onChange={handleInputChange} value={specificProperty?.address || ''} />
                </div>
                <div className='col-span-2 w-full text-wrap'>
                    <CommonButton onClick={() => handlePropertyDetails(specificProperty?.id!)} name={'Property Details'} wFull={true} type={'button'} />
                </div>
                
                </div>
                {/* <MapComponent />/ */}
        </div>
        </>
    )
}

export default EditPropertyComponent