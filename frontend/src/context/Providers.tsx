'use client'

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface ProviderProps {
  children: ReactNode;
  session: any;
}

const Provider: React.FC<ProviderProps> = ({ children, session }) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
};

export default Provider;
