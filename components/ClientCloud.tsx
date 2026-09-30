'use client';

import dynamic from 'next/dynamic';

const CloudBackground = dynamic(() => import('@/components/CloudBackground'), {
  ssr: false,
});

export default function ClientCloud() {
  return <CloudBackground />;
}
