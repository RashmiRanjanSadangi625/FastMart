import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import React, { useEffect } from 'react'
import { deleteProduct, findProducts } from '../../State/Product/Action';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarGroup, Button, Card, CardHeader, Menu, MenuItem } from '@mui/material';
import { confirmOrder, deleteOrder, deliveredOrder, getOrders, shipOrder } from '../../State/Admin/Order/Action';

const OrdersTable = () => {

  const dispatch=useDispatch();
  const [anchorEl, setAnchorEl] = React.useState([]);
  // const open = Boolean(anchorEl);

  const handleClose = (index) => {
    const newAnchorElArray=[...anchorEl];
    newAnchorElArray[index]=null
    setAnchorEl(newAnchorElArray);
  };
  const handleClick = (event,index) => {
    const newAnchorElArray=[...anchorEl];
    newAnchorElArray[index]=event.currentTarget
    setAnchorEl(newAnchorElArray);
  };

  const {adminOrder}=useSelector(store=>store)
  useEffect(()=>{
    dispatch(getOrders())
  },[adminOrder.confirmed,adminOrder.delivered,adminOrder.shipped,adminOrder.deleteOrder])

 const handleShippedOrder=(orderId)=>{  
  dispatch(shipOrder(orderId))
  handleClose()
 }
 const handleConfirmedOrder=(orderId)=>{
  dispatch(confirmOrder(orderId))
  handleClose()
 }
  
 const handleDeliveredOrder=(orderId)=>{
  dispatch(deliveredOrder(orderId))
  handleClose()
 }

 const handleDeleteOrder=(orderId)=>{
  dispatch(deleteOrder(orderId))

 }
 console.log("Admin order",adminOrder);
 
  return (
    <div className='p-10'>
      <Card className='mt-2'>
        <CardHeader title="Recent Orders"/>

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Id&nbsp;</TableCell>
            <TableCell align="left">Price&nbsp;</TableCell>
            <TableCell align="left">Status&nbsp;</TableCell> 
            <TableCell align="left">Update&nbsp;</TableCell>           
            <TableCell align="left">Delete&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {adminOrder?.orders.map((item,index) => (
            <TableRow
              key={item?.product?.imageUrl}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='left'>
                <AvatarGroup max={3} sx={{justifyContent:"start"}}>
                 {item.orderItems.map((orderItem)=> <Avatar src={orderItem?.product?.imageUrl}/>)}
                </AvatarGroup> 
              </TableCell>
              <TableCell align="left" scope='row'>
                 {item.orderItems.map((orderItem)=> <p>{orderItem?.product?.title}</p>)}
              </TableCell>
              <TableCell align="left">{item._id}</TableCell>
              <TableCell align="left">{item.totalPrice}</TableCell>
              <TableCell align="left"><span className=
              {`${item.orderStatus == "CONFIRMED"?"bg-[green]":
              item.orderStatus=="SHIPPED"?"bg-[blue]":
              item.orderStatus=="PLACED"?"bg-[gray]":
               item.orderStatus=="PENDING"?"bg-[orange]":"bg-[red]"} text-white rounded px-5 py-2`}>{item.orderStatus}</span></TableCell>

              <TableCell align="left">
                <Button
                  id="basic-button"
                  aria-controls={`basic-menu-${item._id}`}
                  aria-haspopup="true"
                  aria-expanded={Boolean(anchorEl[index])}
                  onClick={(event)=>handleClick(event,index)}
                >
                  Status
                </Button>
                <Menu
                  id={`basic-menu-${item._id}`}
                  anchorEl={anchorEl[index]}
                  open={Boolean(anchorEl[index])}
                  onClose={()=>handleClose(index)}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
               }}
           >
          <MenuItem onClick={()=>handleConfirmedOrder(item._id)}>Confirmed</MenuItem>
          <MenuItem onClick={()=>handleShippedOrder(item._id)}>Shipped</MenuItem>
          <MenuItem onClick={()=>handleDeliveredOrder(item._id)}>Delivered</MenuItem>
        </Menu>
              </TableCell>    
              <TableCell align="left">
                <Button 
                onClick={()=>handleDeleteOrder(item._id)}
                variant='outlined'>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      </Card>
      
    </div>
  )
}

export default OrdersTable