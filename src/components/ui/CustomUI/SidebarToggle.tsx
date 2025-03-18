'use client'
import React, { useEffect } from 'react'
import Link from 'next/link';
import { MdSpaceDashboard} from 'react-icons/md'
import { HiWrenchScrewdriver } from 'react-icons/hi2'
import { MdArrowRight, MdArrowDropDown } from "react-icons/md";
import { usePathname } from 'next/navigation';
import { GiHamburgerMenu } from 'react-icons/gi';


const Sidebar = ({children} : {children: React.ReactNode}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const pathname = usePathname(); 
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const sidebarRef = React.useRef<HTMLDivElement>(null);

  const handleClick = () => setIsOpen(!isOpen);
  const handleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    if(pathname.startsWith('/maintenance')) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
    console.log(pathname)
  }, [pathname, setIsOpen])

  console.log("Drop Down:", sidebarRef.current?.scrollWidth);
  return (
    <>
      
      <div className='flex flex-row min-h-screen'>
        <div className={`w-[350px] md:block hidden `}>
            <div className=' bg-mainColor min-h-screen'>
              <div className='text-white flex justify-end w-full bg-darkColor p-2 py-[.75rem]'>
                <span className='text-lg mb-5 '>Property Asset</span>
                <span className='text-xs relative md:absolute mt-6 mr-1'>Registry System</span>
              </div>
              <div className=' text-white  transitions flex w-full'>
                <Link href={'/'} className='hover:bg-fontColor flex gap-3 w-full p-4'>
                <MdSpaceDashboard className='w-5 h-5' />
                  Dashboard
                </Link>
              </div>
              <div className=' text-white  transitions flex w-full'>
                <button onClick={handleClick} className='hover:bg-fontColor flex justify-between gap-3 w-full p-4 cursor-pointer'>
                  <div className='flex gap-3'>
                      <HiWrenchScrewdriver className='w-5 h-5' />
                      Maintenance
                  </div>
                  <div className='transitions'>
                  <MdArrowRight className={`w-6 h-6 transitions ${isOpen ? 'rotate-90 ' : ''} `} />
                    
                  </div>
                  
                </button>
              </div>
              <div ref={dropdownRef} className={`overflow-hidden transition-[max-height] duration-300 ease-in-out`}
                style={{
                  maxHeight: isOpen ? `${dropdownRef.current?.scrollHeight}px` : '0',
                }}>
                <div  className='w-full text-white bg-darkColor  flex flex-col justify-between'>
                  <Link href={'/maintenance/location-list'} className='p-3 transitions hover:bg-fontColor '>
                    <div className=' w-full  ml-8'>
                        Location
                    </div>
                  </Link>
                  
                  <Link href={'/maintenance/area-code'} className=' p-3 transitions hover:bg-fontColor'>
                    <div className='w-full ml-8'>
                      Area Code
                    </div>
                  </Link>
                  
                  <Link href={'/maintenance/company-name'} className=' p-3 transitions hover:bg-fontColor'>
                    <div className='w-full ml-8'>
                      Company Name
                    </div>
                  </Link>
                  <Link href={'/maintenance/asset-list'} className=' p-3 transitions hover:bg-fontColor'>
                    <div className='w-full ml-8'>
                      Asset List
                    </div>
                  </Link>
                  <Link href={'/maintenance/tabular-color'} className=' p-3 transitions hover:bg-fontColor'>
                    <div className='w-full ml-8'>
                      Tabular Case Color
                    </div>
                  </Link>
                </div>
              </div>
            </div>
        </div>
        {children}
      </div>
    </>
  )
}

export default Sidebar