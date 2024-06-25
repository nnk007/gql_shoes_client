import { gql } from "@/__generated__";
import { Shoe } from "@/__generated__/graphql";
import { useQuery, useSubscription } from "@apollo/client"
import Image from "next/image";
import { ReactNode, useContext, useState } from "react";
import { CryptoRateContext, PaymentMethod, PaymentMethodContext } from "./Context";
import Link from "next/link";

const RATE_CHANGED = gql(`
subscription RateChanged {
  rateChanged
}
`)

export function Storefront() {
    const [paymentMethod, setPM] = useState(PaymentMethod.CRYPTO);
    const { loading, error, data } = useSubscription(RATE_CHANGED,{onError:(err)=>{
        console.error(err);
    }});
    const rate = data ? data.rateChanged : 100000
    return (
        <PaymentMethodContext.Provider value={paymentMethod}>
            <CryptoRateContext.Provider value={!loading && data ? data.rateChanged : 10000}>
                <div className="flex flex-col sm:w-3/4 h-full bg-white m-auto">
                    <nav className="text-xl border-b relative z-0">
                        <div className="flex p-2 justify-between items-center bg-white">
                            <div className="text-3xl">Shoe store</div>
                            <div className="flex gap-2">
                                <Link className={`hidden sm:inline-block bg-green-600 hover:bg-green-500 px-4 py-2 rounded-md text-white transition-colors`} href={"/manageShoes"}>Manage shoes</Link>
                                <div className="flex items-center gap-1">
                                    <div>$$</div>
                                    <ToggleButton enabled={paymentMethod == PaymentMethod.CRYPTO} onToggle={(isCrypto) => setPM(isCrypto ? PaymentMethod.CRYPTO : PaymentMethod.FIAT)} />
                                    <div>BNB</div>
                                </div>
                            </div>
                        </div>
                        {
                            paymentMethod==PaymentMethod.CRYPTO &&
                            <div className="absolute -z-10 animate-slideIn translate-y-full left-0 w-full px-2 bg-gradient-to-tr from-yellow-400 to-yellow-500">
                                <div>BNBUSDT: {loading ? 'Loading...' : data ? data.rateChanged : 'ERR'}</div>
                            </div>
                        }
                    </nav>
                    <FeaturedShoes />
                    <ShoesTable />
                </div>
            </CryptoRateContext.Provider>
        </PaymentMethodContext.Provider>
    )
}

function ToggleButton({enabled,onToggle: handleToggle}:{enabled:boolean,onToggle:(enabled:boolean)=>any}) {
    return (
        <div className={`w-[3rem] h-[1.5rem] p-1 border rounded-full flex items-center relative`} onClick={()=>{handleToggle(!enabled)}}>
            <div className={`w-[1rem] h-[1rem] border rounded-full ${enabled ?  "bg-yellow-300" : "bg-green-600"} transition-all absolute shadow ${enabled ? 'translate-x-[150%]':'translate-x-0'}`}></div>
        </div>
    )
}


const FEATURED_SHOES = gql(`
query FeaturedShoes {
  featuredShoes {
    images
    name
    brand
    price
  }
}
`)

function FeaturedShoes() {
    const { loading, error, data } = useQuery(FEATURED_SHOES);
    const paymentMethod = useContext(PaymentMethodContext);
    const rate = useContext(CryptoRateContext);
    if (!data) return <div className="h-[400px] w-full relative z-0"></div>
    const price = paymentMethod == PaymentMethod.FIAT ? data.featuredShoes[0].price : data.featuredShoes[0].price / rate
    return (
        <div className="p-2">
            <div className="text-3xl">Shoe of the month</div>
            <div className="h-[400px] w-full relative z-0">
                <Image alt={data.featuredShoes[0].name} src={data.featuredShoes[0].images[0]} fill className="object-contain" />
                <div className="z-10 absolute top-0 right-0 h-full p-2 flex flex-col items-center sm:justify-center w-full sm:w-auto rounded-md text-2xl">
                    <div className="invisible sm:visible p-2 rounded-md bg-black/10 text-center">{data.featuredShoes[0].brand}</div>
                    <div>{data.featuredShoes[0].name}</div>
                    <div title={'' + price} className="text-green-400">{price.toPrecision(4)}{paymentMethod==PaymentMethod.FIAT ? "$$":"BNB"}</div>
                </div>
            </div>
        </div>
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

function ShoesTable() {
    const { loading, error, data } = useQuery(SHOES);
    if (!data) return null;
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-fr auto-cols-[200px] gap-2 p-2">
            {data.shoes.map(shoe =><ShoeTableCard key={shoe.id} shoe={shoe} />)}
        </div>
    )
}
function ShoeTableCard({ shoe }: { shoe: Shoe }) {
    const paymentMethod = useContext(PaymentMethodContext);
    const rate = useContext(CryptoRateContext);
    const price = paymentMethod == PaymentMethod.FIAT ? shoe.price : shoe.price / rate
    return (
        <div className="flex flex-col p-2 rounded-md justify-between">
            <div className="w-full h-[200px] relative">
                <Image alt="" src={shoe.images[0]} fill className="object-contain" />
            </div>
            <div className="text-xl">{shoe.name}</div>
            <div className="text-gray-400 flex justify-between">
                <div className="w-full">{shoe.brand}</div>
                <div className="overflow-hidden whitespace-nowrap text-ellipsis w-full text-end">{shoe.id}</div>
            </div>
            <div className="py-4"></div>
            <button className=" text-green-500 hover:bg-green-500 hover:text-white transition-all rounded-md px-4 py-2 flex flex-col sm:flex-row gap-1 justify-evenly">
                <span>Buy now</span>
                <span className="border-l border-l-white"></span>
                <span title={'' + price}>{price.toPrecision(4)}{paymentMethod==PaymentMethod.FIAT ? "$$" : "BNB"}</span>
            </button>
        </div>
    )
}