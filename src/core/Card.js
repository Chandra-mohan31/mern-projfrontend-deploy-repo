import React,{useState,useEffect} from 'react';
import ImageHelper from './helper/ImageHelper';
import {addItemToCart,removeItemFromCart} from "./helper/carthelper";
import {Redirect} from "react-router-dom";


const Card = ({
        product,
        addToCart = true,
        removeFromCart = false,
        setReload = f => f,
        //function(f){retrun f}
        reload=undefined
    }) => {

      const [redirect,setRedirect] = useState(false);
      const [count,setCount] = useState(product.count);
      const AddToCart = () => {
        addItemToCart(product,()=>{
            setRedirect(true);
        })
      }
      const getARedirect = (redirect) =>{
        if(redirect){
          return <Redirect to="/cart" />
        }
      }


       const cardTitle = product ? product.name :" A photo ";
       const cardDescription = product ? product.description :" default description ";
       const cardPrice = product ? product.price : "default price";

        const ShowAddToCart = () => {
            return(

                addToCart && (
                    <button
                onClick={AddToCart}
                className="btn btn-block btn-outline-success mt-2 mb-2"
              >
                Add to Cart
              </button>
                )
                
            )
           
        }

        const ShowRemoveFromCart = () =>{
            return(
                removeFromCart && (
                    <button
                    onClick={() => {
                      removeItemFromCart(product._id);
                      setReload(!reload); 
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                  >
                    Remove from cart
                  </button>
                )
            )
 
        }

        return (
          <div className="card text-white bg-dark border border-info mb-5 " style={{width:300,height:"50%"}}>
            <div className="card-header lead">{cardTitle}</div>
            <div className="card-body">
              {getARedirect(redirect)}
              <div className="rounded border border-success p-2">
                <ImageHelper product={product} />
                
              </div>
              <p className="lead bg-success font-weight-normal text-wrap">
                {cardDescription}
              </p>
              <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
              <div className="row">
                <div className="col-12">
                   {ShowAddToCart()}
                </div>
                <div className="col-12">
                  {ShowRemoveFromCart()}
                </div>
              </div>
            </div>
          </div>
        );
      };
    
   


export default Card
