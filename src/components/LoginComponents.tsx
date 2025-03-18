"use client"
import { loginService } from "@/services/authServices";
import { LoginProps } from "@/types/propTypes";
import Image from "next/image";
import {  useState } from "react";
import { Input } from "./ui/Forms/UserInputs";
import { LoginButton } from "./ui/Forms/UserButton";
import  { useRouter }  from 'next/navigation'
import Swal from 'sweetalert2'


export default function LoginComponents() {
    const [formData, setFormData] = useState<LoginProps>({username: "", password: ""});
    const [error, setError] = useState<string | null>(null)
    const router = useRouter();

  

      const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const authLogin = await loginService(formData?.username, formData?.password);
            console.log(authLogin)
            if(!authLogin) {
              setError(authLogin.error)
              
            } else {
              Swal.fire({
                title: `${authLogin.message}`,
                icon: "success"
              })
              router.push("/dashboard");
            }
            
        } catch (error: any) {
            console.error("Error logging in:", error);
            setError(error?.message);
        }
      } 
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    
      return (
            <div className='flex flex-col justify-center items-center p-5 relative container mx-auto'>
                <form onSubmit={handleLogin} className='w-full 2xl:w-2/5 grid gap-6 sm:mt-28 m-12 px-8 py-10 shadow-darkColor shadow-md sm:px-14 md:w-3/5 p-5 rounded bg-dryMainColor border-fontColor'>
                <div className='flex flex-col justify-center items-center'>
                    <Image src='/images/logo/logo_pars.png' width={96} height={96} alt='logo' className='w-full h-36 object-contain' />
                    <h1 className='text-navbar font-semibold'>Property Assets Registry System</h1>
                </div>
                  <Input onChange={handleChange} name="username" value={formData?.username} label="Username" type="text" placeholder="Username" />
                  <Input onChange={handleChange} name="password" value={formData?.password} label="Password" type="password" placeholder="Password" />
                  {error && <p className="text-red-500">{error}</p>}
                  <LoginButton />
                </form>
              
            </div>
      )
    }