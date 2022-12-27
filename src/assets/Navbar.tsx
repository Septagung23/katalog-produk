import * as React from "react";
import axios from "axios";
import { api } from "../constant/constant";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
} from "@mui/material/";
import { Divider } from "@mui/material";
import AlbumRoundedIcon from "@mui/icons-material/AlbumRounded";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate, NavLink } from "react-router-dom";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("jwt");
    navigate("/login");
  };

  React.useEffect(() => {
    checkAdmin();
  }, [navigate]);

  async function checkAdmin() {
    try {
      const token = window.localStorage.getItem("jwt");
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await axios.get(`${api}/user/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsAdmin(true);
    } catch (error) {
      setIsAdmin(false);
      navigate("/");
      return;
    }
  }

  return (
    // Logo + Judul
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AlbumRoundedIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            KATALOG
          </Typography>
          {/* End Logo + Judul */}

          {/* Nav Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem>
                <Typography textAlign="center">Product</Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign="center">Tambah</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "flex-end",
              display: { xs: "none", md: "flex" },
            }}
          >
            <NavLink to="/" style={{ textDecoration: "none" }}>
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                Product
              </Button>
            </NavLink>
            {isAdmin && (
              <>
                <NavLink to="/add" style={{ textDecoration: "none" }}>
                  <Button
                    sx={{ my: 2, color: "white", display: "block", mr: 1 }}
                  >
                    Tambah
                  </Button>
                </NavLink>
              </>
            )}
          </Box>
          {/* End Nav Menu */}

          <Divider orientation="vertical" variant="middle" flexItem />

          <Button
            sx={{
              mx: 3,
            }}
            size="small"
            variant="contained"
            color="error"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
