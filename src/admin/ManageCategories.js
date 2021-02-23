import React,{useState,useEffect} from 'react';
import Base from "../core/Base";
import {Link} from "react-router-dom";
import {isAuthenticated} from "../auth/helper";
import { getCategories } from './helper/adminapicall';

function ManageCategories() {
    
    const [categories,setCategories] = useState([]);
    const {user,token} = isAuthenticated();

    const preload = () => {
        getCategories().then(data=>{
            setCategories(data)
        })
    }

    useEffect(()=>{
        preload()
    },[])
    

    return (
        <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total 3 products</h2>
           {
               categories.map((category,index)=>{
                    return(
                        <h3 className="text-white" key={index}>{category.name}</h3>
                    )
               })
           }
          
        </div>
      </div>
    </Base>
    )
}

export default ManageCategories
