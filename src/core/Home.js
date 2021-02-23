import React,{useState,useEffect} from 'react';
import "../styles.css";
import {API} from "../backend";
import Base from "./Base";
import Card from './Card';
import {getProducts} from "./helper/coreapicalls";

function Home() {

    const [products, setProducts] = useState([]);
    const [error,setError] = useState(false);
    const loadAllProduct = () => {
        getProducts().then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setProducts(data);
                //console.log(data);
            }
        })
    }
    useEffect(() => {
        loadAllProduct()
    }, [])
    return (
        <Base footerstyle={{positon:"absolute",bottom: 0,right: 0,left: 0}} title="Home Page" description="Welcome to our t-shirt store">
            <div className="d-flex flex-row justify-content-evenly flex-wrap text-center">
              
               {
                   products.map((product,index)=>{
                       return(
                           <Card product={product} />
                       )
                   })
               }
               

                


            </div>
        </Base>
    )
}

export default Home
