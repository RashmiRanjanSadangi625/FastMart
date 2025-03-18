import React, { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, useMediaQuery, useTheme } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email';
import ArchiveIcon from '@mui/icons-material/Archive';
import Box from '@mui/material/Box';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import GradingIcon from '@mui/icons-material/Grading';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Dashboard from './components/Dashboard';
import CreateProductForm from './components/CreateProductForm';
import CustomersTable from './components/CustomersTable';
import OrdersTable from './components/OrdersTable';
import ProductsTable from './components/ProductsTable';



const menu=[
        {name:"Dashboard",path:"/admin",icon:<DashboardIcon/>},
        {name:"Products",path:"/admin/products",icon:<CategoryIcon/>},
        {name:"Customers",path:"/admin/customers",icon:<PeopleAltIcon/>},
        {name:"Orders",path:"/admin/orders",icon:<GradingIcon/>},
        {name:"Add Product",path:"/admin/product/create",icon:<ProductionQuantityLimitsIcon/>},
]
const Admin = () => {
    const theme=useTheme();

    const isLargeScreen=useMediaQuery(theme.breakpoints.up("lg"))
    const [sideBarVisible,setSideBarVisible]=useState()
    const navigate =useNavigate();

    const drawer =
    (
        <Box
        sx={{
            overflow:"auto",
            display:"flex",
            flexDirection:"column",
            justifyContent:"space-between",
            height:"100%"
        }}>
        {isLargeScreen && <Toolbar/>}
        <List>
            {menu.map((item,index)=><ListItem key={item.name} disablePadding onClick={()=>navigate(item.path)}>
                <ListItemButton>
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText>{item.name}</ListItemText>
                </ListItemButton>
            </ListItem>)}
        </List>
        
        <List>
            <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                        <AccountCircleIcon/>
                        </ListItemIcon>
                        <ListItemText>Account</ListItemText>
                    </ListItemButton>
                </ListItem>
        </List>
        </Box>
     )

  return (
    <div>
        <div className='relative flex h-[100vh]'>
            <CssBaseline/>
            <div className='w-[12%] border border-r-gray-600 border-b-0 fixed top-0'>
                {drawer}
            </div>
            <div className='w-[88%] h-full ml-[12%]'>
                <Routes>
                    <Route path='/' element={<Dashboard/>}></Route>
                    <Route path='/product/create' element={<CreateProductForm/>}></Route>
                    <Route path='/customers' element={<CustomersTable/>}></Route>
                    <Route path='/orders' element={<OrdersTable/>}></Route>
                    <Route path='/products' element={<ProductsTable/>}></Route>
                </Routes>
            </div>

        </div>
    </div>
  )
}

export default Admin