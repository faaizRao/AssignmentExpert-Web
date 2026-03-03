# Usage Guide for New Components

This guide provides practical examples for using the newly implemented components.

## 1. Services Hero Section

Use this component on service pages to create an attractive hero section with a background image.

### Example Usage

```tsx
import ServicesHeroSection from '@/components/home/ServicesHeroSection';

export default function ServicesPage() {
  return (
    <>
      <ServicesHeroSection
        title="Our Academic Services"
        subtitle="Professional support for all your academic needs"
      />
      {/* Rest of your page content */}
    </>
  );
}
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| title | string | Yes | Main heading text |
| subtitle | string | Yes | Subheading text |

## 2. Modal Component

A reusable modal component with accessibility features and animations.

### Example Usage

```tsx
'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

export default function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Modal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="My Modal Title"
        size="lg"
      >
        <p>Your modal content goes here...</p>
        <Button onClick={() => setIsOpen(false)}>
          Close
        </Button>
      </Modal>
    </>
  );
}
```

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| isOpen | boolean | Yes | - | Controls modal visibility |
| onClose | function | Yes | - | Callback when modal should close |
| title | string | Yes | - | Modal header title |
| children | ReactNode | Yes | - | Modal content |
| size | 'sm' \| 'md' \| 'lg' \| 'xl' | No | 'lg' | Modal width |

### Features

- **Backdrop Click**: Closes modal when clicking outside
- **ESC Key**: Closes modal when pressing Escape
- **Focus Trap**: Keeps keyboard focus within modal
- **Body Scroll Lock**: Prevents background scrolling
- **Focus Restoration**: Returns focus to trigger element on close
- **Portal Rendering**: Renders at document body level

## 3. Quote Form Modal

Pre-configured modal with the quote form integrated.

### Example Usage

```tsx
'use client';

import { useState } from 'react';
import QuoteFormModal from '@/components/forms/QuoteFormModal';
import Button from '@/components/ui/Button';

export default function MyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        Get a Quote
      </Button>

      <QuoteFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| isOpen | boolean | Yes | Controls modal visibility |
| onClose | function | Yes | Callback when modal should close |

### Behavior

- Automatically closes 2 seconds after successful form submission
- Shows success message before closing
- Resets form state when modal closes

## 4. WhatsApp Button

A floating WhatsApp contact button that appears on all pages.

### Configuration

The WhatsApp button is already added to the root layout and appears on all pages. To customize it, edit `components/ui/WhatsAppButton.tsx`:

```tsx
// Change the phone number
const phoneNumber = '447123456789'; // Your WhatsApp number (country code + number)

// Change the pre-filled message
const message = encodeURIComponent('Your custom message here');
```

### Features

- **Fixed Position**: Bottom-right corner of the screen
- **Hover Tooltip**: Shows "Chat with us on WhatsApp" on hover
- **Pulse Animation**: Draws attention with subtle animation
- **Mobile Friendly**: Opens WhatsApp app on mobile devices
- **Desktop Friendly**: Opens WhatsApp Web on desktop

### Styling

The button uses WhatsApp's official green color (#25D366) and includes:
- Shadow effects
- Hover scale animation
- Smooth transitions
- Accessible focus states

## 5. Updated Subject Areas

The Subject Areas component now has enhanced interactivity.

### Features

- **Clickable Icons**: Each subject area opens the quote form modal
- **Blue Color Scheme**: Icons use primary blue colors
- **Hover Effects**: 
  - Background color changes
  - Icon color intensifies
  - Text color changes
  - Shadow appears
- **Accessibility**: Full keyboard navigation support

### Usage

The component is already integrated into the homepage. No changes needed unless you want to customize the behavior.

```tsx
import SubjectAreas from '@/components/home/SubjectAreas';

export default function HomePage() {
  return (
    <>
      {/* Other sections */}
      <SubjectAreas />
      {/* Other sections */}
    </>
  );
}
```

