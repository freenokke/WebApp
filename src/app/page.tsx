import { redirect } from 'next/navigation'
import { cookies } from 'next/headers';

export default function Home() {
  if (!cookies().get('token')) {
    redirect('/sign-in')
  } else {
    redirect('/products')
  }
}
