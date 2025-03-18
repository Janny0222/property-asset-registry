'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { HiWrenchScrewdriver } from 'react-icons/hi2'
import { MdArrowRight, MdSpaceDashboard } from 'react-icons/md'
import { BsCardChecklist } from "react-icons/bs";
import { useCompanyPlantStore } from '@/stores/companyPlantStore';
import { usePropertyStore } from '@/stores/propertyStore';
import { useLocationStore } from '@/stores/locationStore';
import { useGovernmentPermitStore } from '@/stores/govenmentAgencyStore';

const SidebarMenuList = () => {
  const [maintenanceOpen, setMaintenanceOpen] = React.useState(false);
  const [permitOpen, setPermitOpen] = React.useState(false);
  const { fetchAllCompanyPlant } = useCompanyPlantStore();
  const { fetchAllGovernmentAgency, governmentAgency } = useGovernmentPermitStore()
  const { fetchAllProperty } = usePropertyStore()
  const { fetchLocations } = useLocationStore()
  const pathname = usePathname(); 
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const showRightRef = React.useRef<HTMLDivElement>(null);
  
  const handleClickMaintenance = () => {
    setMaintenanceOpen(!maintenanceOpen);
    setPermitOpen(false);
    } 
  const handleClickPermit = () => {
    setPermitOpen(!permitOpen);
    setMaintenanceOpen(false);
  }
  
  useEffect(() => {
    if(pathname.startsWith('/maintenance')) {
      setMaintenanceOpen(true);
      
    } else if(pathname.startsWith('/permits')) {
      setPermitOpen(true)
    } else {
      setPermitOpen(false)
      setMaintenanceOpen(false);
    }
    fetchAllGovernmentAgency()
    fetchAllProperty()
    fetchLocations()
    fetchAllCompanyPlant()
  }, [pathname, fetchLocations, setMaintenanceOpen, fetchAllGovernmentAgency, fetchAllProperty, fetchAllCompanyPlant])

  return (
    <>
      <div className='text-white flex w-full justify-end bg-darkColor p-2 py-[.75rem]'>
        <span className='text-lg mb-5 '>Property Asset</span>
        <span className='text-xs relative md:absolute mt-6 mr-1'>Registry System </span>
      </div>
      <div className=' text-white  transitions flex w-full'>
        <Link href={'/dashboard'} className={`hover:bg-fontColor flex gap-3 w-full p-4 ${pathname === '/dashboard' ? 'bg-fontColor bg-opacity-50' : ''}`}>
        <MdSpaceDashboard className='w-5 h-5' />
          Dashboard
        </Link>
      </div>
      {/* <div className=' text-white  transitions flex w-full'>
        <Link href={'/permits'} className={`hover:bg-fontColor flex gap-3 w-full p-4 ${pathname === '/permits' ? 'bg-fontColor bg-opacity-50' : ''}`}>
        <BsCardChecklist className='w-5 h-5' />
          Permits
        </Link>
      </div> */}
      <div className=' text-white  transitions flex w-full'>
        <button onClick={handleClickPermit} className='hover:bg-fontColor flex justify-between gap-3 w-full p-4 cursor-pointer'>
          <div className='flex gap-3'>
            <BsCardChecklist className='w-5 h-5' />
            Permits
          </div>
          <div className='transitions'>
            <MdArrowRight className={`w-6 h-6 transitions ${permitOpen && !maintenanceOpen ? 'rotate-90 ' : ''} `} />     
          </div>
        </button>
      </div>
      <div ref={dropdownRef} className={`overflow-hidden relative transition-[max-height] duration-300 ease-in-out`}
        style={{
          maxHeight: permitOpen ? `${dropdownRef.current?.scrollHeight}px` : '0',
        }}>
        {governmentAgency.map((permit) => (
          <div key={permit.id} className='w-full text-white bg-darkColor flex flex-col justify-evenly'>
            <Link  href={`/permits/${permit.id}`} className={`hover:bg-fontColor flex p-4 cursor-pointer`}>
              <div className=' w-full  ml-8 '>
                {permit.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className=' text-white  transitions flex w-full'>
        <button type='button' onClick={handleClickMaintenance} className='hover:bg-fontColor flex justify-between gap-3 w-full p-4 cursor-pointer'>
          <div className='flex gap-3'>
              <HiWrenchScrewdriver className='w-5 h-5' />
              Maintenance
          </div>
          <div className='transitions'>
          <MdArrowRight className={`w-6 h-6 transitions ${maintenanceOpen ? 'rotate-90 ' : ''} `} />
          </div>
        </button>
      </div>
      <div ref={dropdownRef} className={`overflow-hidden transition-[max-height] duration-300 ease-in-out`}
        style={{
          maxHeight: maintenanceOpen ? `${dropdownRef.current?.scrollHeight}px` : '0',
        }}>
        <div  className='w-full text-white bg-darkColor  flex flex-col justify-between'>
          <Link href={'/maintenance/location-list'} className={`p-3 transitions hover:bg-fontColor ${pathname === '/maintenance/location-list' ? 'bg-fontColor' : ''}`}>
            <div className=' w-full  ml-8'>
                Location
            </div>
          </Link>
          
          <Link href={'/maintenance/area-code'} className={` p-3 transitions hover:bg-fontColor ${pathname === '/maintenance/area-code' ? 'bg-fontColor bg-opacity-50' : ''}`}>
            <div className='w-full ml-8'>
              Area Code
            </div>
          </Link>
          
          <Link href={'/maintenance/company-name'} className={`p-3 transitions hover:bg-fontColor ${pathname === '/maintenance/company-name' ? 'bg-fontColor bg-opacity-50' : ''}`}>
            <div className='w-full ml-8'>
              Company Name
            </div>
          </Link>
          <Link href={'/maintenance/asset-list'} className={`p-3 transitions hover:bg-fontColor ${pathname === '/maintenance/asset-list' ? 'bg-fontColor bg-opacity-50' : ''}`}>
            <div className='w-full ml-8'>
              Asset List
            </div>
          </Link>
          <Link href={'/maintenance/planta'} className={`p-3 transitions hover:bg-fontColor ${pathname === '/maintenance/planta' ? 'bg-fontColor bg-opacity-50' : ''}`}>
            <div className='w-full ml-8'>
              Company Plant
            </div>
          </Link>
          <Link href={'/maintenance/government-permit'} className={`p-3 transitions hover:bg-fontColor ${pathname === '/maintenance/government-permit' ? 'bg-fontColor bg-opacity-50' : ''}`}>
            <div className='w-full ml-8'>
              Government permits
            </div>
          </Link>
          <Link href={'/maintenance/tabular-color'} className={`p-3 transitions hover:bg-fontColor ${pathname === '/maintenance/tabular-color' ? 'bg-fontColor bg-opacity-50' : ''}`}>
            <div className='w-full ml-8'>
              Tabular Case Color
            </div>
          </Link>
        </div>
      </div> 
      
    </>
  )
}

export default SidebarMenuList