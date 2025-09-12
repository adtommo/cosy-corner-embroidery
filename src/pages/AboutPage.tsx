import { useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import { Helmet } from 'react-helmet-async';

function AboutPage() {
  // Memoized team data
  const teamMembers = useMemo(
    () => [
      {
        name: 'Adam T',
        role: 'Founder & Computational Alchemist',
        image: '/me.jpg',
        text: 'Hi, I’m Adam, the founder of Atomic Rocket Digital. I create websites and automations that help businesses work smarter, look great online, and grow efficiently. As a solo founder, I handle every project personally, from the first concept to the final launch, ensuring that every detail meets your vision and goals. I combine technical skills, creativity, and a deep understanding of business needs to deliver solutions that save time and make an impact. When I’m not coding or automating workflows, you might find me exploring the outdoors, brewing coffee, or sketching out ideas for my next project. Let’s build something that works as hard as you do.',
      },
    ],
    [],
  );

  const scrollToTarget = useCallback(() => {
    const element = document.getElementById('scroll-target');
    element?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const hoverCardSx = {
    borderRadius: 4,
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease',
    '&:hover, &:focus-within': {
      transform: 'scale(1.02)',
      outline: 'none',
    },
  };

  return (
    <Box component="main">
      <Helmet>
        <title>About Us | Atomic Rocket Digital</title>
        <meta
          name="description"
          content="Learn more about Atomic Rocket Digital, a UK-based agency building modern websites and smart automations for ambitious businesses."
        />
      </Helmet>
      {/* Hero Section */}
      <Box
        component="section"
        aria-label="Hero section: About Atomic Rocket Digital"
        sx={{
          py: 8,
          background: 'linear-gradient(135deg, #000B1E 0%, #0d6efd 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            pointerEvents: 'none',
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            right: '10%',
            width: 100,
            height: 100,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%',
            animation: 'float 4s ease-in-out infinite',
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
              color: 'white',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            About Atomic Rocket Digital.
          </Typography>
          <Typography
            component="p"
            variant="h5"
            sx={{
              fontWeight: 400,
              mb: 4,
              color: 'rgba(255,255,255,0.9)',
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            At Atomic Rocket Digital, we create premium, bespoke websites
            designed specifically for modern businesses. Our focus is on
            building responsive, mobile-first websites that not only look
            stunning but work seamlessly across all devices. We understand the
            importance of speed, reliability, and scalability, so every website
            we deliver is crafted to grow alongside your business.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={scrollToTarget}
            aria-label="Scroll to about section"
            sx={{
              backgroundColor: '#0d6efd',
              fontWeight: 'bold',
              '&:hover, &:focus': {
                backgroundColor: '#0d6dfdd4',
                color: '#f8f9fa',
                outline: 'none',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Read our story
          </Button>
        </Container>
      </Box>

      {/* Our Founding Section */}
      <Box
        component="section"
        id="scroll-target"
        aria-label="Our founding story"
        sx={{ py: 8, backgroundColor: '#f8f9fa' }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, lg: 6 }}>
              <Paper sx={hoverCardSx} tabIndex={0}>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=1332&auto=format&fit=crop"
                  alt="Our founding story"
                  loading="lazy"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <Box sx={{ pl: { lg: 4 } }}>
                <Typography
                  component="h2"
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    mb: 3,
                    color: '#1a1a1a',
                    fontSize: { xs: '2rem', md: '2.5rem' },
                  }}
                >
                  Our founding
                </Typography>
                <Typography
                  component="p"
                  variant="body1"
                  sx={{
                    fontWeight: 400,
                    color: '#666',
                    lineHeight: 1.7,
                    fontSize: '1.2rem',
                  }}
                >
                  Founded with a passion for innovation and digital excellence,
                  Atomic Rocket Digital combines creative design with
                  cutting-edge development to provide solutions tailored to your
                  unique goals. Whether you&apos;re just starting out or looking
                  to elevate your online presence, we build websites that help
                  you stand out, connect with your audience, and drive results.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Growth & Beyond Section */}
      <Box
        component="section"
        aria-label="Growth and innovation"
        sx={{ py: 8, backgroundColor: '#f8f9fa' }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, lg: 6 }} sx={{ order: { xs: 2, lg: 1 } }}>
              <Box sx={{ pr: { lg: 4 } }}>
                <Typography
                  component="h2"
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    mb: 3,
                    color: '#1a1a1a',
                    fontSize: { xs: '2rem', md: '2.5rem' },
                  }}
                >
                  Growth & beyond
                </Typography>
                <Typography
                  component="p"
                  variant="body1"
                  sx={{
                    fontWeight: 400,
                    color: '#666',
                    lineHeight: 1.7,
                    fontSize: '1.2rem',
                  }}
                >
                  Our journey continues to evolve as we push the boundaries of
                  what&apos;s possible in web development. We stay ahead of
                  industry trends, embrace emerging technologies, and constantly
                  refine our processes to deliver exceptional results. Every
                  project is an opportunity to innovate and exceed expectations.
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }} sx={{ order: { xs: 1, lg: 2 } }}>
              <Paper sx={hoverCardSx} tabIndex={0}>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1565728744382-61accd4aa148?q=80&w=1173&auto=format&fit=crop"
                  alt="Growth and innovation"
                  loading="lazy"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Box
        component="section"
        aria-label="Team section"
        sx={{
          py: 8,
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              component="h2"
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                color: '#1a1a1a',
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              The Person Behind Atomic Rocket Digital
            </Typography>
            <Typography
              component="p"
              variant="body1"
              sx={{ fontWeight: 400, color: '#666', fontSize: '1.2rem' }}
            >
              Turning ideas into Websites and Automations That Work for You
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {teamMembers.map((member, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  sx={{
                    textAlign: 'center',
                    border: 'none',
                    borderRadius: 4,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover, &:focus-within': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                      outline: 'none',
                    },
                  }}
                  tabIndex={0}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Avatar
                      src={member.image}
                      alt={member.name}
                      sx={{
                        width: 120,
                        height: 120,
                        mx: 'auto',
                        mb: 3,
                        border: '4px solid #fff',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                      }}
                    />
                    <Typography sx={{ fontWeight: 700, mb: 1 }}>
                      {member.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontStyle: 'italic',
                        color: '#666',
                        fontSize: '0.95rem',
                        mb: 2,
                      }}
                    >
                      {member.role}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: '#1a1a1a', lineHeight: 1.6 }}
                    >
                      {member.text}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default AboutPage;
