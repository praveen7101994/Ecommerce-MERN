import React from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import ProductImg from "./../../images/Product.jpg";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  addToCart,
  removeFromCart,
  clearCartItem,
} from "./../../slices/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    navigate("/login?redirect=/shipping");
  };

  const handleClearCart = () => {
    dispatch(clearCartItem());
  };
  return (
    <Box padding={2}>
      <Grid container item md={7} justifyContent="space-between">
        <Grid item>
          <Typography variant="h4" gutterBottom>
            Shopping Cart
          </Typography>
        </Grid>
        <Grid item>
          {/* <Button onClick={handleClearCart} startIcon={<DeleteIcon />}>
            Clear cart
          </Button> */}
          {cartItems.length > 0 && (
            <>
              <span>Clear cart</span>
              <IconButton onClick={handleClearCart}>
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </Grid>
      </Grid>
      {cartItems.length === 0 ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={7} lg={6}>
            <Alert icon={false} severity="info">
              Your cart is empty.
            </Alert>
          </Grid>
          <Grid item xs={12} md={5} lg={6}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Button variant="contained" color="primary">
                Go Back
              </Button>
            </Link>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {/* Left Column */}
          <Grid item xs={12} md={8}>
            {cartItems.map((item, index) => (
              <React.Fragment key={item}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={2}>
                    <img
                      src={ProductImg}
                      alt={`Product ${item.name}`}
                      width="100%"
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Link
                      to={`/product/${item._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {item.name}
                    </Link>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>{`$ ${item.price}`}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={item.qty}
                        label=""
                        size="small"
                        onChange={(e) =>
                          handleAddToCart(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <MenuItem key={x + 1} value={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton onClick={() => handleRemoveFromCart(item._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
                {index < 2 && <Divider />}
              </React.Fragment>
            ))}
          </Grid>
          {/* Right Column */}
          <Grid item xs={12} md={4}>
            <Box padding={2} border={1} borderRadius={2} borderColor="grey.300">
              <Typography variant="h6">Subtotal</Typography>
              <Typography>
                Items: {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </Typography>
              <Typography>
                Total Price:{"$ "}
                {cartItems.reduce(
                  (acc, item) => acc + item.price * item.qty,
                  0
                )}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Button
                onClick={handleCheckout}
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "orange",
                  "&:hover": {
                    backgroundColor: "darkorange",
                  },
                }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Cart;
