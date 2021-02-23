import React,{useState} from 'react';
import Base from "../core/Base";
import {Link,Redirect} from "react-router-dom";
import { signin,authenticate,isAuthenticated } from '../auth/helper';


const Signin = () => {
    
    

    const [values,setValues] = useState({
        email:"",
        password:"",
        error:"",
        loading:false,
        didRedirect:false
        
    });

    const {email,password,error,loading,didRedirect} = values;

    const {user} = isAuthenticated();


    const handleChange = name => event =>{
        setValues({
            ...values,error:false,[name]:event.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setValues({
            ...values,error:false,loading: true
        });
        signin({
            email,
            password
        })
        .then(data => {
            if(data.error){
                setValues({
                    ...values,error: data.error,loading:false
                })
            }else{
                authenticate(data,()=>{
                    setValues({
                        ...values,
                        didRedirect: true
                    })

                })//when we have a next we can use a callback function here;
               
            }
        })
        .catch((err)=> console.log("error in signup"))

        //return Redirect("/home");
    }

    const performRedirect = () =>{
        
        if(didRedirect){
            if(user && user.role === 1){
                return <Redirect to="/admin/dashboard" />
            }else{
                return <Redirect to="/user/dashboard" />
                
            }
        }
        
        if (isAuthenticated()) {
            return <Redirect to="/" />;
          }
          
        
    }

    const loadingMessage = () => {

        return(
            
            loading && (
                <div className="alert alert-info" >
                    <h2>loading...</h2>
                </div>
            )
       
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

    const signInForm = () =>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        
                        <div className="mt-4 form-group">
                            <label  className="text-light">Email</label>
                            <input value={email} onChange={handleChange("email")} className="form-control" type="email" />
                        </div>
                        <div className="mt-4 form-group">
                            <label  className="text-light">Password</label>
                            <input value={password} onChange={handleChange("password")}  className="form-control" type="password" />
                        </div>
                        <button onClick={onSubmit} className="w-100 mt-4 btn btn-success btn-block  " >SignIn</button>
                    </form>
                </div>
            </div>
        )
        }
    
    return (
        <Base title="signin page" description="signin a user here">
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
            
        </Base>
    )
}

export default Signin;




