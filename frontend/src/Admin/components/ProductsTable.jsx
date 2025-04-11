import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from "react";
import { deleteProduct, findProducts } from "../../State/Product/Action";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Card, CardHeader, TableSortLabel } from "@mui/material";

const ProductsTable = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);

  // Sorting state
  const [sortConfig, setSortConfig] = useState({
    key: "price",
    direction: "asc",
  });

  // Fetch products initially
  useEffect(() => {
    const data = {
      category: "",
      colors: [],
      sizes: [],
      minPrice: null,
      maxPrice: null,
      minDiscount: 0,
      sort: "price-low",
      pageNumber: 1,
      pageSize: 20,
      stock: "",
    };
    dispatch(findProducts(data));
  }, [dispatch]);

  // Handle delete product
  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  // Handle sorting when clicking table headers
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Sort the products list dynamically
  const sortedProducts = [...(products?.products?.content || [])].sort((a, b) => {
    if (sortConfig.direction === "asc") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    } else {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
  });

  return (
    <div className="p-5">
      <Card className="mt-2">
        <CardHeader title="All Products" />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="products table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    active={sortConfig.key === "category.name"}
                    direction={sortConfig.direction}
                    onClick={() => handleSort("category.name")}
                  >
                    Category
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    active={sortConfig.key === "price"}
                    direction={sortConfig.direction}
                    onClick={() => handleSort("price")}
                  >
                    Price
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">
                  <TableSortLabel
                    active={sortConfig.key === "quantity"}
                    direction={sortConfig.direction}
                    onClick={() => handleSort("quantity")}
                  >
                    Quantity
                  </TableSortLabel>
                </TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedProducts.map((item) => (
                <TableRow key={item._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell align="left">
                    <Avatar src={item.imageUrl} />
                  </TableCell>
                  <TableCell align="left">{item.title}</TableCell>
                  <TableCell align="left">{item.category?.name}</TableCell>
                  <TableCell align="left">{item.price}</TableCell>
                  <TableCell align="left">{item.quantity}</TableCell>
                  <TableCell align="left">
                    <Button variant="outlined" onClick={() => handleProductDelete(item._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default ProductsTable;
