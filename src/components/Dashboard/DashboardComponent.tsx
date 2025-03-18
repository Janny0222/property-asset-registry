import React, { useEffect } from 'react'
import { IoHome } from 'react-icons/io5'
import { CommonButton } from '../ui/Forms/UserButton'
import { useRouter } from 'next/navigation'
import Table from '@/components/ui/CustomUI/Table'
import { TableColumn } from '@/types/propTypes'
import { usePropertyStore } from '@/stores/propertyStore'
import { PermitProps, PropertyProps } from '@/types/modelProps'
import { useLocationStore } from '@/stores/locationStore'
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { usePermitStore } from '@/stores/permitStore'
import { useCompanyPlantStore } from '@/stores/companyPlantStore'

export const tableHead: TableColumn[] = [
  { key: 'propertyNo', label: 'Property No.' },
  { key: 'location', label: 'Location' },
  { key: 'company_owner', label: 'Company Owner'},
]

const permitTableHead: TableColumn[] = [
  { key: 'company_plant', label: 'Company Plant' },
  { key: 'permit_type', label: 'Type of Permit' },
  { key: 'requirement', label: 'Requirement'},
  { key: 'frequency', label: 'Frequency'},
  { key: 'in_charge', label: 'In-Charge'},
  { key: 'contact_no', label: 'Contact No.'},
  { key: 'permit_no', label: 'Permit No.'},
  { key: 'permit_date', label: 'Permit Date'},
  { key: 'renewal', label: 'Renewal'},
  { key: 'permit_conditions', label: 'Permit Conditions'},
  { key: 'recomendation', label: 'Recomendation'},
]

const Text = 'text-sm text-center items-center justify-center whitespace-nowrap px-3 py-2';
const DashboardComponents = () => {
  const { property } = usePropertyStore()
  const { permit, fetchAllPermitForRenewal, permitForRenewal } = usePermitStore()
  const { locations } = useLocationStore()
  const { companyPlant } = useCompanyPlantStore()
  const router = useRouter();

  const handleClick = () => {
        router.push("/dashboard/add-property");
  }
  const handleEdit = (id: number) => {
        router.push(`/dashboard/edit-property/${id}`);
  }
  useEffect(() => {
    fetchAllPermitForRenewal()
  }, [fetchAllPermitForRenewal])
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
  const rowRender = (data: PermitProps, i: number) => {
          return (
          <>
              <td className={`${Text} `}>{ companyPlant.find((company) => company.id === data.company_plant)?.name }</td>
              <td className={`${Text} `}>{data.permit_type}</td>
              <td className={`${Text} `}>{data.requirement}</td>
              <td className={`${Text} `}>{data.frequency}</td>
              <td className={`${Text} `}>{data.in_charge}</td>
              <td className={`${Text} `}>{data.contact_no}</td>
              <td className={`${Text} `}>{data.permit_no}</td>
              <td className={`${Text} `}>{data.permit_date}</td>
              <td className={`${Text} `}>{data.renewal}</td>
              <td className={`${Text} `}>{data.permit_conditions}</td>
              <td className={`${Text} `}>{data.recomendation}</td>
              <td className={`${Text} flex gap-2`}>
                  <button type='button' onClick={() => handleEdit(data?.id!)} className='p-1 border rounded-sm text-green-800'><MdModeEdit /></button>
                  <button className='p-1 border rounded-sm text-red-500'><FaTrash/></button>
              </td>
          </>
          )
      }
  return (
    <div className='p-5 container-fluid mx-auto'>
      <div className='text-md'>
          <h1 className='text-md flex gap-2 items-center'><IoHome className='w-5 h-5' /> Dashboard </h1>
      </div>
      
      <div className='mt-7 bg-gray-100 px-3 py-5'>
        <div className='flex justify-end items-end'>
          <CommonButton type={'button'} onClick={() => handleClick()} name="Add Property" />
        </div>
        <h1 className='text-3xl font-bold text-center'> List of Property </h1>
        <Table tableHead={tableHead} rowData={property} rowRender={rowRenderProperty} />
      </div>
      <div className='mt-3 bg-gray-100 px-3 py-5'>
        <h1 className='text-3xl font-bold text-center'> Permit for renewal  </h1>
        <Table tableHead={permitTableHead} rowData={permitForRenewal} rowRender={rowRender} />
        {permitForRenewal?.length === 0 &&
        <>
          <div className='flex justify-center items-center'><span>No record/s found</span></div>
        </>}
      </div>

    </div>
  )
}

export default DashboardComponents