## 6. Privacy Policy Page

The privacy policy page is automatically available at `/privacy-policy`.

### Accessing the Page

Users can access it via:
1. Direct URL: `https://yoursite.com/privacy-policy`
2. Footer link: "Privacy Policy" in the Quick Links section

### Customization

To update the privacy policy content, edit `app/privacy-policy/page.tsx`. The page includes:

- Introduction
- Data collection details
- Usage information
- Cookie policy
- Third-party services
- Security measures
- Data retention
- User rights
- Contact information
- Change policy

## Integration Examples

### Example 1: Service Page with Hero

```tsx
import ServicesHeroSection from '@/components/home/ServicesHeroSection';

export default function AssignmentWritingPage() {
  return (
    <>
      <ServicesHeroSection
        title="Assignment Writing Services"
        subtitle="Expert help with all types of academic assignments"
      />
      
      <section className="py-16 px-4">
        {/* Your service details */}
      </section>
    </>
  );
}
```

### Example 2: Custom CTA with Modal

```tsx
'use client';

import { useState } from 'react';
import QuoteFormModal from '@/components/forms/QuoteFormModal';
import Button from '@/components/ui/Button';

export default function PricingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-16">
      <h2>Our Pricing</h2>
      <p>Get a custom quote for your project</p>
      
      <Button 
        variant="primary" 
        size="lg"
        onClick={() => setIsModalOpen(true)}
      >
        Request Custom Quote
      </Button>

      <QuoteFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
```

### Example 3: Multiple Modals

```tsx
'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import QuoteFormModal from '@/components/forms/QuoteFormModal';

export default function MyPage() {
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setInfoModalOpen(true)}>
        More Info
      </button>
      <button onClick={() => setQuoteModalOpen(true)}>
        Get Quote
      </button>

      <Modal
        isOpen={infoModalOpen}
        onClose={() => setInfoModalOpen(false)}
        title="Service Information"
        size="md"
      >
        <p>Detailed information about our services...</p>
      </Modal>

      <QuoteFormModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />
    </>
  );
}
```

## Best Practices

### Modal Usage

1. **Always provide a way to close**: Backdrop, close button, and ESC key
2. **Keep content focused**: Don't overload modals with too much content
3. **Use appropriate sizes**: Choose the right size for your content
4. **Handle success states**: Provide feedback after form submissions

### WhatsApp Button

1. **Update phone number**: Replace with your actual WhatsApp business number
2. **Customize message**: Make the pre-filled message relevant to your business
3. **Test on mobile**: Ensure it opens the WhatsApp app correctly

### Hero Sections

1. **Use high-quality images**: Ensure images are optimized but high quality
2. **Maintain text contrast**: Dark overlays help text readability
3. **Keep text concise**: Hero sections should be scannable

### Accessibility

1. **Test keyboard navigation**: Ensure all interactive elements are accessible
2. **Verify screen reader support**: Use ARIA labels appropriately
3. **Check color contrast**: Ensure text meets WCAG standards
4. **Test with reduced motion**: Respect user preferences

## Troubleshooting

### Modal not closing

Ensure you're properly managing state:
```tsx
const [isOpen, setIsOpen] = useState(false);

// Correct
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />

// Incorrect - missing state update
<Modal isOpen={isOpen} onClose={() => {}} />
```

### WhatsApp button not visible

Check z-index conflicts. The button uses `z-40`. If you have elements with higher z-index, adjust accordingly.

### Images not loading

Ensure images are in the `/public` folder:
- `/public/hero_image.jpg`
- `/public/service.jpg`

### Modal content scrolling issues

If you have long content, the modal automatically becomes scrollable. Ensure your content doesn't have conflicting overflow styles.

## Support

For issues or questions:
- Check the test files for usage examples
- Review the component source code
- Refer to the ENHANCEMENTS_SUMMARY.md for technical details
