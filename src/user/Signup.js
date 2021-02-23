import React,{useState,useEffect} from 'react';
import Base from "../core/Base";
import {Link} from "react-router-dom";
import {signup} from "../auth/helper/index";


const Signup = () => {


    const [values,setValues] = useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success: false
    });
    
    const {name,email,password,error,success} = values;

    const handleChange = name => event =>{
        setValues({
            ...values,error:false,[name]:event.target.value
        })
    }

    const onSubmit = (event) =>{
        event.preventDefault();
        setValues({
            ...values,error:false
        });
        signup({
            name,
            email,
            password

        })
         .then(data => {
             if(data.error){
                 setValues({
                     ...values,error: data.error,success:false
                 })
             }else{
                 setValues({
                     ...values,
                     name:"",
                     email:"",
                     password:"",
                     error:"",
                     success:true
                 })
             }
         })
         .catch((err)=> console.log("error in signup"))
    }

    const signUpForm = () =>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="mt-3 form-group">
                            <label  className="text-light">Name</label>
                            <input className="form-control" value={name} onChange={handleChange("name")} type="text" />
                        </div>
                        <div className="mt-3 form-group">
                            <label  className="text-light">Email</label>
                            <input className="form-control" value={email} onChange={handleChange("email")} type="email" />
                        </div>
                        <div className="mt-3 form-group">
                            <label  className="text-light">Password</label>
                            <input className="form-control" value={password} onChange={handleChange("password")} type="password" />
                        </div>
                        <button className="w-100 mt-4 btn btn-success btn-block " onClick={onSubmit}>SignUp</button>
                    </form>
                </div>
            </div>
        )
    }

    const successMessage = () => {

        return(
        <div className="row"><div className="col-md-6 offset-sm-3 text-left">
             <div className="alert alert-success" style={{display:success ? "" : "none"}}>
            New account successfully created.Please <Link to="/signin">Login here</Link>
        </div>
        </div>
        </div>
       
        )
    }
    const errorMessage = () => {
        return(
            <div className="row"><div className="col-md-6 offset-sm-3 text-left">
            <div className="alert alert-danger" style={{display:error ? "" : "none"}}>
            {error}
        </div>
            </div></div>
        
        )
    }
    return (
        <Base footerstyle={{positon:"absolute",bottom: 0,right: 0,left: 0}} title="signup page" description="signup a user here">
                {successMessage()}
                {errorMessage()}
                {
                    signUpForm()
                }
             {/*<p className="text-white text-center">{JSON.stringify(values)}</p>*/}
        </Base>
    )
}

export default Signup;
