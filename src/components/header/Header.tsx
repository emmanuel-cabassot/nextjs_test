import Link from 'next/link';
import Image from 'next/image';
import { AuthContext } from '../../context/authContext';
import { LayoutContext } from '../../context/layoutContext';
import { useContext, useEffect, useState, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
const urlApiNest = process.env.NEXT_PUBLIC_NEXT_APP_API_URL;

const pages = [{ id: 1, name: 'home', url: '/' }, { id: 2, name: 'Events', url: '/events' }, { id: 3, name: 'About', url: '/about-us' }, { id: 4, name: 'Projects', url: '/projects' }, { id: 5, name: 'Start project', url: '/start-project' }]
const userConnected = [{ id: 11, name: 'Profile', url: '/profile' }];
const userNotConnected = [{ id: 21, name: 'Login', url: '/auth/login' }, { id: 22, name: 'Register', url: '/auth/register' }];

export const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const logoutAndCloseMenu = () => {
    logout();
    handleCloseUserMenu();
  };

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

  const { meInfos, logout, user } = useContext(AuthContext);
  const { saveHeaderHeight } = useContext(LayoutContext);

  useEffect(() => {
    meInfos();

  }, []);

  useEffect(() => {
    if (headerRef.current) {
      saveHeaderHeight(headerRef.current.offsetHeight);
      console.log('headerRef', headerRef.current.offsetHeight);
    }
  }, [headerRef.current]);

  const imageProfile = user && user.profileImage != null ? user.profileImage : "tux_love_windowsd6d93104-a8f5-48c7-b882-f72f204b85cb.png";

  return (
    <>
      <AppBar
        position="static"
        ref={headerRef}
        >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Link href="/" passHref legacyBehavior>
              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                LOGO
              </Typography>

            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <Link key={page.id + 1} href={page.url} passHref legacyBehavior>
                    <MenuItem key={page.name + 1} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Link key={page.id} href={page.url} passHref legacyBehavior>
                  <Button
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page.name}
                  </Button>
                </Link>
              ))}
            </Box>

            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              flexGrow: 0,
            }}>
              {user ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="avatar" sx={{ bgcolor: "white" }} src={`${urlApiNest}/user/profile-image/${imageProfile}`} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {userConnected.map((setting) => (
                      <Link key={setting.id} href={setting.url} passHref legacyBehavior>
                        <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">{setting.name}</Typography>
                        </MenuItem>
                      </Link>
                    ))}
                    <MenuItem onClick={logoutAndCloseMenu}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  {userNotConnected.map((setting) => (
                    <Link key={setting.id} href={setting.url} passHref legacyBehavior>
                      <Button
                        key={setting.name}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                      >
                        {setting.name}
                      </Button>
                    </Link>
                  ))}
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};