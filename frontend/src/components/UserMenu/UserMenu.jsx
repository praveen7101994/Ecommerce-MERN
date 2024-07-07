import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/authSlice";
import { useSnackbar } from "../common/snackbar/SnackbarProvider";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [logoutApiCall] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showSnackbar = useSnackbar();
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      showSnackbar(error?.data?.error, "error");
    }
  };

  const handleProfile = () => {
    navigate("/profile");
    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? (
    <div style={{ border: "1px solid #febd69" }}>
      <Button
        onClick={handleClick}
        sx={{
          whiteSpace: "nowrap",
          color: "white",
        }}
      >
        {userInfo.name}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleProfile}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  ) : (
    <Button
      onClick={handleSignIn}
      sx={{
        whiteSpace: "nowrap",
        color: "white",
      }}
    >
      Sign-In
    </Button>
  );
};

export default UserMenu;
