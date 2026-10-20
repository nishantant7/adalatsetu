/** Converts amounts to words using the Indian numbering system (lakh, crore). */

const ONES = [
  '',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Eleven',
  'Twelve',
  'Thirteen',
  'Fourteen',
  'Fifteen',
  'Sixteen',
  'Seventeen',
  'Eighteen',
  'Nineteen',
];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function belowHundred(n) {
  if (n < 20) return ONES[n];
  const unit = n % 10;
  return TENS[Math.floor(n / 10)] + (unit ? ` ${ONES[unit]}` : '');
}

function belowThousand(n) {
  const hundreds = Math.floor(n / 100);
  const rest = n % 100;
  return [hundreds ? `${ONES[hundreds]} Hundred` : '', rest ? belowHundred(rest) : '']
    .filter(Boolean)
    .join(' ');
}

/** 96075 → "Ninety Six Thousand Seventy Five" */
export function numberToWords(value) {
  let n = Math.round(Math.abs(value));
  if (n === 0) return 'Zero';

  const crore = Math.floor(n / 1e7);
  n %= 1e7;
  const lakh = Math.floor(n / 1e5);
  n %= 1e5;
  const thousand = Math.floor(n / 1e3);
  n %= 1e3;

  return [
    crore ? `${crore >= 1000 ? numberToWords(crore) : belowThousand(crore)} Crore` : '',
    lakh ? `${belowHundred(lakh)} Lakh` : '',
    thousand ? `${belowHundred(thousand)} Thousand` : '',
    n ? belowThousand(n) : '',
  ]
    .filter(Boolean)
    .join(' ');
}

/** 96075 → "Rupees Ninety Six Thousand Seventy Five only" */
export function rupeesInWords(amount) {
  return `Rupees ${numberToWords(amount)} only`;
}
