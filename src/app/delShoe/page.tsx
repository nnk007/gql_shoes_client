'use client'
import Image from "next/image"
import { client } from "../../functions/initApolllo"
import { ApolloProvider, useMutation, useQuery } from "@apollo/client"
import { ReactNode, useState } from "react"
import { gql } from "@/__generated__"
import Link from "next/link"
export default function Page() {

    return (
        <ApolloProvider client={client}>
            <DelShoePage />
        </ApolloProvider>
    )
}

const SHOES = gql(`
    query Shoes {
      shoes {
        id
        name
        brand
        images
        description
        price
      }
    } 
`);

const DEL_SHOE = gql(`
mutation DelShoe($delShoeId: String!) {
  delShoe(id: $delShoeId)
}  
`)

function DelShoePage() {
    const [id,setID] = useState("");
    const {loading,error,data} = useQuery(SHOES);
    const [delShoe,{}] = useMutation(DEL_SHOE,{onCompleted:(data,co)=>{
        alert("OK");
    }});
    async function deleteShoe(id:string){
        delShoe({variables:{
            delShoeId:id
        }});

    }
    return (
        <div className="flex flex-col sm:w-3/4 h-screen bg-white m-auto">
            <nav className="text-xl border-b">
                <div className="flex p-2 justify-between items-center bg-white">
                    <div className="text-3xl">Delete shoe</div>
                    <Link href={"/"}>Back</Link>
                </div>
            </nav>
            <div className="flex flex-col">
                <div className="grid grid-cols-3 text-center justify-items-center pb-2 border-b">
                    <div>ID</div>
                    <div>NAME</div>
                    <div>THUMB</div>
                </div>
                {data && data.shoes.map(shoe=>{
                    return <div key={shoe.id} className="grid grid-cols-3 text-center justify-items-center">
                        <div>{shoe.id}</div>
                        <div>{shoe.name}</div>
                        <div className="relative h-[100px]">
                            <img src={shoe.images[0]} alt="" className="h-full w-full object-contain" />
                        </div>
                    </div>
                })}
            </div>
            <main className="flex flex-col">
                <div className="flex p-2 items-center justify-center gap-2">
                    <div>
                        <label htmlFor="">
                            ID:
                        </label>
                        <input type="text" name="" id="" placeholder="AF1-2020" value={id} onChange={(e) => setID(e.target.value)} />
                    </div>
                    <button className="px-4 py-2 border border-red-600 hover:bg-red-500 hover:text-white transition-all rounded-sm" onClick={()=>deleteShoe(id)}>DELETE</button>
                </div>
            </main>
        </div>
    )
}