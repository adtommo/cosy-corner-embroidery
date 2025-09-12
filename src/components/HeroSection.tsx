import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Helmet } from 'react-helmet-async';

interface HeroSectionProps {
  videoSrc?: string;
  videoPoster?: string;
}

function HeroSection({ videoSrc, videoPoster }: HeroSectionProps) {
  return (
    <Box
      component="header"
      sx={{
        py: 8,
        px: 2,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #000B1E 0%, #0d6efd 100%)',
      }}
    >
      <Helmet>
        <title>Atomic Rocket Digital | Bespoke Websites & Automations</title>
        <meta
          name="description"
          content="Atomic Rocket Digital creates bespoke websites and automations to help UK businesses grow faster and smarter online."
        />
      </Helmet>
      {/* Video Background */}
      {videoSrc && (
        <Box
          component="video"
          autoPlay
          muted
          loop
          playsInline
          poster={videoPoster}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </Box>
      )}

      {/* Dark overlay for readability */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 11, 30, 0.6)',
          zIndex: -1,
        }}
      />

      {/* Gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />

      {/* Floating elements */}
      {[
        {
          top: '10%',
          left: '10%',
          size: 200,
          opacity: 0.1,
          anim: 'float1',
          duration: 8,
        },
        {
          top: '60%',
          right: '15%',
          size: 150,
          opacity: 0.08,
          anim: 'float2',
          duration: 6,
        },
        {
          bottom: '10%',
          left: '20%',
          size: 100,
          opacity: 0.06,
          anim: 'float3',
          duration: 4,
        },
      ].map((el, idx) => (
        <Box
          key={idx}
          sx={{
            position: 'absolute',
            top: el.top,
            bottom: el.bottom,
            left: el.left,
            right: el.right,
            width: el.size,
            height: el.size,
            background: `rgba(255, 255, 255, ${el.opacity})`,
            borderRadius: '50%',
            animation: `${el.anim} ${el.duration}s ease-in-out infinite`,
            '@keyframes float1': {
              '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
              '50%': { transform: 'translateY(-30px) rotate(180deg)' },
            },
            '@keyframes float2': {
              '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
              '50%': { transform: 'translateY(-20px) rotate(-180deg)' },
            },
            '@keyframes float3': {
              '0%,100%': { transform: 'translateY(0px) scale(1)' },
              '50%': { transform: 'translateY(-15px) scale(1.1)' },
            },
          }}
        />
      ))}

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={5} alignItems="center" justifyContent="center">
          {/* Text Column */}
          <Grid size={{ xl: 6, lg: 7, md: 8 }}>
            <Box
              sx={{
                my: 5,
                textAlign: { xs: 'center', md: 'left' },
                pr: { md: 4 },
              }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                  fontWeight: 'bold',
                  color: 'white',
                  mb: 2,
                  lineHeight: 1.2,
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                }}
              >
                Premium, Bespoke Websites & Automated Solutions for Modern
                Businesses
              </Typography>

              <Typography
                variant="h5"
                component="p"
                sx={{
                  fontWeight: 'normal',
                  color: 'rgba(255, 255, 255, 0.9)',
                  mb: 4,
                  lineHeight: 1.6,
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)',
                }}
              >
                We design and develop responsive mobile-first sites and
                automations that work for you and your business – fast,
                reliable, and built to grow!
              </Typography>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={3}
                justifyContent={{ xs: 'center', md: 'flex-start' }}
                sx={{
                  '& .MuiButton-root': { px: 4, py: 1.5, fontSize: '1.1rem' },
                }}
              >
                <Button
                  onClick={() => {
                    const el = document.getElementById('process');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: '#0d6efd',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 15px rgba(13,110,253,0.4)',
                    '&:hover': {
                      backgroundColor: '#0d6dfdd4',
                      color: '#f8f9fa',
                      boxShadow: '0 6px 20px rgba(13,110,253,0.6)',
                    },
                  }}
                >
                  Get Started
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  href="/about-us"
                  sx={{
                    color: '#f8f9fa',
                    borderColor: '#f8f9fa',
                    fontWeight: 'bold',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': { backgroundColor: '#f8f9fa', color: '#000B1E' },
                  }}
                >
                  Learn More
                </Button>
              </Stack>
            </Box>
          </Grid>

          {/* Image Column */}
          <Grid
            size={{ xl: 6, lg: 5 }}
            sx={{
              display: { xs: 'none', lg: 'flex' },
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              src="https://images.unsplash.com/vector-1738312919533-2bdd58425783?q=80&w=2920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Hero illustration"
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: 3,
                maxWidth: '100%',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HeroSection;
