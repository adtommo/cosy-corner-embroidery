import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  useMediaQuery,
  useTheme,
  SvgIcon,
  SvgIconProps,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

type TabType = 'faq' | 'contact';

const HelpWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('faq');

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: 'What technologies do you use?',
      answer:
        'We specialize in React, Next.js, Node.js, TypeScript, Tailwind CSS, and AWS for deployment. Our stack ensures fast, scalable, and maintainable websites.',
    },
    {
      id: 2,
      question: 'How long does a typical project take?',
      answer:
        'Most websites take 4-8 weeks depending on complexity and requirements. E-commerce sites may take 6-12 weeks.',
    },
    {
      id: 3,
      question: 'Do you provide ongoing support?',
      answer: 'Yes, we offer comprehensive maintenance and support packages.',
    },
    {
      id: 4,
      question: 'What is your pricing structure?',
      answer:
        'We provide custom quotes based on project scope and requirements.',
    },
    {
      id: 5,
      question: 'Can you work with existing websites?',
      answer:
        'Yes, we can redesign, optimize, or add features to existing websites.',
    },
    {
      id: 6,
      question: 'Do you provide hosting services?',
      answer:
        'We offer full hosting and ongoing management, or can transfer to your hosting after setup.',
    },
    {
      id: 7,
      question: 'Can you help with SEO?',
      answer:
        'Yes, all our websites are SEO-friendly and optimized for performance.',
    },
    {
      id: 8,
      question: 'Are your websites mobile responsive?',
      answer:
        'Absolutely! All our websites are mobile-first and fully responsive.',
    },
  ];

  const toggleWidget = () => setIsOpen((prev) => !prev);
  const navigate = useNavigate();

  const handleScroll = (id: string) => {
    navigate('/', { replace: false });
    const scrollWhenReady = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        requestAnimationFrame(scrollWhenReady);
      }
    };
    requestAnimationFrame(scrollWhenReady);
  };

  // Circle Button Icons
  const CircleIcon = (props: SvgIconProps) => (
    <SvgIcon {...props} viewBox="0 0 60 60">
      <path
        d="M60 30C60 51.25 51.25 60 30 60C8.75 60 0 51.25 0 30C0 8.75 8.75 0 30 0C51.25 0 60 8.75 60 30Z"
        fill="#0b5ed7"
      />
    </SvgIcon>
  );

  const ChatIcon = (props: SvgIconProps) => (
    <SvgIcon {...props} viewBox="0 0 60 60">
      <path
        d="M41.216 29.026c0 3.576-.895 5.847-2.647 7.268l-.066.052c-.213.173-.448.362-.6.559a1.958 1.958 0 0 0-.311.562c-.086.233-.117.494-.144.719l-.008.062-.303 2.48c-.063.516-.102.834-.151 1.06a1.595 1.595 0 0 1-.04.151.091.091 0 0 1-.015.006 1.42 1.42 0 0 1-.137-.076 14.087 14.087 0 0 1-.868-.626l-2.98-2.244-.041-.03a3.046 3.046 0 0 0-.53-.343 2.061 2.061 0 0 0-.554-.17 3.13 3.13 0 0 0-.648-.016l-.054.002c-.496.023-1.014.034-1.553.034-4.41 0-7.28-.758-9.048-2.22-1.721-1.421-2.602-3.683-2.602-7.23 0-3.546.88-5.808 2.602-7.23 1.769-1.46 4.639-2.22 9.048-2.22 4.41 0 7.28.76 9.048 2.22 1.721 1.422 2.602 3.684 2.602 7.23Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </SvgIcon>
  );

  const CloseIconCustom = (props: SvgIconProps) => (
    <SvgIcon {...props} viewBox="0 0 60 61">
      <path
        d="M38.125 27.625 30 35.375l-8.125-7.75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </SvgIcon>
  );

  return (
    <>
      {/* Floating Panel */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 90,
          right: 24,
          width: isSmall ? '90%' : 360,
          maxHeight: '70vh',
          bgcolor: '#fff',
          borderRadius: 2,
          boxShadow: 4,
          overflow: 'hidden',
          zIndex: 1500,
          opacity: isOpen ? 1 : 0,
          transform: isOpen
            ? 'scale(1) translateY(0)'
            : 'scale(0.8) translateY(20px)',
          transition:
            'transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55), opacity 0.25s ease',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
        role="dialog"
        aria-label="Help widget"
      >
        {/* Header */}
        <Box sx={{ bgcolor: '#0d6efd', color: '#fff', px: 2, py: 1.5 }}>
          <Typography variant="h6">How can we help?</Typography>
        </Box>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={(_, val) => setActiveTab(val)}
          variant="fullWidth"
          aria-label="Help widget tabs"
        >
          <Tab label="FAQ" value="faq" />
          <Tab
            label="Contact"
            value="contact"
            onClick={() => {
              toggleWidget();
              setActiveTab('faq');
              handleScroll('contact');
            }}
          />
        </Tabs>

        {/* Content */}
        <Box
          sx={{
            p: 2,
            overflowY: 'auto',
            maxHeight: 'calc(70vh - 180px)',
            transition: 'max-height 0.3s ease',
          }}
        >
          {activeTab === 'faq' && (
            <Box>
              {faqData.map((item) => (
                <Accordion key={item.id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`faq-content-${item.id}`}
                    id={`faq-header-${item.id}`}
                  >
                    <Typography variant="body1">{item.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" color="text.secondary">
                      {item.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          )}

          {/* Contact form is still commented out */}
        </Box>
      </Box>

      {/* Floating Circle Button */}
      <Box
        onClick={toggleWidget}
        aria-label={isOpen ? 'Close help widget' : 'Open help widget'}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && toggleWidget()}
        sx={{
          width: 60,
          height: 60,
          position: 'fixed',
          bottom: 24,
          right: 24,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 1600,
          color: '#0d6efd',
          transition:
            'transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55), box-shadow 0.25s, color 0.25s',
          transform: isOpen
            ? 'rotate(180deg) scale(1.1)'
            : 'rotate(0deg) scale(1)',
          boxShadow: isOpen
            ? '0 0 15px 5px rgba(13,110,253,0.4)'
            : '0 0 5px 0 rgba(0,0,0,0.1)',
          '&:hover': {
            transform: `${isOpen ? 'rotate(180deg)' : 'rotate(0deg)'} scale(1.2)`,
            color: '#0b5ed7',
            boxShadow: '0 0 20px 8px rgba(13,110,253,0.5)',
          },
        }}
      >
        <CircleIcon sx={{ width: 60, height: 60 }} />
        <Box sx={{ position: 'absolute' }}>
          {isOpen ? (
            <CloseIconCustom sx={{ color: '#fff', fontSize: 60 }} />
          ) : (
            <ChatIcon sx={{ color: '#fff', fontSize: 60 }} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default HelpWidget;
