# Service Hero Image

## Required Image

**Filename:** `service.jpg`  
**Location:** `public/service.jpg`

## Image Specifications

### Recommended Dimensions
- **Minimum Width:** 1920px
- **Minimum Height:** 600px
- **Aspect Ratio:** 16:9 or wider
- **Format:** JPEG (.jpg)

### Optimization Settings
- **Quality:** 85% (configured in Next.js Image component)
- **File Size:** Aim for under 500KB for optimal performance
- **Color Space:** sRGB

### Content Guidelines
- The image should represent academic services, education, or professional development
- Ensure the image has good contrast and isn't too busy
- Consider that text will be overlaid on the image (white text with dark overlay)
- Avoid images with important details in the center where text will appear

## Implementation Details

The image is used in the Services page hero section (`app/services/ServicesPageClient.tsx`) with:
- Next.js Image component for automatic optimization
- Priority loading for above-the-fold content
- Responsive sizing with `fill` layout
- Dark gradient overlay (primary-900/90 to primary-700/80) for text readability
- Object-fit: cover for proper scaling

## Accessibility

The image has an empty `alt` attribute (`alt=""`) because it's decorative and the meaningful content is provided by the text overlay. The gradient overlay ensures WCAG AA contrast compliance for the text.

## Testing

After adding the image:
1. Place `service.jpg` in the `public/` folder
2. Navigate to `/services` page
3. Verify the image loads and text is readable
4. Test on different screen sizes
5. Check page load performance
