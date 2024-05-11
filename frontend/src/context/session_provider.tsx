'use client'

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface ProviderProps {
  children: ReactNode;
  session: any;
}

const ProviderSession: React.FC<ProviderProps> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
};

export default ProviderSession;
