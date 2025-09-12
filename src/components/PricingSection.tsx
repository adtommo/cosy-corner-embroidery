import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';

function PricingSection() {
  const plans = [
    {
      name: 'Basic',
      price: '£40',
      period: '/ mo.',
      setup: '£200 setup fee',
      description:
        'A simple online presence with essential features to get your business started.',
      badge: null,
      features: [
        { type: 'header', text: 'Domain & Hosting' },
        { type: 'feature', text: 'Domain Setup' },
        { type: 'feature', text: 'Hosting Maintenance & Security' },
        { type: 'header', text: 'Design & Content' },
        { type: 'feature', text: 'Custom Design - Up to 5 Pages' },
        { type: 'feature', text: 'Mobile Responsive' },
        { type: 'header', text: 'Engagement' },
        { type: 'feature', text: 'Social Media Links' },
        { type: 'feature', text: 'Contact Forms' },
      ],
    },
    {
      name: 'Standard',
      price: '£65',
      period: '/ mo.',
      setup: '£400 setup fee',
      description:
        'A solid base plan to grow your customer base with enhanced features.',
      badge: 'popular',
      features: [
        { type: 'header', text: 'Everything in Basic, plus:' },
        { type: 'header', text: 'Design & Content' },
        { type: 'feature', text: 'Custom Design - Up to 20 Pages' },
        { type: 'header', text: 'Engagement & SEO' },
        { type: 'feature', text: 'Customer Reviews' },
        { type: 'feature', text: 'SEO Optimised' },
        { type: 'feature', text: 'Website Performance Reports' },
        { type: 'header', text: 'Automations' },
        { type: 'feature', text: 'Basic workflow automations' },
      ],
    },
    {
      name: 'Ultimate',
      price: '£120',
      period: '/ mo.',
      setup: '£800 setup fee',
      description:
        'Our premium plan for businesses ready to skyrocket with advanced features.',
      badge: null,
      features: [
        { type: 'header', text: 'Everything in Standard, plus:' },
        { type: 'header', text: 'Design & Content' },
        { type: 'feature', text: 'Website Refresh (1 per 12 Months)' },
        { type: 'header', text: 'E-Commerce & Integration' },
        { type: 'feature', text: 'Online Store (Unlimited Products)' },
        { type: 'feature', text: 'Online Booking System' },
        { type: 'feature', text: 'Messaging Integration' },
        { type: 'feature', text: 'Payment Gateway setup' },
        { type: 'header', text: 'Automations' },
        {
          type: 'feature',
          text: 'Advanced workflow automations to streamline your business',
        },
      ],
    },
  ];

  return (
    <Box
      component="section"
      id="pricing"
      sx={{ backgroundColor: 'grey.100', py: 12 }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 3, md: 5 } }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '2rem', md: '2.5rem' },
              color: 'black',
            }}
          >
            Our Plans
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'normal',
              color: 'text.secondary',
              fontSize: { xs: '1.1rem', md: '1.25rem' },
            }}
          >
            Each project is unique. Contact us for a free consultation and
            personalised quote.
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'normal',
              color: 'text.secondary',
              fontSize: { xs: '1.05rem', md: '1.15rem' },
              mt: 1,
            }}
          >
            If you prefer to host the site yourself after setup, you only pay
            the setup fee.
          </Typography>
        </Box>

        {/* Pricing Cards */}
        <Grid container spacing={6} justifyContent="center">
          {plans.map((plan) => (
            <Grid size={{ xs: 12, sm: 10, md: 4 }} key={plan.name}>
              <Card
                data-testid={`plan-card-${plan.name.toLowerCase()}`}
                sx={{
                  height: '100%',
                  position: 'relative',
                  border: plan.badge === 'popular' ? '2px solid' : undefined,
                  borderColor:
                    plan.badge === 'popular' ? 'primary.main' : undefined,
                  boxShadow: plan.badge === 'popular' ? 6 : 3,
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: plan.badge === 'popular' ? 8 : 6,
                  },
                }}
              >
                <CardContent sx={{ p: 5 }}>
                  {/* Plan Header */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {plan.badge === 'popular' && (
                      <StarIcon sx={{ color: '#d4af37', mr: 1 }} />
                    )}
                    <Typography
                      variant="overline"
                      sx={{
                        fontWeight: 'bold',
                        color: plan.badge ? 'primary.main' : 'text.secondary',
                        textTransform: 'uppercase',
                      }}
                    >
                      {plan.name}
                    </Typography>
                  </Box>

                  {/* Price */}
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                      <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
                        {plan.price}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" ml={1}>
                        {plan.period}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" mt={0.5}>
                      {plan.setup}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" mt={1}>
                      {plan.description}
                    </Typography>
                  </Box>

                  {/* Features */}
                  <List sx={{ p: 0 }}>
                    {plan.features.map((feature, idx) => (
                      <ListItem
                        key={idx}
                        sx={{ px: feature.type === 'feature' ? 3 : 0, py: 0.5 }}
                      >
                        {feature.type === 'header' ? (
                          <Typography
                            variant="subtitle1"
                            fontWeight={600}
                            color="text.primary"
                            mb={0.5}
                          >
                            {feature.text}
                          </Typography>
                        ) : (
                          <>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <CheckCircleIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary={feature.text} />
                          </>
                        )}
                      </ListItem>
                    ))}
                  </List>

                  {/* Popular Badge */}
                  {plan.badge === 'popular' && (
                    <Chip
                      label="Most Popular"
                      color="primary"
                      size="small"
                      sx={{ position: 'absolute', top: 16, right: 16 }}
                    />
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default PricingSection;
