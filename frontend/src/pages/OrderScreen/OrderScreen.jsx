import React, { useEffect } from "react";
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
  Button,
} from "@mui/material";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalCleintIdQuery,
  useDeliverOrderMutation,
} from "../../slices/ordersApiSlice";
import { useParams } from "react-router-dom";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { useSnackbar } from "../../components/common/snackbar/SnackbarProvider";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: isLoadingDeliver }] =
    useDeliverOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalCleintIdQuery();

  const userInfo = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: "pending",
        });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  const showSnackbar = useSnackbar();

  const handleDeliver = async () => {
    try {
      await deliverOrder(order._id);
      refetch();
      showSnackbar("Order updated to delivered", "success");
    } catch (error) {
      showSnackbar(error?.data?.error || error?.message, "error");
    }
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        showSnackbar("Payment Successful", "success");
      } catch (error) {
        showSnackbar(error?.data?.error || error?.message, "error");
      }
    });
  };

  const onApproveTest = async () => {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    showSnackbar("Payment Successful", "success");
  };

  const onError = (error) => {
    showSnackbar(error.message, "error");
  };
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

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
              {order.isDelivered
                ? `Delivered on ${order.deliveredAt.substring(0, 10)}`
                : "Not Delivered"}
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
              {order.isPaid
                ? `Paid on ${order.paidAt.substring(0, 10)}`
                : "Unpaid"}
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

          {!order.isPaid && (
            <>
              {loadingPay && <>Loading pay</>}
              {isPending ? (
                <>pending</>
              ) : (
                <div>
                  {/* <Button
                    onClick={onApproveTest}
                    mt={2}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Place Order
                  </Button>
                  <br /> */}
                  <br />
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  ></PayPalButtons>
                </div>
              )}
            </>
          )}
        </Box>
        {!order.isDelivered && order.isPaid && (
          <Button
            sx={{ mt: 2 }}
            onClick={handleDeliver}
            variant="contained"
            color="primary"
            fullWidth
          >
            Deliver Order
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default OrderScreen;
