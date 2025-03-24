'use client'
import { getSpecificUser, logoutService } from '@/services/authServices'
import { useUserStore } from '@/stores/userStore'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { Fragment, useEffect } from 'react'
import { FaAngleDown, FaUser } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'

const NavBar = ({children} : {children: React.ReactNode}) => {
    const { id, username, fullName, setUser} = useUserStore();

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getSpecificUser();
            if(user) {
                setUser(user );
            }
        }
        fetchUser()
    }, [setUser])
    const router = useRouter();
    const handleLogout = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
        const response = await logoutService();
        router.push("/login");
        } catch (error) {
        console.error("Error logging out:", error);
        }
    }
  return (
    <div className='w-full min-h-screen'>
          <div className='p-4 flex justify-end bg-gray-200 w-auto'>
            
            <Menu as="div" className="inline-block relative text-left">
                <div>
                    <Menu.Button className="inline-flex w-full rounded-md  px-2 py-2 text-md font-medium text-fontColor  focus:outline-none focus-visible:ring-2 ">
                        {fullName ? fullName : <FaUser className={`h-5 w-5`} 
                        aria-hidden="true"/> }
                        <FaAngleDown
                        className=" h-5 w-5  "
                        aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
                <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
                >
                <Menu.Items className="absolute right-0 mt-2 w-60 origin-top-right divide-y divide-gray-300 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <div className="px-1 py-1 ">
                        <Menu.Item>
                            <Link href={`${fullName ? '/profile' : '/login'}`} className={`hover:bg-navbar hover:text-fontColor text-gray-800 group w-full flex px-2 justify-start items-start rounded-md py-2 text-sm`}>
                                {fullName ? 'Profile' : 'Login'}  
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link href={`/change-password`} className={`hover:bg-navbar hover:text-white text-gray-800 group w-full ${!fullName ? 'hidden' : 'flex'} px-2 justify-start items-start rounded-md py-2 text-sm`}>
                                Change Password 
                            </Link>
                        </Menu.Item>
                    </div>                    
                    <div className='px-1 py-1'>
                        <Menu.Item>
                            <form onSubmit={handleLogout}>
                                <button type="submit" className={`hover:bg-dry text-gray-800 group w-full ${!fullName? 'hidden' : 'flex'} px-2 justify-start items-start rounded-md py-2 text-sm`}>
                                        Logout
                                </button>
                            </form>
                        </Menu.Item>
                    </div>
                </Menu.Items>
                </Transition>
            </Menu>
        </div>
        
            {children}
        
    </div>
  )
}

export default NavBar