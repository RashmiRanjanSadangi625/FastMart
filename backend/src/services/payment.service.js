const axios  = require("axios");
const razorpay=require("../config/razorpayClient")
const orderService = require("./order.service")

const createPaymentLink = async(orderId)=>{

    const key_id = "rzp_test_mLmCk76UiPlo9e"; 
    const key_secret = "hQSVgTdcEKbNskqtJWimlKop";
    // const jwtToken=localStorage.getItem("jwt")

    try {
        const order =await orderService.findOrderById(orderId);
        

        const paymentLinkRequest = {
            amount: Number(order.totalPrice) * 100,     
            currency: "INR",
            customer: {
                name: `${order.user?.firstName || "Guest"} ${order.user?.lastName || ""}`, 
                contact: order.user?.mobile || "9887458741", 
                email: order.user?.email || "guest@example.com" 
            },
            notify: {
                sms: true,
                email: true
            },
            reminder_enable: true,
            callback_url: `http://localhost:5173/payments/${orderId}`,
            callback_method: "get" 
        };

        const response = await axios.post(
            "https://api.razorpay.com/v1/payment_links/",
            paymentLinkRequest,
            {
              auth: {
                username: key_id, 
                password: key_secret
              },
              headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${jwtToken}`
              },
            }
          );
          
          

        const paymentLinkId = response.data.id;
        const payment_link_url = response.data.short_url;

        const resData = {
            paymentLinkId,
            payment_link_url
        };


        return resData;

        
    } catch (error) {throw new Error(error.message)}
    

}


const updatePaymentInformation=async(reqData)=>
{
    const paymentId=reqData.paymentId;
    const orderId=reqData.orderId;

    try 
    {
        const order =orderServie.findOrderById(orderId);

        const payment =await razorpay.payment.fetch(paymentId)

        if(payment.status =="captured")
        {
            order.paymentDetails.paymentId=paymentId;
            order.paymentDetails.status="COMPLETED";
            order.orderStatus="PLACED"

            await order.save();
        }
        const resData={message:"Your order is placed",success:true}

        return resData;
        
    } catch (error) {
        throw new Error(error.message)}

}

module.exports={
    createPaymentLink,
    updatePaymentInformation
}