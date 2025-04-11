import React, { useEffect, useState } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import OrderTracker from './OrderTracker'
import { Box, Button, Grid, Rating } from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../../State/Order/Action';
import { useParams } from 'react-router-dom';
import RatingReviewModal from '../RatingReviews/RatingReviewModal';
import { getRatingReviews } from '../../../State/RatingReview/Action';
import { findProductsById } from '../../../State/Product/Action';

const OrderDetails = () => {
    const [OpenRatingReviewModal,setOpenRatingReviewModal]=useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch=useDispatch();
    const { orders, ratingReview, auth } = useSelector(store => store);
    const { orderId, productId } = useParams();

    useEffect(() => {
        if (orderId) {
            dispatch(getOrderById(orderId));
        }

        if (auth?.user?._id && productId) {
            dispatch(getRatingReviews(auth.user._id, productId));
        }
    }, [dispatch, orderId, auth?.user?._id, productId]); 

 
    const handleOpen = () => {
        setOpenRatingReviewModal(true);
      };
    const handleClose = () => {
        setOpenRatingReviewModal(false); 
    };

    
    console.log("orderdetails",orders?.order?.orderItems); 
    console.log("ratingReview",ratingReview?.ratingReview?.ratings?.length);
    console.log("productId",productId);
    
  return (
    <div className=' px:5 lg:px-20 '>
        <div>
            <h1 className='font-bold text-xl py-7'>Delivery Address</h1>
            <AddressCard address={orders?.order?.shippingAddress}/>
        </div>
        <div className='py-20'>
        <OrderTracker activeStep={
                orders?.order?.orderStatus === "CONFIRMED" ? 1 :
                orders?.order?.orderStatus === "SHIPPED" ? 2 :
                orders?.order?.orderStatus === "OUT_FOR_DELIVERY" ? 3 :
                orders?.order?.orderStatus === "DELIVERED" ? 4 :
                0 
        } />
        </div>
        <Grid container className='space-y-5' >
        {orders?.order?.orderItems
    ?.filter((item) => item?.product?._id === productId) // Filter matching productId
    ?.map((item) => <Grid  className='shadow-xl roounded-md p-5 border border-gray-200' sx={{alignItems:"center",justifyContent:"space-between"}} item container>
                <Grid item sx={6}>
                    <div className='flex items-center space-x-2'>
                        <img className =' w-[6rem] h-[6rem] object-cover object-top'src={item?.product?.imageUrl}/>
                        <div className='space-y-2 mt-2'>
                            <p className='font-semibold '>{item?.product?.title}</p>
                            <p className='space-x-5 opacity-50 text-xs font-semibold'><span>Color: {item?.product?.color}</span><span>Size: {item?.size}</span></p>
                            <p>Seller : {item?.product?.brand}</p>
                            <p>
                                <span className='font-semibold'>₹{item?.product?.discountedPrice} </span>
                                <span className=' text-gray-400 font-semibold line-through'>₹{item?.product?.price} </span>
                                <span className='text-green-500 font-semibold'>{item?.product?.discountPersent} % off</span>
                            </p>
                        </div>
                    </div>
                </Grid>
                <Grid item>
    {orders?.order?.orderStatus === "DELIVERED" && (
        <Box sx={{ color: "red" }}>
            {ratingReview?.ratingReview?.ratings?.length > 0 ? (
                <Rating
                    value={ratingReview.ratingReview.ratings[0]?.rating || 0}  
                    readOnly
                />
            ) : (
                <Button onClick={() => setOpenRatingReviewModal(true)}>Rate & Review Product</Button>
            )}
            <RatingReviewModal
                handleClose={handleClose}
                open={OpenRatingReviewModal}
                productId={item?.product?._id}
            />
        </Box>
    )}
</Grid>

            </Grid>)}
        </Grid>        
    </div>
  )
}

export default OrderDetails