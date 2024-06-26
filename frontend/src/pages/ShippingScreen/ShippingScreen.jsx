import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import OrderSteper from "./../../components/OrderSteper/OrderSteper";
import FormContainer from "../../components/Header/FormContainer";
import { saveShippingAddress } from "../../slices/cartSlice";

const ShippingScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };
  return (
    <FormContainer>
      <Container maxWidth="sm">
        <Box
          sx={{
            mt: 4,
          }}
        >
          <OrderSteper activeStep={0} />
          <Typography component="h1" variant="h5">
            Shipping
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              address="address"
              autoComplete="address"
              autoFocus
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              id="city"
              label="City"
              city="city"
              autoComplete="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              id="postal"
              label="Postal Code"
              name="postal code"
              autoComplete="postal"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              name="country"
              label="Country"
              type="country"
              id="country"
              autoComplete="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
              disabled={!address || !city || !postalCode || !country}
            >
              Continue
            </Button>
          </Box>
        </Box>
      </Container>
    </FormContainer>
  );
};

export default ShippingScreen;
