import React from "react";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  return (
    <Box padding={2}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Grid container spacing={2}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          {[1, 2, 3].map((item, index) => (
            <React.Fragment key={item}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2}>
                  <img
                    src={`image${item}.jpg`}
                    alt={`Product ${item}`}
                    width="100%"
                  />
                </Grid>
                <Grid item xs={3}>
                  <Typography>Product {item}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>$19.99</Typography>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    type="number"
                    defaultValue={1}
                    inputProps={{ min: 1 }}
                    size="small" // Make the input smaller
                    sx={{ width: "60px" }} // Set a fixed width for the input
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton>
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
            <Typography>Items: 3</Typography>
            <Typography>Total Price: $59.97</Typography>
            <Divider sx={{ my: 2 }} />
            <Button
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
    </Box>
  );
};

export default Cart;
