import { ImageResponse } from 'next/og';
import { getServiceBySlug } from '@/lib/services/serviceData';

// Image metadata
export const alt = 'Academics Consulate Service';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    // Fallback if service not found
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 60,
            background: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          Service Not Found
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 'normal',
              marginBottom: 20,
              opacity: 0.9,
            }}
          >
            Academics Consulate
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              marginBottom: 30,
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              maxWidth: 1000,
              lineHeight: 1.2,
            }}
          >
            {service.name}
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 'normal',
              opacity: 0.95,
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            {service.description}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
