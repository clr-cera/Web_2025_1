"use client";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { PiTrashSimple } from "react-icons/pi";

export default function CartElement(){
    return(
        <div className="text-black flex justify-between w-full">
            <div className="flex gap-4 items-center">
                <div className="w-13 h-13 bg-background-blue flex justify-center items-center rounded-full">
                    <p className="text-primary-blue font-semibold">
                        Au
                    </p>
                </div>
                
                <div className="">
                    <label className="font-semibold">Gold</label>
                    <p className="text-xs text-text-gray">$1923.12 per unit</p>    
                </div>
            </div>
            
            <div className="flex justify-between gap-10 items-center">
                {/* Controle de quantidade */}
                <div className="flex gap-5 items-center">
                    <button
                        onClick={()=>{}}
                        className="text-black p-2 border-2 border-border-gray rounded-md cursor-pointer hover:bg-gray-100"
                    >
                        <FaMinus size={5} />
                    </button>
                    <p className="font-semibold text-black ">{1}</p>
                    <button
                        onClick={()=>{}}
                        className="text-black p-2 border-2 border-border-gray rounded-md cursor-pointer hover:bg-gray-100"
                    >
                        <FaPlus size={5} />
                    </button>

                    <button className="cursor-pointer">
                        <PiTrashSimple size={20} className="text-red-600"/>
                    </button>
                </div>
 
            </div>
        </div>
    )
}