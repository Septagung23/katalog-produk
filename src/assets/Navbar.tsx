import { useState } from "react";
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
import { useNavigate, NavLink } from "react-router-dom";

function ResponsiveAppBar(props: any) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [data, setData] = useState<any>({});

  const handleLogout = async () => {
    window.localStorage.removeItem("jwt");
    navigate("/login");
  };

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
                <NavLink to="/" style={{ textDecoration: "none" }}>
                  <Button sx={{ my: 2, display: "block" }}>Product</Button>
                </NavLink>
              </MenuItem>
              {props.admin ? (
                <MenuItem>
                  <NavLink to="/add" style={{ textDecoration: "none" }}>
                    <Button sx={{ my: 2, display: "block", mr: 1 }}>
                      Tambah
                    </Button>
                  </NavLink>
                </MenuItem>
              ) : (
                <div>
                  <MenuItem>
                    <NavLink to="/cart" style={{ textDecoration: "none" }}>
                      <Button sx={{ my: 2, display: "block" }}>Cart</Button>
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink to="/History" style={{ textDecoration: "none" }}>
                      <Button sx={{ my: 2, display: "block" }}>History</Button>
                    </NavLink>
                  </MenuItem>
                </div>
              )}
            </Menu>
          </Box>
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
            {props.admin ? (
              <>
                <NavLink to="/add" style={{ textDecoration: "none" }}>
                  <Button
                    sx={{ my: 2, color: "white", display: "block", mr: 1 }}
                  >
                    Tambah
                  </Button>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/cart" style={{ textDecoration: "none" }}>
                  <Button sx={{ my: 2, color: "white", display: "block" }}>
                    Cart
                  </Button>
                </NavLink>
                <NavLink to="/History" style={{ textDecoration: "none" }}>
                  <Button sx={{ my: 2, color: "white", display: "block" }}>
                    History
                  </Button>
                </NavLink>
              </>
            )}
          </Box>
          {/* End Nav Menu */}

          <Divider
            sx={{ mx: 3 }}
            orientation="vertical"
            variant="middle"
            flexItem
          />

          <Button
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
