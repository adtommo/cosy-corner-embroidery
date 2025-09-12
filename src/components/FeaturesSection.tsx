import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TimelineIcon from '@mui/icons-material/Timeline';

function FeaturesSection() {
  const features = [
    {
      icon: PhoneAndroidIcon,
      title: 'Mobile-First by Design',
      description:
        'Built to perform flawlessly on phones, tablets, and every screen in between.',
    },
    {
      icon: ElectricBoltIcon,
      title: 'Lightning-Fast Performance',
      description: 'Speed that keeps users engaged — and Google happy.',
    },
    {
      icon: RocketLaunchIcon,
      title: 'Beyond Templates. Beyond Limits',
      description: 'Positions you as a step above DIY platforms.',
    },
    {
      icon: TimelineIcon,
      title: 'Modern Sites. Real Results',
      description: 'Simple, direct, results-driven.',
    },
  ];

  return (
    <Box
      component="section"
      id="features"
      aria-labelledby="features-heading"
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: '#f8f9fa',
        color: '#000B1E',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6} alignItems="center">
          {/* Left Column - Main Heading */}
          <Grid
            size={{ xs: 12, lg: 4 }}
            sx={{ textAlign: { xs: 'center', lg: 'left' } }}
          >
            <Typography
              id="features-heading"
              component="h2"
              sx={{
                fontWeight: 800,
                lineHeight: 1.2,
                fontSize: { xs: '1.75rem', md: '2.25rem' },
                mb: { xs: 4, lg: 0 },
              }}
            >
              Ready When You Are.
            </Typography>
          </Grid>

          {/* Right Column - Features Grid */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Grid container spacing={6}>
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Grid
                    key={index}
                    size={{ xs: 12, md: 6 }}
                    sx={{ textAlign: { xs: 'center', md: 'left' } }}
                  >
                    {/* Feature Icon */}
                    <Box
                      aria-hidden="true"
                      sx={{
                        width: { xs: 56, md: 64 },
                        height: { xs: 56, md: 64 },
                        background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
                        color: 'white',
                        borderRadius: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                        mx: { xs: 'auto', md: 0 },
                        boxShadow: 3,
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        '&:hover, &:focus-within': {
                          transform: 'translateY(-4px)',
                          boxShadow: 6,
                        },
                      }}
                    >
                      <IconComponent fontSize="medium" />
                    </Box>

                    {/* Feature Title */}
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                      }}
                    >
                      {feature.title}
                    </Typography>

                    {/* Feature Description */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.6,
                        fontSize: { xs: '0.95rem', md: '1rem' },
                        maxWidth: { xs: '90%', md: '100%' },
                        mx: { xs: 'auto', md: 0 },
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default FeaturesSection;
