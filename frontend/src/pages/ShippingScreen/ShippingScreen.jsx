import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";

import FormContainer from "../../components/Header/FormContainer";
import { useSnackbar } from "../../components/common/snackbar/SnackbarProvider";

const ShippingScreen = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const showSnackbar = useSnackbar();

  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  //   const { search } = useLocation();
  //   const sp = new URLSearchParams(search);
  //   const redirect = sp.get("redirect") || "/";

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await register({
        address,
        city,
        postalCode,
        country,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      //   navigate(redirect);
    } catch (error) {
      // alert("error", error?.data?.message || error.error);
      showSnackbar(error?.data?.message || error.error, "error");
    }
  };
  return (
    <FormContainer>
      <Container maxWidth="sm">
        <Box
          sx={{
            mt: 6,
          }}
        >
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
              label="country"
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
              disabled={isLoading}
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
