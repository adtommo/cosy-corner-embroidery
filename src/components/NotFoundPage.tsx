import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function NotFoundPage() {
  const goBack = () => window.history.back();

  const floatingElements = [
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
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000B1E 0%, #0d6efd 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      {/* Floating Background Circles */}
      {floatingElements.map((el, idx) => (
        <Box
          role="presentation"
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

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        {/* 404 Text */}
        <Typography
          sx={{
            fontSize: { xs: '8rem', md: '12rem', lg: '15rem' },
            fontWeight: 900,
            color: 'rgba(255, 255, 255, 0.2)',
            lineHeight: 0.8,
            mb: 2,
            textShadow: '0 0 50px rgba(255, 255, 255, 0.1)',
            animation: 'pulse404 3s ease-in-out infinite',
            '@keyframes pulse404': {
              '0%,100%': { transform: 'scale(1)', opacity: 0.2 },
              '50%': { transform: 'scale(1.05)', opacity: 0.3 },
            },
          }}
        >
          404
        </Typography>

        {/* Main Heading */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 800,
            color: 'white',
            mb: 3,
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            animation: 'slideInUp 1s ease-out 0.3s both',
            '@keyframes slideInUp': {
              from: { opacity: 0, transform: 'translateY(30px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          Houston, we have a problem!
        </Typography>

        {/* Subheading */}
        <Typography
          variant="h5"
          sx={{
            color: 'rgba(255, 255, 255, 0.9)',
            mb: 6,
            fontWeight: 400,
            maxWidth: 600,
            mx: 'auto',
            animation: 'fadeIn 1s ease-out 0.6s both',
            '@keyframes fadeIn': {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
          }}
        >
          The page you&apos;re looking for seems to have launched into orbit.
          Our mission control is here to help you get back on track!
        </Typography>

        {/* Go Back Button */}
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={goBack}
          sx={{
            px: 4,
            py: 2,
            fontSize: '1.1rem',
            fontWeight: 600,
            color: 'white',
            borderColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: 3,
            textTransform: 'none',
            mb: 6,
            transition: 'all 0.3s ease',
            animation: 'slideInLeft 1s ease-out 0.9s both',
            '@keyframes slideInLeft': {
              from: { opacity: 0, transform: 'translateX(-30px)' },
              to: { opacity: 1, transform: 'translateX(0)' },
            },
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderColor: 'white',
              transform: 'translateX(-5px)',
            },
          }}
        >
          Go Back
        </Button>
      </Container>
    </Box>
  );
}

export default NotFoundPage;
