import { useState } from 'nuxt/app'
 
export function useFuzhuMode() {
  return useState('showFuzhuMode', () => false)
} 