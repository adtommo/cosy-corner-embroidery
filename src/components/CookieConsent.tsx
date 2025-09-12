import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Link, Slide } from '@mui/material';

const COOKIE_KEY = 'cookiesAccepted';

const CookieConsent: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check localStorage only once on mount
    if (typeof window !== 'undefined') {
      const accepted = localStorage.getItem(COOKIE_KEY);
      if (!accepted) setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, 'true');
    setOpen(false);
  };

  return (
    <Slide direction="up" in={open} mountOnEnter unmountOnExit>
      <Box
        role="alertdialog"
        aria-live="polite"
        aria-label="Cookie consent"
        sx={{
          position: 'fixed',
          bottom: 24,
          left: 0,
          right: 0,
          mx: 'auto',
          maxWidth: 600,
          bgcolor: 'background.paper',
          color: 'text.primary',
          p: 3,
          borderRadius: 3,
          boxShadow: 4,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          zIndex: 2000,
          border: '1px solid rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="body2" sx={{ flex: 1, lineHeight: 1.5 }}>
          We use cookies to enhance your browsing experience, analyze traffic,
          and personalize content.{' '}
          <Link href="/privacy" underline="hover" color="primary">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link href="/terms" underline="hover" color="primary">
            Terms & Conditions
          </Link>
          .
        </Typography>

        <Button
          onClick={handleAccept}
          variant="contained"
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': { bgcolor: 'primary.dark' },
            px: 4,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
            mt: { xs: 2, sm: 0 }, // adds spacing for mobile
          }}
        >
          Accept
        </Button>
      </Box>
    </Slide>
  );
};

export default CookieConsent;
