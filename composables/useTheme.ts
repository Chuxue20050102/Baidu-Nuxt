import { useState } from 'nuxt/app'

export function useTheme() {
  return useState('currentColors', () => ({
    navColor: '#fff',
    bodyColor: '#fff',
    textColor: '#333',
    btnColor: '#4e6ef2',
    borderColor: '#ccc',
    downColor: '#f5f5f6',
    ziColor: '#222',
    ziColor2: 'red'
  }))
} 