'use server';

import { cookies } from 'next/headers';

export async function setLocaleAction(locale: string) {
  const store = await cookies();
  store.set('locale', locale);
}