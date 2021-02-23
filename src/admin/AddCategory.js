import React,{useState} from 'react';
import Base from "../core/Base";
import {isAuthenticated } from "../auth/helper";
import {Link} from "react-router-dom";
import {createCategory} from "./helper/adminapicall";


function AddCategory() {
    const [name,setName] = useState("");
    const [success,setSuccess] = useState(false);
    const [error,setError] = useState(false);
    const {user,token} = isAuthenticated();

    const goBack = () => (
        <div className="mt-5">
            <Link className="btn btn-dark mb-3" to="/admin/dashboard">Admin Home</Link>
        </div>
    )

    const handleChange = e => {
        setError("");
        setName(e.target.value);
        
        
    }



    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        //backend request fired
        createCategory(user._id,token,{name})
            .then(data => {
                if(data.error){
                    setError(true);
                    console.log("error");
                }else{
                    setError("");
                    setSuccess(true);
                    console.log("success");
                }
            })
        setName("");
    }

    const successMsg = () => {
        if(success){
            return <h4 className="text-success">Category created successfully..</h4>
        }
    }

    const warnMsg = () =>{
        if(error){
            return <h4 className="text-success">Category created failed..</h4>
        }
    }

    const myCategoryForm = () => {
        return(
        <form action="">
            <div className="form-group">
                <p className="lead">Enter the category</p>
                <input type="text" className="form-control my-3" value={name} onChange={handleChange} autoFocus required placeholder="for EX.summer" />
                <button className="mb-2 btn btn-outline-info" onClick={handleSubmit}>Create Category</button>
            </div>
        </form>
        )}
    
    return (
        <Base title="Create a category here" description="add a new catgory for new t-shirts" className="container bg-info p-4">
            <div className="row bg-white rounded">
                <div className="col-8 offset-md-2">
                    {successMsg()}
                    {warnMsg()}
                    {myCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    )
}

export default AddCategory
