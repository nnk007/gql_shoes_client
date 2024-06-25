'use client'
import Image from "next/image"
import { client } from "../../functions/initApolllo"
import { ApolloProvider, useMutation } from "@apollo/client"
import { ReactNode, useState } from "react"
import { gql } from "@/__generated__"
import { MutationAddShoeArgs } from "@/__generated__/graphql"
import Link from "next/link"
export default function Page() {

    return (
        <ApolloProvider client={client}>
            <AddShoePage />
        </ApolloProvider>
    )
}

const ADD_SHOE = gql(`
mutation AddShoe($input: ShoeInput!) {
  addShoe(input: $input) {
    id
  }
}   
`)

function AddShoePage() {
    const [{input},setInput] = useState<MutationAddShoeArgs>({input:{
        id:"",
        brand:"",
        name:"",
        images:[],
        price:1000,
        description:""
        
        }});
    const [imageURL, setImageURL] = useState("https://images.stockx.com/360/Nike-Air-Force-1-Low-White-07/Images/Nike-Air-Force-1-Low-White-07/Lv2/img01.jpg");
    const [addShoe,{loading,error,data}] = useMutation(ADD_SHOE,{
        variables:{input}
    });
    function resetForm() {
        setInput({
            input: {
                id: "",
                brand: "",
                name: "",
                images: [],
                price: 1000,
                description: ""

            }
        })
    }
    function validateForm(){
        const {id,brand,name,images,price,description} = input;
        const empty_id = id.length==0;
        const empty_brand = brand.length==0;
        const empty_name = name.length==0;
        const empty_images = images.length == 0;
        const zero_price = price == 0;
        if(empty_id || empty_brand || empty_name || empty_images || zero_price) return false;
        return true;        
    }
    function submitForm(){
        const validForm = validateForm();
        if(!validForm) return alert('Invalid form inputs');
        addShoe({
            onCompleted: () => { alert("OK") },
            onError: () => alert("Error")
        });
    }

    return (
        <div className="flex flex-col sm:w-3/4 h-full bg-white m-auto">
            <nav className="text-xl border-b">
                <div className="flex p-2 justify-between items-center bg-white">
                    <div className="text-3xl">Add shoe</div>
                    <Link href={"/"}>Back</Link>
                </div>
            </nav>
            <main className="flex flex-col">
                <div className="h-[200px] w-full p-4 relative">
                    <img alt="Shoe image" src={input.images[0] ?? imageURL} className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col border-t p-2 gap-2">
                    <Row>
                        <label htmlFor="idInput">
                            Serial:
                        </label>
                        <input className="w-full sm:w-auto" type="text" name="" id="idInput" placeholder="MODEL-ID-42" minLength={1} maxLength={20} required value={input ? input.id : ""} onChange={(e)=>{
                            e.target.reportValidity()
                            setInput(p => ({ input: { ...p.input, id: e.target.value } }))
                            }}/>
                    </Row>
                    <Row>
                        <label htmlFor="brandInput">Brand:</label>
                        <input className="w-full sm:w-auto" type="text" name="" id="brandInput" placeholder="Nike" minLength={1} required value={input ? input.brand : ""} onChange={(e) => {
                            e.target.reportValidity()
                            setInput(p => ({ input: { ...p.input, brand: e.target.value } }))
                        }} />
                    </Row>
                    <Row>
                        <label htmlFor="nameInput">Name:</label>
                        <input className="w-full sm:w-auto" type="text" name="" id="nameInput" placeholder="Air Force 1"  minLength={1} maxLength={40} required value={input ? input.name : ""} onChange={(e) => {
                            e.target.reportValidity();
                            setInput(p => ({ input: { ...p.input, name: e.target.value } }))
                        }} />
                    </Row>
                    <Row className="flex-col sm:flex-row">
                        <label htmlFor="descriptionInput">
                            Description:
                        </label>
                        <textarea className="w-full" rows={1} name="" id="descriptionInput" placeholder="Verbose description of le shoe" minLength={1} maxLength={400} required value={input && input.description ? input.description : ""} onChange={(e)=>{
                            e.target.reportValidity();
                            setInput(p=>({input:{...p.input,description:e.target.value}}))
                        }}/>
                    </Row>
                    <Row className="flex-col sm:flex-row">
                        <label htmlFor="urlInput">
                            Image:
                        </label>
                        <input className="w-full invalid:outline-red-300 invalid:outline" type="text" name="" id="urlInput" placeholder="https://example.com/shoe.jpg" minLength={1} maxLength={100} required pattern="http(s)?:\/\/(.*)\.(jpg|jpeg|png|webp)" value={input ? input.images[0] : ""} onChange={(e)=>{
                            e.target.reportValidity()
                            setInput(p => ({ input: { ...p.input, images: [e.target.value] } }))
                            }}/>
                    </Row>
                    <Row className="flex-col sm:flex-row">
                        <label htmlFor="priceInput">
                            Price:
                        </label>
                        <input className="w-full" type="number" name="" id="priceInput" placeholder="1000 USD" min={0} required value={input ? input.price : ""} onChange={(e) => {
                            e.target.reportValidity()
                            setInput(p => ({ input: { ...p.input, price: +e.target.value } }))
                        }} />
                    </Row>
                    <div className="flex items-center justify-between sm:justify-end gap-6">
                        <button className="text-gray-500 hover:text-red-600" onClick={()=>resetForm()}>Reset</button>
                        <button className="rounded-md p-2 bg-transparent transition-all font-medium border border-green-500 hover:bg-green-500 hover:text-white" onClick={()=>submitForm()}>Submit</button>
                    </div>
                </div>
            </main>
        </div>
    )
}

function Row({ children,className }: { children: ReactNode,className?:string }) {
    return (
        <div className={`flex gap-2 ${className ? className : ''}`}>
            {children}
        </div>
    )
}