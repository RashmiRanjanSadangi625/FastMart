import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import OrderCard from './OrderCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserOrders } from '../../../State/Order/Action'


const orderStatus = [
    {label:"On the way",value:"on_the_way"},
    {label:"Delivered",value:"delivered"},
    {label:"Cancelled",value:"cancelled"},
    {label:"Return",value:"return"}
]
const Order = () => {

    const dispatch=useDispatch();
    const {orders} = useSelector(store=>store)

    useEffect(()=>
    {
        dispatch(getAllUserOrders());

    },[dispatch])

    // console.log("orders",orders?.orders); 
    

  return (
    <div className='px-5 lg:px-20 m-5'>
        <Grid container sx={{justifyContent:"space-between"}}>
            <Grid item xs={2.5}>
                <div className='h-auto shadow-lg bg-white p-5 sticky top-5'>
                    <h1 className='font-bold text-lg'> Filter</h1>
                    <h1 className='font-semibold'>Order Status</h1>
                   {orderStatus.map((option)=> <div className='space-y-4 mt-5'>               
                        <div className='flex items-center'>
                            <input defaultValue = {option.value} type="checkbox" className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500' />
                            <label className='ml-3 text-sm text-gray-600 ' htmlFor={option.value}>{option.label}</label>
                        </div>
                    </div>)}

                </div>

            </Grid>
            <Grid item xs={9}>
                <div className='space-y-2'>
                {orders?.orders.map((item)=><OrderCard orders={item}/>)}
                </div>
            </Grid>
        </Grid>
    </div>
  )
}

export default Order



// const dispatch = useDispatch();
// const ordersState = useSelector(state => state.order);
// const orders = ordersState?.orders || []; 

// useEffect(() => {
//     dispatch(getAllUserOrders()); 
// }, [dispatch]);

// console.log("User Orders:",  orders?.orderItems);