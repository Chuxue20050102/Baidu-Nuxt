import { useState } from 'nuxt/app'
 
export function useLoginModal() {
  return useState('showLoginModal', () => false)
} 