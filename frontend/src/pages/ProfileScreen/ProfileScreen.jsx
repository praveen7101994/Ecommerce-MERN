import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "../../slices/usersApiSlice";
import { useSnackbar } from "./../../components/common/snackbar/SnackbarProvider";
import { setCredentials } from "./../../slices/authSlice";
import { useGetMyOrdersQuery } from "../../slices/ordersApiSlice";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPassword] = useState("");

  const showSnackbar = useSnackbar();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const {
    data: orders,
    isLoading: loadingOrders,
    error: ordersError,
  } = useGetMyOrdersQuery();

  console.clear();
  console.log("orders", orders);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      showSnackbar("Password do not match", "error");
    }
    try {
      const res = await updateProfile({
        _id: userInfo._id,
        name,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials(res));
      showSnackbar("Profile updated successfully", "success");
    } catch (error) {
      showSnackbar(error?.data?.message || error.message, "error");
    }
  };

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo.name, userInfo.email]);

  return (
    <Grid container p={4} spacing={2}>
      <Grid item md={4} sm={12}>
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <FormControl variant="outlined" fullWidth autoComplete="off">
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="off"
            value={name}
            InputLabelProps={{
              shrink: name ? true : false,
            }}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="off"
            value={email}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <TextField
            size="small"
            margin="normal"
            required
            fullWidth
            type="password"
            label="Password"
            name="password"
            autoComplete="new password"
            value={password}
            InputLabelProps={{
              shrink: password ? true : false,
            }}
            onChange={(e) => setPassword(e.target.value)}
          /> */}
          <TextField
            required
            id="outlined-required"
            label="Password"
            size="small"
            value={password}
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Confirm Password"
            size="small"
            value={confirmPass}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
          />
          <Button onClick={handleSubmit} variant="contained">
            Update Profile
          </Button>
        </FormControl>
      </Grid>
      <Grid item md={8} sm={12}>
        <Typography component="h1" variant="h5">
          My Orders
        </Typography>

        {loadingOrders && (
          <Grid container item alignItems="center" justifyContent="center">
            <CircularProgress />
          </Grid>
        )}

        {!loadingOrders && !ordersError && (
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ORDER ID</TableCell>
                  <TableCell align="center">DATE</TableCell>
                  <TableCell align="center">TOTAL</TableCell>
                  <TableCell align="center">PAID</TableCell>
                  <TableCell align="center">DELIVERED</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders &&
                  orders.map((order, idx) => (
                    <TableRow
                      key={idx}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Link to={`/order/${order._id}`}>{order._id}</Link>
                      </TableCell>
                      <TableCell align="center">
                        {order.createdAt.substring(0, 10)}
                      </TableCell>
                      <TableCell align="center">{order.totalPrice}</TableCell>
                      <TableCell align="center">
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <CloseIcon />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {order.isDelivered ? <DoneIcon /> : <CloseIcon />}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileScreen;
