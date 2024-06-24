import { useState, useEffect } from "react";
import React from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  FormControl,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../../slices/cartSlice";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const { shippingAddress } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  const handleChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, []);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 6,
        }}
      >
        <Typography component="h1" variant="h5">
          Shipping
        </Typography>
        <Box sx={{ mt: 1 }}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Select Payment Method
            </FormLabel>
            <RadioGroup
              onChange={handleChange}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={paymentMethod}
              name="radio-buttons-group"
            >
              <FormControlLabel
                value={paymentMethod}
                control={<Radio />}
                label="PayPal"
              />
            </RadioGroup>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
            // disabled={!address || !city || !postalCode || !country}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PaymentScreen;
