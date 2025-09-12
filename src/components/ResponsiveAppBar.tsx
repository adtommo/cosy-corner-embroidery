import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import logo from '/navbar-logo.png';
import { useNavigate } from 'react-router-dom';

const pages = [
  { name: 'Home', link: '/' },
  { name: 'About Us', link: '/about-us' },
  { name: 'Our Work', link: '/our-work' },
];

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (goto?: string) => {
    if (goto) navigate(goto);
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="sticky"
      color="primary"
      elevation={3}
      component="nav"
      role="navigation"
      aria-label="Main navigation"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box
            component="a"
            href="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Avatar
              variant="square"
              src={logo}
              alt="Atomic Rocket Digital Logo"
              sx={{ width: { xs: 120, sm: 150 }, height: 'auto' }}
            />
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="Open navigation menu"
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
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={() => handleCloseNavMenu()}
              keepMounted
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.link}
                  onClick={() => handleCloseNavMenu(page.link)}
                  component="a"
                  aria-label={page.name}
                  href={page.link}
                >
                  {page.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Links */}
          <Box
            component="ul"
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 2,
              listStyle: 'none',
              m: 0,
              p: 0,
            }}
          >
            {pages.map((page) => (
              <li key={page.link}>
                <Button
                  onClick={() => handleCloseNavMenu(page.link)}
                  sx={{
                    color: 'white',
                    fontWeight: 500,
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                  }}
                  component="a"
                  href={page.link}
                >
                  {page.name}
                </Button>
              </li>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
