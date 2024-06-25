import Link from "next/link";

export default function Page(){
    return(
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="bg-white flex w-1/2  h-1/2 p-2 gap-2 items-center justify-center">
                <Link href="/addShoe" className="border border-green-500 p-2 rounded-md hover:bg-green-500 hover:text-white">Add Shoe</Link>
                <Link href="/delShoe" className="border border-red-500 p-2 rounded-md hover:bg-red-500 hover:text-white">Delete Shoe</Link>
            </div>
        </div>
    )
}