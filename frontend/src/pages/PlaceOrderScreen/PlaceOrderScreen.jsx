import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Typography,
  Divider,
  Button,
  Box,
  Container,
} from "@mui/material";
import { useCreateOrderMutation } from "./../../slices/ordersApiSlice";
import { clearCartItem } from "./../../slices/cartSlice";
import { useSnackbar } from "../../components/common/snackbar/SnackbarProvider";
import OrderSteper from "../../components/OrderSteper/OrderSteper";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showSnackbar = useSnackbar();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const handlePlaceOrder = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItem());
      navigate(`/order/${res._id}`);
    } catch (err) {
      showSnackbar(err, "error");
    }
  };

  return (
    <Container
      // padding={2}
      sx={{
        mt: 4,
      }}
    >
      <Grid
        container
        spacing={2}
        // alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid item md={6} px={4}>
          <OrderSteper activeStep={2} />
        </Grid>
        {/* First Column */}
        <Grid item xs={8}>
          <Box mb={2}>
            <Typography variant="h5">Shipping</Typography>
            <Typography variant="body1">
              {`${cart.shippingAddress.address}, ${cart.shippingAddress.city}, ${cart.shippingAddress.postalCode}, ${cart.shippingAddress.country}`}
            </Typography>
          </Box>
          <Divider />
          {/* Payment Method Section */}
          <Box my={2}>
            <Typography variant="h5">Payment Method</Typography>
            <Typography variant="body1">{cart.paymentMethod}</Typography>
          </Box>
          <Divider />
          {/* Order Items Section */}
          <Box my={2}>
            <Typography variant="h5">Order Items</Typography>
            <Box mt={1}>
              {cart.cartItems.map((item) => (
                <Box key={item.id} mb={2}>
                  <Divider />
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={2}>
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Link to={`/product/${item._id}`}>
                        <Typography variant="body1">{item.name}</Typography>
                      </Link>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body1">{item.price}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Second Column */}
        <Grid item xs={4}>
          {[
            { label: "Subtotal", value: cart.itemsPrice },
            { label: "Tax", value: cart.taxPrice },
            { label: "Shipping", value: cart.shippingPrice },
            { label: "Total", value: cart.totalPrice },
          ].map((row, index) => (
            <Box key={index}>
              <Grid container justifyContent="space-between" my={1}>
                <Grid item>
                  <Typography variant="body1">{row.label}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">{row.value}</Typography>
                </Grid>
              </Grid>
              <Divider />
            </Box>
          ))}
          <Box mt={2}>
            <Button
              onClick={handlePlaceOrder}
              variant="contained"
              color="primary"
              fullWidth
            >
              Place Order
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlaceOrderScreen;
