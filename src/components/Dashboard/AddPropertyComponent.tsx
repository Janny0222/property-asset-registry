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

const AddPropertyComponents = () => {
    const { locations, fetchLocations, fetchSpecificLocation, specificLocation } = useLocationStore();
    const { fetchAllProperty, property} = usePropertyStore()
    const [formData, setFormData] = useState<PropertyProps>({});
    const locationList: Option[] = locations.map((location) => ({
        value: location.id!,
        title: location.name!
    }))
    useEffect(() => {
        fetchLocations();
        fetchAllProperty()
        formData.propertyNo = Number(property?.length) + 10001
    }, [fetchLocations, property?.length, formData?.propertyNo, fetchAllProperty])

    useEffect(() => {
        const fetchLocation = async (id: number) => {
            await fetchSpecificLocation(id)
        }
        fetchLocation(formData?.location!)
    }, [formData?.location])
    const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({ ...formData, location: Number(e.target.value) });
    }
    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        
        setFormData({ ...formData, company_owner: e.target.value });
    }
    console.log(property.length)

    const handleAddProperty = async () => {
        try {
            const response = await createProperty(formData);
            fetchAllProperty();
            setFormData({})
        } catch (error: unknown) {
            if(error instanceof Error) {
            console.log(error);
        }
        }
    }
    return (
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
                            <span>Add Property</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='p-5'>
                <div className='flex flex-col gap-3 p-5 border rounded-sm justify-center items-center w-4/6 mx-auto'>
                        <h1>Add Property</h1>
                        <Input label='Property No.' type='text' name='propertyNo' value={formData?.propertyNo || ''} placeholder={``} disabled={true!} />
                        <Select selection_name={'Select Location'} label="Location" name="location" value={specificLocation?.id} options={locationList} onChange={handleSelectChange} />
                        <Input label="Company Name/Owner" type="text" name="company_name" value={formData?.company_owner || ''} onChange={handleInputChange} placeholder="Enter Company Name/Owner" />
                        <CommonButton wFull={true} type={'button'} onClick={() => handleAddProperty()} name="ADD" />
                        
                    
                </div>
            </div>
        </div>
    )
}

export default AddPropertyComponents