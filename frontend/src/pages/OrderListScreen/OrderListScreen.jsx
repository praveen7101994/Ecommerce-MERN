import React from "react";
import { useGetAllOrdersQuery } from "../../slices/ordersApiSlice";
import SortableTable from "../../components/common/SortableTable/SortableTable";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrderListScreen = () => {
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetAllOrdersQuery({ page: 1, limit: 10 });

  const columns = [
    { id: "_id", label: "Id" },
    { id: "user", label: "User" },
    { id: "createdAt", label: "Date" },
    { id: "totalPrice", label: "Total" },
    { id: "paidAt", label: "Paid" },
    { id: "isDelivered", label: "Delivered" },
  ];

  const navigate = useNavigate();

  return (
    <Grid container p={2}>
      <h1>Orders</h1>
      <Grid container mt={2}>
        {!isLoading && (
          <SortableTable
            columns={columns}
            rows={order.items}
            buttonTitle="View Details"
            onButtonClick={(row) => navigate(`/order/${row._id}`)}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default OrderListScreen;
