import React, { useEffect } from 'react'
import MainModal from '../MainModal'
import { ModalProps } from '@/types/propTypes'
import { usePermitHistoryStore } from '@/stores/permitHistoryStore'
import Table from '@/components/ui/CustomUI/Table'
import { PermitHistoryProps } from '@/types/modelProps'
import { useCompanyPlantStore } from '@/stores/companyPlantStore'

const tableHead = [
    { key: 'company_plant', label: 'Company Plant' },
    { key: 'permit_type', label: 'Type of Permit' },
    { key: 'in_charge', label: 'In-Charge'},
    { key: 'contact_no', label: 'Contact No.'},
    { key: 'permit_no', label: 'Permit No.'},
    { key: 'renewal', label: 'Last Renewal'},
]

const RenewalHistoryModal = ({ modalOpen, setModalOpen, id }: ModalProps) => {
    const { fetchPermitHistoryById, permitHistory } = usePermitHistoryStore()
    const { companyPlant } = useCompanyPlantStore()

    useEffect(() => {
        if (id) {
            fetchPermitHistoryById(id)
        }
    }
    , [id, fetchPermitHistoryById])
    const rowRender = (data: PermitHistoryProps, i: number) => {

        const renewalDate = new Date(data?.renewal!).toLocaleDateString('en-US', {
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        const today = new Date();
        const sixMonthsFromNow = new Date();
        const renewal = new Date(data?.renewal!);
        sixMonthsFromNow.setMonth(today.getMonth() + 6);

        return (
        <>
            <td className={`${Text} truncate `}>{ companyPlant.find((company) => company.id === data.company_plant)?.name }</td>
            <td className={`${Text} `}>{data.permit_type}</td>
            <td className={`${Text} `}>{data.in_charge}</td>
            <td className={`${Text} `}>{data.contact_no}</td>
            <td className={`${Text} `}>{data.permit_no}</td>
            <td className={`${Text} `}>{renewalDate}</td>
        </>
        )
    }

    console.log(permitHistory)
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className='inline-block transitions inset-0 sm:w-4/6 border rounded-lg md:w-3/5 lg:w-3/6 w-full align-middle p-5 transform  h-full bg-white'>
                <h2 className='text-2xl font-bold  text-left'> Renewal History </h2>
                <div className='w-full border relative'>
                    <Table tableHead={tableHead} rowRender={rowRender} rowData={permitHistory} />
                    {permitHistory?.length === 0 &&
                    <>
                    <div className='flex justify-center items-center'><span>No renewal history</span></div>
                    </>}
                </div>
        </div>
    </MainModal>
  )
}

export default RenewalHistoryModal