import React from "react";
import {
  Typography,
  Divider,
  Stack,
  Alert,
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { useGetOrderDetailsQuery } from "../../slices/ordersApiSlice";
import { useParams } from "react-router-dom";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  console.log("error", error);

  return error ? (
    <Grid container spacing={2} p={4}>
      <Stack sx={{ width: "100%" }} spacing={2} mt={2}>
        <Alert severity="warning">{error.data.message}</Alert>
      </Stack>
    </Grid>
  ) : isLoading ? (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: "5em",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <Grid container spacing={2} p={4}>
      <Grid item xs={8}>
        <Typography variant="h5" gutterBottom>
          Order - {order?._id}
        </Typography>
        <Box item pl={2}>
          <Typography variant="h5" gutterBottom>
            Shipping
          </Typography>
          <Typography variant="Subtital2" gutterBottom>
            <b>Name-</b> {order?.user?.name}
          </Typography>
          <br />
          <Typography variant="Subtital2" gutterBottom>
            <b>Email-</b> {order.user.email}
          </Typography>
          <br />
          <Typography variant="Subtital2" gutterBottom>
            <b>Address-</b>{" "}
            {`${order.shippingAddress.address} ${order.shippingAddress.city} ${order.shippingAddress.country} ${order.shippingAddress.postalCode}`}
          </Typography>

          <Stack sx={{ width: "100%" }} spacing={2} mt={2}>
            <Alert severity={order.isDelivered ? "success" : "warning"}>
              {order.isDelivered ? "Delivered" : "Not Delivered"}
            </Alert>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" gutterBottom>
            Payment Method
          </Typography>
          <Typography variant="Subtital2" gutterBottom>
            <b>Method-</b> {order.paymentMethod}
          </Typography>
          <Stack sx={{ width: "100%" }} spacing={2} mt={2}>
            <Alert severity={order.isPaid ? "success" : "warning"}>
              {order.isPaid ? "Paid" : "Unpaid"}
            </Alert>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" gutterBottom>
            Order Items
          </Typography>
          <Box border={1} borderRadius={2} borderColor="grey.300">
            <List>
              {order.orderItems.map((orderItem, index) => (
                <>
                  <ListItem key={index}>
                    <Grid container justifyContent={"space-between"}>
                      <ListItemText primary="Product Image" />
                      <ListItemText primary={orderItem.name} />
                      <ListItemText primary={orderItem.price * orderItem.qty} />
                    </Grid>
                  </ListItem>
                  {index < order.orderItems.length - 1 && <Divider />}
                </>
              ))}
            </List>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box border={1} borderRadius={2} borderColor="grey.300">
          <Typography variant="h5" p={2}>
            Order Summary
          </Typography>

          <Divider />

          <Grid container justifyContent={"space-between"} p={0.75} px={4}>
            <Grid item>
              <Typography variant="Subtital2" gutterBottom>
                Items
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="Subtital2" gutterBottom>
                ${order.itemsPrice}
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent={"space-between"} p={0.75} px={4}>
            <Grid item>
              <Typography variant="Subtital2" gutterBottom>
                Shipping
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="Subtital2" gutterBottom>
                ${order.shippingPrice}
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent={"space-between"} p={0.75} px={4}>
            <Grid item>
              <Typography variant="Subtital2" gutterBottom>
                Tax
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="Subtital2" gutterBottom>
                ${order.taxPrice}
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent={"space-between"} p={0.75} px={4}>
            <Grid item>
              <Typography variant="Subtital2" gutterBottom>
                Total
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="Subtital2" gutterBottom>
                ${order.totalPrice}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default OrderScreen;
