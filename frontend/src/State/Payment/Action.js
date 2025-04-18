import { api } from "../../config/apiConfig";
import{
    CREATE_PAYMENT_FAILURE,
    CREATE_PAYMENT_REQUEST,
    UPDATE_PAYMENT_REQUEST
} from "./ActionType"

export const createPayment=(orderId)=> async (dispatch)=>
{
    dispatch({ type: CREATE_PAYMENT_REQUEST });
    
    try {
        const { data } = await api.post(`/api/payments/${orderId}`,{});
        // console.log("console",data);
 
        if(data.payment_link_url)
        {
            window.location.href=data.payment_link_url
        }        
        
    } catch (error) {
        dispatch({ type: CREATE_PAYMENT_FAILURE, payload: error.message });
    }
}

export const updatePayment=(reqData)=> async (dispatch)=>
    {
        dispatch({ type: UPDATE_PAYMENT_REQUEST });
        
        try {
            const { data } = await api.get(`/api/payemnts/?payment_id=${req.paymentId}&order_id=${reqData.orderId}`); 
            console.log("update payment:",data);            
        } catch (error) {
            dispatch({ type: CREATE_PAYMENT_FAILURE, payload: error.message });
        }
    }