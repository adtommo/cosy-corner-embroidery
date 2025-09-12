import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useNavigate } from 'react-router-dom';

function FooterSection() {
  const navigate = useNavigate();

  const handleScroll = (id: string) => {
    navigate('/', { replace: false });
    const scrollWhenReady = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        requestAnimationFrame(scrollWhenReady);
      }
    };
    requestAnimationFrame(scrollWhenReady);
  };

  return (
    <Box
      component="footer"
      sx={{ backgroundColor: '#000B1E', color: 'white' }}
      aria-labelledby="footer-heading"
    >
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={4} justifyContent="center" textAlign="center">
          {/* Brand */}
          <Grid size={{ xs: 12 }}>
            <Typography
              id="footer-heading"
              variant="h6"
              sx={{ fontWeight: 700 }}
            >
              Atomic Rocket Digital
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.400', mt: 1 }}>
              Building modern, fast, and reliable websites.
            </Typography>
          </Grid>

          {/* Links */}
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: 3,
              }}
              role="navigation"
              aria-label="Footer links"
            >
              <Link
                sx={{ '&:hover': { cursor: 'pointer' } }}
                href="/about-us"
                color="inherit"
                underline="hover"
              >
                About
              </Link>
              <Link
                sx={{ '&:hover': { cursor: 'pointer' } }}
                onClick={() => handleScroll('pricing')}
                href="#pricing"
                color="inherit"
                underline="hover"
              >
                Our Plans
              </Link>
              <Link
                sx={{ '&:hover': { cursor: 'pointer' } }}
                onClick={() => handleScroll('contact')}
                href="#contact"
                color="inherit"
                underline="hover"
              >
                Contact
              </Link>
              <Link href="/terms" color="inherit" underline="hover">
                Terms & Conditions
              </Link>
              <Link href="/privacy" color="inherit" underline="hover">
                Privacy Policy
              </Link>
              <Link href="/accessibility" color="inherit" underline="hover">
                Accessibility
              </Link>
            </Box>
          </Grid>

          {/* Social Icons */}
          <Grid size={{ xs: 12 }}>
            <Box>
              <IconButton
                component="a"
                color="inherit"
                href="https://facebook.com"
                target="_blank"
                aria-label="Facebook"
                rel="noopener noreferrer"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                component="a"
                color="inherit"
                href="https://twitter.com"
                target="_blank"
                aria-label="Twitter"
                rel="noopener noreferrer"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                component="a"
                color="inherit"
                href="https://linkedin.com"
                target="_blank"
                aria-label="LinkedIn"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Copyright */}
          <Grid size={{ xs: 12 }}>
            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              © {new Date().getFullYear()} Atomic Rocket Digital. All rights
              reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default FooterSection;
