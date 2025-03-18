'use client';

import Image from "next/image";

export default function Home() {
  return (
      <div className="p-5 min-h-screen container mx-auto ">
        <h1 className="text-2xl text-black "><span className="text-4xl font-bold text-lightColor">WELCOME! </span> </h1>
              
        <div className="grid grid-cols-6  rounded-md self-center bg-lightColor ">
          <div className="sm:col-span-3 col-span-6 flex flex-col justify-center items-center p-5">
            <div className="text-wrap">
              <h3 className="text-3xl font-bold text-fontColor" >Property Asset Registry System</h3>
              <a href="/login" className="text-black">Click here to <button className="text-buttonColor border p-1 m-1 rounded border-buttonColor hover:bg-mainColor hover:text-lightColor">Login</button></a>
            </div>
          </div>
          <div className="sm:col-span-3 col-span-6 flex flex-col justify-center items-center p-5">
              <Image src="/images/img-background/home-background.png" alt="Home Background" width={600} height={500} />
          </div>
      </div>
      
    </div>
  );
}
