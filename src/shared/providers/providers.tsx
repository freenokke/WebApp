'use client'

import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { AuthProvider } from './AuthProvider/authProvider'
import { ReactQueryProvider } from './ReactQueryProvider/reactQueryProvider'

export function Providers({ children, token }: { children: React.ReactNode, token: RequestCookie | undefined;}) {
  return (
    <ReactQueryProvider>
      <AuthProvider token={token}>
        {children}
      </AuthProvider>
    </ReactQueryProvider>
  )
}