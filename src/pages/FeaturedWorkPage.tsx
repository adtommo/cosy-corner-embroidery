import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';

// Styled Card for hover effect
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
  boxShadow: theme.shadows[2],
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

export default function FeaturedWorkPage() {
  const featuredWork = [
    {
      id: 1,
      image: 'https://dummyimage.com/600x350',
      alt: 'Featured Project 1',
      title: 'Project Alpha',
      description: 'Modern web application with responsive design',
    },
    {
      id: 2,
      image: 'https://dummyimage.com/600x350/adb5bd/495057',
      alt: 'Featured Project 2',
      title: 'Project Beta',
      description: 'Mobile-first e-commerce platform',
    },
    {
      id: 3,
      image: 'https://dummyimage.com/600x350/6c757d/343a40',
      alt: 'Featured Project 3',
      title: 'Project Gamma',
      description: 'Enterprise dashboard solution',
    },
  ];

  return (
    <Box component="section" sx={{ py: 8, bgcolor: 'background.default' }}>
      <Helmet>
        <title>Our Work | Atomic Rocket Digital</title>
        <meta
          name="description"
          content="See our portfolio of bespoke websites and automation projects that help businesses improve efficiency and grow online."
        />
      </Helmet>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 'bold',
            mb: 6,
            textAlign: { xs: 'center', md: 'left' },
            color: 'text.primary',
          }}
        >
          Featured Work
        </Typography>

        <Grid container spacing={4}>
          {featuredWork.map((work) => (
            <Grid size={{ xs: 12, md: 4 }} key={work.id}>
              <StyledCard>
                <CardActionArea
                  component="article"
                  aria-labelledby={`project-title-${work.id}`}
                  aria-describedby={`project-desc-${work.id}`}
                >
                  <CardMedia
                    component="img"
                    src={work.image}
                    alt={work.alt} // ✅ accessible alt
                    height={350}
                    loading="lazy" // ✅ performance
                    sx={{
                      transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
                      '&:hover': { transform: 'scale(1.05)' },
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="h3"
                      id={`project-title-${work.id}`} // for aria-labelledby
                      sx={{ fontWeight: 600, mb: 1 }}
                    >
                      {work.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      id={`project-desc-${work.id}`} // for aria-describedby
                      sx={{ lineHeight: 1.6 }}
                    >
                      {work.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
