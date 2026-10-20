import { describe, expect, it } from 'vitest';
import { rupeesInWords } from './numberToWords';

describe('rupeesInWords', () => {
  it.each([
    [0, 'Rupees Zero only'],
    [96075, 'Rupees Ninety Six Thousand Seventy Five only'],
    [650000, 'Rupees Six Lakh Fifty Thousand only'],
    [
      12345678,
      'Rupees One Crore Twenty Three Lakh Forty Five Thousand Six Hundred Seventy Eight only',
    ],
  ])('%i', (amount, words) => {
    expect(rupeesInWords(amount)).toBe(words);
  });
});
