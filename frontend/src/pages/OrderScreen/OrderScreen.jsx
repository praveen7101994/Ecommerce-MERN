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
  ListItemButton,
  ListItemText,
} from "@mui/material";

const OrderScreen = () => {
  return (
    <Grid container spacing={2} p={4}>
      <Grid item xs={8}>
        <Typography variant="h4" gutterBottom>
          Order - {"667afb9a74a790ed2233b69d"}
        </Typography>
        <Box item pl={2}>
          <Typography variant="h5" gutterBottom>
            Shipping
          </Typography>
          <Typography variant="Subtital2" gutterBottom>
            <b>Name-</b> {"Praveen Patel"}
          </Typography>
          <br />
          <Typography variant="Subtital2" gutterBottom>
            <b>Email-</b> {"praveenpatelonline@gmail.com"}
          </Typography>
          <br />
          <Typography variant="Subtital2" gutterBottom>
            <b>Address-</b> {"Namnakala, Ambikapur Chhattisgarh, 497001"}
          </Typography>

          <Stack sx={{ width: "100%" }} spacing={2} mt={2}>
            <Alert severity="success">This is a success Alert.</Alert>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" gutterBottom>
            Payment Method
          </Typography>
          <Typography variant="Subtital2" gutterBottom>
            <b>Method-</b> {"Paypal"}
          </Typography>
          <Stack sx={{ width: "100%" }} spacing={2} mt={2}>
            <Alert severity="success">This is a success Alert.</Alert>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" gutterBottom>
            Order Items
          </Typography>
          <Box border={1} borderRadius={2} borderColor="grey.300">
            <List>
              <ListItem>
                <Grid container justifyContent={"space-between"}>
                  <ListItemText primary="Product Image" />
                  <ListItemText primary="Product title" />
                  <ListItemText primary="price" />
                </Grid>
              </ListItem>
              <Divider />
              <ListItem>
                <Grid container justifyContent={"space-between"}>
                  <ListItemText primary="Product Image" />
                  <ListItemText primary="Product title" />
                  <ListItemText primary="price" />
                </Grid>
              </ListItem>
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
                Items
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent={"space-between"} p={0.75} px={4}>
            <Grid item>
              <Typography variant="Subtital2" gutterBottom>
                Items
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="Subtital2" gutterBottom>
                Items
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent={"space-between"} p={0.75} px={4}>
            <Grid item>
              <Typography variant="Subtital2" gutterBottom>
                Items
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="Subtital2" gutterBottom>
                Items
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent={"space-between"} p={0.75} px={4}>
            <Grid item>
              <Typography variant="Subtital2" gutterBottom>
                Items
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="Subtital2" gutterBottom>
                Items
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default OrderScreen;
