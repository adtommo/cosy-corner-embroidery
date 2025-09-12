import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MailIcon from '@mui/icons-material/Mail';
import PlaceIcon from '@mui/icons-material/Place';

function GetInTouchForm() {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    honey: '',
  });

  const [loading, setLoading] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (formData.honey) return;

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.message
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      setLoading(true);

      const webAppUrl =
        'https://script.google.com/macros/s/AKfycbzQQMOm4fokWIHrYOOr5lNg_2cJlFaxMj97bkUtbOMw0zoz5_p5hQueWTyLoimaUJ2DsA/exec';
      const payload = new URLSearchParams({ ...formData });

      const response = await fetch(webAppUrl, {
        method: 'POST',
        body: payload,
      });

      const result = await response.json();

      if (result.result === 'success') {
        setShowSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          service: '',
          message: '',
          honey: '',
        });
      } else {
        setShowError(true);
      }
    } catch (err) {
      console.error(err);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccess = () => setShowSuccess(false);
  const handleCloseError = () => setShowError(false);

  const contactInfo = [
    {
      icon: MailIcon,
      title: 'Email Us',
      details: 'hello@atomicrocketdigital.com',
      subtitle: "We'll respond within a few days",
    },
    {
      icon: PlaceIcon,
      title: 'Visit Us',
      details: 'Liverpool, United Kingdom',
      subtitle: 'Virtual meetings available',
    },
  ];

  return (
    <Box
      component="section"
      id="contact"
      sx={{ py: 6, backgroundColor: '#f8f9fa', color: '#000B1E' }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Get In Touch
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'normal',
              color: 'text.secondary',
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Ready to transform your business? Let&apos;s discuss your project
            and find the perfect solution for your needs.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {/* Contact Form */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Card sx={{ boxShadow: 3, position: 'relative' }}>
              <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}
                >
                  Send Us a Message
                </Typography>

                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  aria-label="Contact form"
                >
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        required
                        fullWidth
                        name="firstName"
                        label="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        required
                        fullWidth
                        name="lastName"
                        label="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        required
                        fullWidth
                        name="email"
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        name="phone"
                        label="Phone Number"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <FormControl fullWidth disabled={loading}>
                        <InputLabel id="service-label">
                          Service Interested In
                        </InputLabel>
                        <Select
                          labelId="service-label"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                        >
                          <MenuItem value="basic">Basic Plan</MenuItem>
                          <MenuItem value="standard">Standard Plan</MenuItem>
                          <MenuItem value="ultimate">Ultimate Plan</MenuItem>
                          <MenuItem value="consultation">
                            Free Consultation
                          </MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        required
                        fullWidth
                        name="message"
                        label="Tell us about your project"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </Grid>

                    {/* Honeypot */}
                    <input
                      data-testid="honeypot"
                      type="text"
                      name="honey"
                      value={formData.honey}
                      onChange={handleChange}
                      style={{ display: 'none' }}
                    />

                    <Grid size={{ xs: 12 }}>
                      <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          sx={{
                            width: { xs: '100%', sm: 'auto' },
                            px: { sm: 6 },
                            py: 1.5,
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            borderRadius: 2,
                          }}
                          disabled={loading}
                        >
                          {loading
                            ? 'Sending...'
                            : 'Send - we usually reply within a few days'}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>

                {/* Grey overlay while sending */}
                {loading && (
                  <Box
                    data-testid="loading-overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      bgcolor: 'rgba(255,255,255,0.6)',
                      zIndex: 10,
                      borderRadius: 1,
                    }}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Information */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Box sx={{ pl: { lg: 2 } }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 4,
                  textAlign: { xs: 'center', lg: 'left' },
                }}
              >
                Other Ways to Reach Us
              </Typography>

              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <Card key={index} sx={{ mb: 3, boxShadow: 1 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            backgroundColor: 'primary.main',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2,
                          }}
                        >
                          <IconComponent aria-hidden="true" />
                        </Box>
                        <Box>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, mb: 0.5 }}
                          >
                            {info.title}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ color: 'text.primary', mb: 0.5 }}
                          >
                            {info.details}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: 'text.secondary' }}
                          >
                            {info.subtitle}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          </Grid>
        </Grid>

        {/* Success Snackbar */}
        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={handleCloseSuccess}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{ zIndex: 1800 }}
        >
          <Alert
            onClose={handleCloseSuccess}
            severity="success"
            sx={{ width: '100%' }}
          >
            Thank you! Your message has been sent successfully. We&apos;ll get
            back to you soon.
          </Alert>
        </Snackbar>

        {/* Error Snackbar */}
        <Snackbar
          open={showError}
          autoHideDuration={6000}
          onClose={handleCloseError}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{ zIndex: 1800 }}
        >
          <Alert
            onClose={handleCloseError}
            severity="error"
            sx={{ width: '100%' }}
          >
            Oops! Something went wrong. Please try again later.
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default GetInTouchForm;
