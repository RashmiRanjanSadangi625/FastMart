import React, { useEffect } from 'react'
import CartItem from './CartItem'
import { Button,Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../../../State/Cart/Action'
// import { Button } from '@mui/react'


const Cart = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const {cart} = useSelector(store=>store)
    const handleCheckout=()=>
    {     
        navigate('/checkout?step=2')
    }
    useEffect(()=>{

        dispatch(getCart())

    },[cart.updateCartItem,cart.deleteCartItem])        

    console.log("cart item",cart);
    
  return (
    <div>
        <div className='lg:grid grid-cols-3 lg:px-16 relative'>
            <div className='col-span-2 m-5'>
               {cart?.cart?.cartItems.map((item)=> <CartItem item={item}/>)} 
            </div>
            <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
                <div className='border border-gray-200 p-3 m-5'>
                    <p className='uppercase font-bold opacity-6- pb-4 '>Price Details</p>
                    <hr/>   
                    <div className='space-y-3 font-semibold mb-10'>
                        <div className='flex justify-between pt-3 text-black'>
                            <span>Price</span>
                            <span>₹{cart?.cart?.totalPrice }</span>
                        </div>
                        <div className='flex justify-between pt-3'>
                            <span>Discounts Applied  </span>
                            <span className='text-green-600'>₹{cart?.cart?.totalPrice - cart?.cart?. totalDiscountedPrice}</span>
                        </div>
                        <div className='flex justify-between pt-3'>
                            <span>Delivery Charge</span>
                            <span className='text-green-600'>Free</span>
                        </div>
                        <div className='flex justify-between pt-3'>
                            <span>Discount Off</span>
                            <span className='text-green-600'>{Math.floor(cart?.cart?.discountPersent)} %</span>
                        </div>
                        <div className='flex justify-between pt-3 '>
                            <span>Total Amount</span>
                            <span className='text-green-600 font-bold'>₹{cart?.cart?.totalDiscountedPrice }</span>
                        </div>
                    </div>
                    <Button onClick={handleCheckout} variant="contained" className='w-full mt-5' sx={{px:"2.5rem",py:"0.7rem",bgcolor:"#9155fd"}}> 
                    Checkout
                    </Button>
                    
                </div>
            </div>
        </div>        
    </div>
  )
}

export default Cart