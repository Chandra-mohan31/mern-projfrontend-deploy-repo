

import React,{useState,useEffect} from 'react';
import Base from "../core/Base";
import {Link, Redirect} from "react-router-dom";
import {createProduct, getCategories} from "./helper/adminapicall";
import {isAuthenticated} from "../auth/helper/index";

function AddProduct() {

  const {user,token} = isAuthenticated();

  const [values,setValues] = useState({
    name:"",
    description:"",
    price:"",
    stock:"",
    photo:"",
    categories:"",
    category:"",
    loading:false,
    error:"",
    createdProduct:"",
    getARedirect:false,
    formData:""
  });

  const {name,description,price,stock,categories,category,loading,error,createdProduct,getARedirect,formData} = values;

  const preLoad = () => {
    getCategories().then(data => {
      setValues({...values,categories:data,formData:new FormData()})
      console.log("hey there");
      console.log(categories);
    })
  }
  
  const RedirectToAdminHome = () => {
    if(getARedirect){
     
        return <Redirect to="/admin/dashboard" />
      
    }
    
   
  }

 

   
  useEffect(()=>{
    preLoad()
  },[]);
  function myFunction() {
    setTimeout(function(){ setValues({...values,getARedirect:true}) }, 3000);
    
  }


  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values,error:"",loading: true});
    createProduct(user._id,token,formData)
       .then(data => {
         setValues({...values,name:"",description:"",price:"",photo:"",stock:"",loading:false,createdProduct:data.name});
         myFunction()
         
         
       })
  }
  const handleChange = (name) =>(event) => {
    const value = name ==="photo" ? event.target.files[0] : event.target.value;
    formData.set(name,value);
    setValues({...values,[name]:value})
  }

  
  
  
  const successMsg = () =>{
    return(
      <div className="alert alert-success mt-3" style={{display: createdProduct ? "" :"none"}}>
      <h4>{createdProduct} created succesfully</h4>
      
      
    </div>
    )
    
  //use loading,once success msg wait for certain time and redirect the user on home page;

  }
  
  
 

  const warnMsg = () => {
    //
  }

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories && categories.map((cate,index)=>(
            <option key={index} value={cate._id}>{cate.name}</option>
          )) }
          
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Stock"
          value={stock}
        />
      </div>
  
      <button
        
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Product
      </button>
    </form>
  );
  
  return (
    <Base
    footerstyle={{positon:"absolute",bottom: 0,right: 0,left: 0}} 
    title="Add a product here"
    description="Welcome to prouct creation section"
    className="container bg-info p-4"
    >
      
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mt-3">Admin Home</Link>
      <div className="row bg-dark text-white rounded m-4">
        <div className="col-md-8 offset-md-2 ">
          {successMsg()}
          {createProductForm()}
          {RedirectToAdminHome()}
          
          
        </div>
      </div>
    </Base>
  )
}

export default AddProduct
