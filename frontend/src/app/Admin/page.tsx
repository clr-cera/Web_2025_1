import { BsBoxSeam, BsShield } from "react-icons/bs";
import { CgBox } from "react-icons/cg";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

export default function Dashboard() {
  return (
    <div className="px-15 max-w-6xl mx-auto text-black mt-14">
        <header className="flex items-center space-x-3 mb-6">
            <div className="text-3xl">
                <BsShield size={50} className="text-text-gray-darker"/>
            </div>
            <h1 className="text-2xl font-semibold text-text-gray-darker">Admin Dashboard</h1>
        </header>

        <div className="flex flex-wrap w-fit mt-10 bg-background-gray p-1 rounded-md border-2 border-border-gray gap-3 sm:gap-5 select-none">
            <div className="bg-white text-text font-bold px-4 py-2 rounded-md cursor-pointer text-sm sm:text-base">
                Products
            </div>
            <div className="px-4 py-2 rounded-md font-bold text-text-gray cursor-pointer text-sm sm:text-base  hover:bg-gray-100">
                Admins
            </div>
        </div>

        <section className="bg-white shadow rounded p-4 mt-5">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                <span className="text-xl">
                    <BsBoxSeam size={25} />
                </span>
                <h2 className="ml-2 text-2xl font-semibold">Products</h2>
                </div>
                <button className="bg-primary-blue hover:bg-secondary-blue cursor-pointer text-white font-medium px-4 py-2 rounded">Add Product</button>
            </div>

            <input
                type="text"
                placeholder="Search Products"
                className="w-full px-3 py-2 border border-border-gray rounded mb-4"
            />

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-border-gray">
                <thead>
                    <tr className="bg-secondary-gray text-left text-text-gray text-sm">
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Price</th>
                    <th className="py-2 px-4">Stock</th>
                    <th className="py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i} className="border-t border-border-gray">
                        <td className="py-2 px-4">Gold</td>
                        <td className="py-2 px-4 font-medium">$29.99</td>
                        <td className="py-2 px-4">120</td>
                        <td className="py-2 px-4 space-x-2">
                        <button className="text-black">
                            <MdEdit size={20} />
                        </button>
                        <button className="text-red-600">
                            <FaRegTrashCan size={20} />
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>  
        </section>
    </div>
  )
}
