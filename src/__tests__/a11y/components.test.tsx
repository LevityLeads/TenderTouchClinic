import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';

// Configure axe for WCAG 2.2 AA
const axeOptions = {
  runOnly: {
    type: 'tag' as const,
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
  },
  rules: {
    // Disable rules that need full page context
    region: { enabled: false },
    'page-has-heading-one': { enabled: false },
  },
};

describe('Accessibility Tests', () => {
  describe('Button component', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Button>Click me</Button>);
      const results = await axe(container, axeOptions);
      expect(results).toHaveNoViolations();
    });

    it('has no violations when rendered as link', async () => {
      const { container } = render(<Button href="/test">Link button</Button>);
      const results = await axe(container, axeOptions);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Footer component', () => {
    it('has no accessibility violations', async () => {
      const { container } = render(<Footer />);
      const results = await axe(container, axeOptions);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Layout components', () => {
    it('Container has no violations', async () => {
      const { container } = render(
        <Container>
          <p>Content</p>
        </Container>
      );
      const results = await axe(container, axeOptions);
      expect(results).toHaveNoViolations();
    });

    it('Section has no violations', async () => {
      const { container } = render(
        <Section>
          <p>Content</p>
        </Section>
      );
      const results = await axe(container, axeOptions);
      expect(results).toHaveNoViolations();
    });
  });
});
