# Open Graph Images Implementation

## Overview
This document describes the Open Graph (OG) image implementation for the Academics Consulate website.

## Implementation Details

### Approach
We used Next.js 14+ built-in OG image generation via the `opengraph-image.tsx` file convention. This approach:
- Automatically generates optimized OG images at build time
- Creates properly sized images (1200x630px) for social media sharing
- Uses the `next/og` ImageResponse API for dynamic image generation
- Requires no external image files or manual image creation

### Files Created

1. **`app/opengraph-image.tsx`** - Root/homepage OG image
   - Displays "Academics Consulate" branding
   - Shows tagline: "Professional Academic Writing, Editing & Research Services"
   - Uses brand gradient colors (primary blue)

2. **`app/quote/opengraph-image.tsx`** - Quote page OG image
   - Title: "Request a Quote"
   - Description: "Get a free, no-obligation quote for your academic project"

3. **`app/order/opengraph-image.tsx`** - Order page OG image
   - Title: "Place an Order"
   - Description: "Submit your requirements and get started on your project"

4. **`app/services/opengraph-image.tsx`** - Services overview OG image
   - Title: "Our Services"
   - Description: "Professional academic writing, editing, research & career services"

5. **`app/services/[slug]/opengraph-image.tsx`** - Dynamic service page OG images
   - Dynamically generates OG images for each service
   - Displays service name and description
   - Uses service data from `getServiceBySlug()`

### Metadata Updates

Updated `app/layout.tsx` to remove hardcoded OG image references. Next.js automatically detects and uses the `opengraph-image.tsx` files in each route.

### How It Works

When Next.js builds the application:
1. It detects `opengraph-image.tsx` files in each route
2. Executes the default export function to generate the image
3. Saves the generated image as `opengraph-image` in the build output
4. Automatically adds the correct `<meta property="og:image">` tags to the HTML

### Social Media Sharing

When pages are shared on social media platforms (Facebook, Twitter, LinkedIn, etc.):
- The platform fetches the OG image from the generated file
- Displays a rich preview card with the image, title, and description
- Image dimensions (1200x630px) are optimized for all major platforms

### Testing

To verify OG images are working:

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Check generated images:**
   - Look in `.next/server/app/` directories for `opengraph-image` files
   - Each route should have its own OG image

3. **Test with social media debuggers:**
   - Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
   - Twitter Card Validator: https://cards-dev.twitter.com/validator
   - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

4. **Local testing:**
   ```bash
   npm run dev
   ```
   Then visit: `http://localhost:3000/opengraph-image` (and other routes)

### Requirements Satisfied

✅ **Requirement 14.5**: Implement Open Graph tags for social media sharing
- All pages now have unique OG images (1200x630px)
- OG metadata is properly configured in all page files
- Images are automatically generated and optimized

### Benefits

1. **No manual image creation** - Images are generated programmatically
2. **Consistent branding** - All images use the same gradient and styling
3. **Dynamic content** - Service pages show specific service information
4. **Optimized performance** - Images are generated at build time, not runtime
5. **Easy maintenance** - Update one template to change all OG images

### Future Enhancements

Potential improvements for the future:
- Add logo/icon to OG images
- Include statistics or trust indicators
- Add custom backgrounds or patterns
- Support for multiple languages
- A/B testing different OG image designs
