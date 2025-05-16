'use client'
import React, { useEffect, useState } from 'react'
import { IoHome } from 'react-icons/io5'
import { MdModeEdit, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { LuWarehouse } from 'react-icons/lu'
import { Input, Select } from '../ui/Forms/UserInputs';
import { CommonButton } from '../ui/Forms/UserButton';
import Link from 'next/link';
import { useLocationStore } from '@/stores/locationStore';
import { Option, TableColumn } from '@/types/propTypes';
import { PropertyProps } from '@/types/modelProps';
import { createProperty } from '@/services/propertyServices';
import { usePropertyStore } from '@/stores/propertyStore';
import { useErrorStore } from '@/stores/errorStore';
import Table from '../ui/CustomUI/Table';
import { useRouter } from 'next/navigation'
import { FaTrash } from 'react-icons/fa';


export const tableHead: TableColumn[] = [
  { key: 'propertyNo', label: 'Property No.' },
  { key: 'location', label: 'Location' },
  { key: 'company_owner', label: 'Company Owner'},
  { key: 'actions', label: 'Action'},
]
const Text = 'text-sm text-center items-center justify-center whitespace-nowrap px-3 py-2';
const AddPropertyComponents = () => {
    const { locations, fetchLocations, fetchSpecificLocation, specificLocation } = useLocationStore();
    const { error } = useErrorStore();
    const { fetchAllProperty, property} = usePropertyStore()
    const [formData, setFormData] = useState<PropertyProps>({});
    const [showForm, setShowForm] = useState(false);
    const router = useRouter();
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const locationList: Option[] = locations.map((location) => ({
        value: location.id!,
        title: location.name!
    }))

    const toggleFormVisibility = () => {
        setShowForm(prev => !prev);
    }
    useEffect(() => {
        fetchLocations();
        fetchAllProperty()
        formData.propertyNo = Number(property?.length) + 10001
    }, [fetchLocations, property?.length, formData?.propertyNo, fetchAllProperty])

    useEffect(() => {
        if (formData?.location) {
            fetchSpecificLocation(formData?.location!)
        }
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

    const handleEdit = (id: number) => {
            router.push(`/dashboard/edit-property/${id}`);
      }

    const rowRenderProperty = (data: PropertyProps, i: number) => {
        return (
          <>
            <td className={`${Text} `}>{ data.propertyNo }</td>
            <td className={`${Text} `}>{ locations.find((location) => location.id === data.location)?.name }</td>
            <td className={`${Text} `}>{data.company_owner}</td>
            <td className={`${Text} flex gap-2`}>
              <button type='button' onClick={() => handleEdit(data?.id!)} className='p-1 border rounded-sm text-green-800'><MdModeEdit /></button>
              <button className='p-1 border rounded-sm text-red-500'><FaTrash/></button>
            </td>
          </>
        )
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
                            <span>Property</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className=''>
                <div className='border p-5'>
                    <button
                            onClick={toggleFormVisibility}
                            className='text-sm font-medium text-white bg-fontColor px-4 py-2 rounded hover:bg-green-700 transitions'
                            >
                            {showForm ? 'Hide Form' : 'Add Property'}
                    </button>
                    <div ref={dropdownRef} className={`overflow-hidden mt-2 gap-3 transition-[max-height] duration-300 ease-in-out`}
                        style={{  gap: '100px',
                        maxHeight: showForm ? `${dropdownRef.current?.scrollHeight}px` : '0',
                        }}>
                        <>
                            <div>
                                <Input label='Property No.' type='text' name='propertyNo' value={formData?.propertyNo || ''} placeholder={``} disabled={true!} />
                            </div>
                            <div className='mt-2'>
                                <Select selection_name={'Select Location'} label="Location" name="location" value={specificLocation?.id} options={locationList} onChange={handleSelectChange} />
                            </div>
                            <div className='mt-2'>
                                <Input label="Company Name/Owner" type="text" name="company_name" value={formData?.company_owner || ''} onChange={handleInputChange} placeholder="Enter Company Name/Owner" />
                            </div>
                            <span className='text-red-700 font-bold italic text-left'>{error}</span>
                    
                            <div className=''>
                                <CommonButton wFull={true} type={'button'} onClick={() => handleAddProperty()} name="ADD" />
                            </div>
                        </>
                    </div>
                </div>
                {/* <div className='flex flex-col gap-2 p-3 border rounded-sm justify-center items-center'>
                    
                    <button 
                        onClick={toggleFormVisibility}
                        className='text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transitions'
                        >
                        {showForm ? 'Hide Form' : 'Add Property'}
                    </button>
                    {showForm && (
                        
                    )}
                        
                    
                </div> */}
                <div className='mt-5 bg-gray-100 border border-black/10 px-3 py-5'>
                    <Table title='List of Property' tableHead={tableHead} rowData={property} rowRender={ rowRenderProperty} />
                </div>
            </div>
        </div>
    )
}

export default AddPropertyComponents