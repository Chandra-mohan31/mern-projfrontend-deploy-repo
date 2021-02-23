import React,{useState,useEffect} from 'react';
import {isAuthenticated} from "../auth/helper";
import { cartEmpty, loadCart } from './helper/carthelper';
import {Link} from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from '../backend';
import {createOrder} from "./helper/orderHelper";



function StripeCheckout({products,setReload=f=>f,reload=undefined}) {


    const [data, setData] = useState({
        loading: false,
        success: false,
        error:"",
        address:""
    });

    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;

    let amount = 0;
    const getFinalPrice = () => {
        
        products.map(p=>{
            amount = amount + p.price;
        })
        return amount
    }


    const makePayment = (token) => {
        const body = {
            token,
            products
        }
        const headers = {
            "Content-Type":"application/json"
        }
        return fetch(`${API}/stripepayment`,{
            method:"POST",
            headers,
            body: JSON.stringify(body)
        }).then(res => {
            console.log(res);
            const {status} = res;
            console.log("STATUS",status);
            //cartEmpty();
            console.log("PAYMENT SUCCESSFULL");
            cartEmpty(()=>{
                console.log("did we got a crash");
            })
            const orderData = {
                products: products,
                //transaction_id: res.transaction_id,
                amount: amount
            }
            //createOrder(userId,token,orderData)
            setReload(!reload);
            //call further methods
            //createOrder and clear cart
        })
           .catch(err => {
               console.log(err);
           })
    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckoutButton
            stripeKey="pk_test_51HQQv5Ld2gz6KU7dhaca74dptZuTmuvtboU3PvjIyIU5w9GjiQJLHqZ78ukBohZiTSLHIBaxyLUIaLUgXUvn495s002QCMZkq5"
            token={makePayment}
            amount={getFinalPrice*100}
            name="Buy the t-shirts"
            shippingAddress
            billingAddress
            >
                    <button className="btn btn-success">Pay with Stripe</button>
            </StripeCheckoutButton>
            
        ) : (<Link to="/signin">
            <button className="btn btn-warning">Signin</button>
        </Link>)
    }


    

    return (
        <div>
            <h3 className="text-white">StripeCheckout {getFinalPrice()}</h3>
            {showStripeButton()}
        </div>
    )
}

export default StripeCheckout
