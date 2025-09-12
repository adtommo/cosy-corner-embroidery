import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Helmet } from 'react-helmet-async';

function AccessibilityPage() {
  const accessibilityFeatures = useMemo(
    () => [
      {
        title: 'Keyboard Navigation',
        description: 'Full keyboard accessibility for all interactive elements',
      },
      {
        title: 'Screen Reader Compatible',
        description: 'Works with JAWS, NVDA, VoiceOver, and TalkBack',
      },
      {
        title: 'High Contrast',
        description: 'Color schemes meet WCAG contrast requirements',
      },
      {
        title: 'Responsive Text',
        description: 'Text can be resized up to 200% without loss of function',
      },
    ],
    [],
  );

  const hoverCardSx = {
    height: '100%',
    borderRadius: 3,
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    '&:hover, &:focus-within': {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
      outline: 'none',
    },
  };

  return (
    <Box component="main">
      <Helmet>
        <title>Accessibility Statement | Atomic Rocket Digital</title>
        <meta
          name="description"
          content="Atomic Rocket Digital is committed to accessibility, ensuring our websites are inclusive and usable for everyone."
        />
      </Helmet>
      {/* Hero Header Section */}
      <Box
        component="section"
        aria-label="Hero section: Accessibility Statement"
        sx={{
          py: 8,
          background: 'linear-gradient(135deg, #000B1E 0%, #0d6efd 100%)',
          position: 'relative',
          overflow: 'hidden',
          color: 'white',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '30%',
            left: '5%',
            width: 60,
            height: 60,
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            animation: 'float 3s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-10px)' },
            },
          }}
        />
        <Container
          maxWidth="lg"
          sx={{ position: 'relative', zIndex: 2, textAlign: 'center', py: 6 }}
        >
          <Typography
            component="h1"
            variant="h1"
            sx={{
              fontWeight: 900,
              mb: 3,
              fontSize: { xs: '2.5rem', md: '4rem' },
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              animation: 'slideInDown 1s ease-out',
              '@keyframes slideInDown': {
                from: { opacity: 0, transform: 'translateY(-30px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            Accessibility Statement
          </Typography>

          <Typography
            component="p"
            variant="h5"
            sx={{
              fontWeight: 400,
              mb: 4,
              maxWidth: 800,
              mx: 'auto',
              lineHeight: 1.6,
              animation: 'fadeInUp 1s ease-out 0.3s both',
              '@keyframes fadeInUp': {
                from: { opacity: 0, transform: 'translateY(20px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            Our commitment to making our website accessible to everyone
          </Typography>
        </Container>
      </Box>

      {/* Accessibility Features Section */}
      <Box
        component="section"
        aria-label="Accessibility features"
        sx={{
          py: 8,
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 800,
              mb: 6,
              textAlign: 'center',
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Accessibility Features
          </Typography>

          <Grid container spacing={4}>
            {accessibilityFeatures.map((feature, index) => (
              <Grid key={index} size={{ xs: 12, sm: 12, md: 3 }}>
                <Card
                  sx={hoverCardSx}
                  tabIndex={0}
                  role="region"
                  aria-label={feature.title}
                >
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <CheckCircleIcon
                      sx={{ fontSize: 48, color: '#0d6efd', mb: 2 }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a' }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: '#666', lineHeight: 1.6 }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Detailed Accessibility Content */}
      <Box
        component="section"
        aria-label="Accessibility details"
        sx={{ py: 8, backgroundColor: '#f8f9fa' }}
      >
        <Container maxWidth="lg">
          <Paper
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              animation: 'fadeInScale 0.8s ease-out',
              '@keyframes fadeInScale': {
                from: { opacity: 0, transform: 'scale(0.95)' },
                to: { opacity: 1, transform: 'scale(1)' },
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: '#666', mb: 4, fontStyle: 'italic' }}
            >
              Last Updated: December 2024
            </Typography>

            {/* Sections */}
            {[
              {
                heading: 'Our Commitment to Accessibility',
                body: 'Atomic Rocket Digital is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to ensure our website is accessible to all visitors.',
              },
              {
                heading: 'Conformance Status',
                body: 'We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards, as required by UK accessibility regulations.',
              },
              {
                heading: 'Assistive Technologies',
                body: 'Our website is designed to be compatible with:',
                list: [
                  'Screen readers (including JAWS, NVDA, VoiceOver, and TalkBack)',
                  'Voice recognition software',
                  'Keyboard-only navigation',
                  'Screen magnification software',
                  'High contrast and dark mode displays',
                  'Mobile accessibility features',
                ],
              },
              {
                heading: 'Feedback and Support',
                body: 'We welcome your feedback on the accessibility of our website. If you encounter any accessibility barriers or have suggestions for improvement, please contact us:',
                contact: 'Email: hello@atomicrocketdigital.com',
                note: 'Please use "Accessibility Feedback" in your subject line. We aim to respond within 5 business days.',
              },
              {
                heading: 'Alternative Contact Methods',
                body: 'If you experience difficulty using our online contact form due to accessibility issues, you can also reach us directly via email at hello@atomicrocketdigital.com.',
              },
              {
                heading: 'Legal Compliance',
                body: 'We aim to comply with:',
                list: [
                  'The Public Sector Bodies (Websites and Mobile Applications) Accessibility Regulations 2018',
                  'The Equality Act 2010',
                  'Web Content Accessibility Guidelines (WCAG) 2.1 Level AA',
                  'European Accessibility Act requirements',
                ],
              },
              {
                heading: 'Continuous Improvement',
                body: 'Accessibility is an ongoing commitment. We regularly:',
                list: [
                  'Review and update our accessibility practices',
                  'Test new content and features for accessibility',
                  'Stay current with accessibility best practices and guidelines',
                  'Incorporate user feedback into our improvement processes',
                  'Provide accessibility training for our team',
                ],
              },
              {
                heading: 'Contact Information',
                body: 'For any questions about this accessibility statement or to report accessibility issues, please contact us at:',
                contact: 'Email: hello@atomicrocketdigital.com',
              },
            ].map((section, i) => (
              <Box key={i} sx={{ mb: 4 }}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, mb: 2, color: '#1a1a1a' }}
                >
                  {section.heading}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.7,
                    color: '#444',
                    mb: section.list || section.contact ? 1 : 3,
                  }}
                >
                  {section.body}
                </Typography>
                {section.list && (
                  <Box component="ul" sx={{ pl: 3, color: '#444', mb: 2 }}>
                    {section.list.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </Box>
                )}
                {section.contact && (
                  <Typography
                    variant="body1"
                    sx={{ color: '#0d6efd', fontWeight: 600, mb: 2 }}
                  >
                    {section.contact}
                  </Typography>
                )}
                <Divider />
              </Box>
            ))}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

export default AccessibilityPage;
