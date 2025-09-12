import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { Helmet } from 'react-helmet-async';

function TermsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TermsOfService',
    name: 'Atomic Rocket Digital Terms & Conditions',
    datePublished: '2024-12-01',
    dateModified: '2024-12-01',
    description:
      "The terms and conditions for using Atomic Rocket Digital's website and services.",
    url: window.location.href,
  };

  return (
    <Box>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Helmet>
        <title>Terms & Conditions | Atomic Rocket Digital</title>
        <meta
          name="description"
          content="Read the Terms & Conditions for using Atomic Rocket Digital’s website and services. Know your rights and responsibilities."
        />
      </Helmet>
      {/* Hero Header Section */}
      <Box
        component="header"
        sx={{
          py: 8,
          background: 'linear-gradient(135deg, #000B1E 0%, #0d6efd 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontWeight: 900,
                mb: 3,
                fontSize: { xs: '2.5rem', md: '4rem' },
                color: 'white',
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
            >
              Terms & Conditions
            </Typography>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontWeight: 400,
                mb: 4,
                color: 'rgba(255, 255, 255, 0.9)',
                maxWidth: 800,
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1.25rem', md: '1.5rem' },
              }}
            >
              Our terms of service for using Atomic Rocket Digital&apos;s
              website and services
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Terms Content Section */}
      <Box component="main" sx={{ py: 8, backgroundColor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <Paper
            component="article"
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: '#666', mb: 4, fontStyle: 'italic' }}
            >
              Last Updated: December 2024
            </Typography>

            <Box sx={{ '& > *': { mb: 4 } }}>
              <Box component="section">
                <Typography
                  variant="h3"
                  component="h3"
                  sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a' }}
                >
                  1. Acceptance of Terms
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ lineHeight: 1.7, color: '#444' }}
                >
                  By accessing and using Atomic Rocket Digital&apos;s website
                  and services, you agree to be bound by these terms. If you do
                  not agree, please do not use the service.
                </Typography>
              </Box>

              <Divider />

              <Box component="section">
                <Typography
                  variant="h3"
                  component="h3"
                  sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a' }}
                >
                  2. Definitions
                </Typography>
                <ul style={{ paddingLeft: '1.5rem', color: '#444' }}>
                  <li>
                    <strong>Company, we, us, our:</strong> Atomic Rocket Digital
                  </li>
                  <li>
                    <strong>Service:</strong> Website and bespoke websites &
                    automated solutions provided
                  </li>
                  <li>
                    <strong>User, you, your:</strong> Individual accessing or
                    using the service
                  </li>
                  <li>
                    <strong>Content:</strong> All information, data, text,
                    software, media, or other materials
                  </li>
                </ul>
              </Box>

              <Divider />

              <Box component="section">
                <Typography
                  variant="h3"
                  component="h3"
                  sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a' }}
                >
                  3. Use License
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ lineHeight: 1.7, color: '#444', mb: 2 }}
                >
                  Permission is granted to temporarily view materials for
                  personal, non-commercial use. Under this license you may not:
                </Typography>
                <ul style={{ paddingLeft: '1.5rem', color: '#444' }}>
                  <li>Modify or copy materials</li>
                  <li>Use materials for commercial purposes without consent</li>
                  <li>Reverse engineer any software</li>
                  <li>Remove copyright or proprietary notices</li>
                </ul>
                <Typography
                  variant="body1"
                  sx={{ lineHeight: 1.7, color: '#444', mt: 2 }}
                >
                  This license terminates automatically if you violate any of
                  these restrictions.
                </Typography>
              </Box>

              <Divider />

              <Box component="section">
                <Typography
                  variant="h3"
                  component="h3"
                  sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a' }}
                >
                  4. Website Use and Contact Forms
                </Typography>
                <Typography
                  variant="h4"
                  component="h4"
                  sx={{ fontWeight: 600, mb: 1, color: '#333' }}
                >
                  4.1 Contact Inquiries
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ lineHeight: 1.7, color: '#444', mb: 2 }}
                >
                  By submitting forms, you:
                </Typography>
                <ul style={{ paddingLeft: '1.5rem', color: '#444' }}>
                  <li>Provide accurate information</li>
                  <li>Consent to us contacting you</li>
                  <li>
                    Understand submission does not create a binding contract
                  </li>
                </ul>
                <Typography
                  variant="h4"
                  component="h4"
                  sx={{ fontWeight: 600, mb: 1, color: '#333' }}
                >
                  4.2 Service Quotes
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ lineHeight: 1.7, color: '#444' }}
                >
                  Quotes are estimates valid for 30 days and may vary based on
                  project scope.
                </Typography>
              </Box>

              <Divider />

              <Box component="section">
                <Typography
                  variant="h3"
                  component="h3"
                  sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a' }}
                >
                  5. User Conduct
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ lineHeight: 1.7, color: '#444', mb: 2 }}
                >
                  You agree not to use our website for unlawful acts, spamming,
                  harassment, or malicious code.
                </Typography>
              </Box>

              <Divider />

              <Box component="section">
                <Typography
                  variant="h3"
                  component="h3"
                  sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a' }}
                >
                  6. Governing Law
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ lineHeight: 1.7, color: '#444' }}
                >
                  These Terms are governed by the laws of England and Wales.
                  Disputes fall under the jurisdiction of English courts.
                </Typography>
              </Box>

              <Divider />

              <Box component="section">
                <Typography
                  variant="h3"
                  component="h3"
                  sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a' }}
                >
                  7. Contact Information
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ lineHeight: 1.7, color: '#444', mb: 1 }}
                >
                  Questions about these Terms? Contact us at:
                </Typography>
                <Typography
                  variant="body1"
                  component="a"
                  href="mailto:hello@atomicrocketdigital.com"
                  sx={{
                    lineHeight: 1.7,
                    color: '#0d6efd',
                    fontWeight: 600,
                    textDecoration: 'underline',
                  }}
                >
                  hello@atomicrocketdigital.com
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

export default TermsPage;
