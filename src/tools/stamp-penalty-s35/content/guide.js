/**
 * Plain-language guide for the tool. Shown in the tool's "How it works" tab
 * and on the home page, so every tool explains itself in the same shape:
 * { purpose, procedure, steps, rules, authorities }.
 */
export const GUIDE = {
  purpose:
    'When a party tenders an instrument — an agreement to sell, sale deed, lease and so on — that is not duly stamped, the Court must impound it and may admit it in evidence only on payment of the deficit duty with penalty and interest. This tool works out that amount and drafts the order-sheet paragraph.',

  procedure: [
    {
      title: 'Impound',
      text: 'The instrument is impounded under Section 33 of the Indian Stamp Act, 1899.',
    },
    {
      title: 'Admit on payment',
      text: 'Under clause (a) of the proviso to Section 35, it is admitted on payment of deficit duty, penalty and interest.',
    },
    {
      title: 'Send to Collector',
      text: 'After realisation, the instrument or an authenticated copy is sent to the Collector under Section 38.',
    },
  ],

  steps: [
    'Enter the market value of the property or the consideration.',
    'Enter the stamp duty already paid on the instrument.',
    'Enter the date of execution and the date of hearing (today by default).',
    'Change the duty rate (default 5%) or exclude interest under Calculation options, if needed.',
    'Press Calculate, then copy the order paragraph, print or share the result.',
  ],

  rules: [
    {
      term: 'Deficit',
      text: 'Proper duty (market value × rate) minus the duty already paid.',
    },
    {
      term: 'Period',
      text: 'From the date of execution (counted) to the date of hearing (not counted). Whole months are counted date to date; remaining days are charged as days ÷ 30.',
    },
    {
      term: 'Penalty',
      text: '1% of the deficit per month for the period, but never more than the deficit itself.',
    },
    {
      term: 'Interest',
      text: '1% of the deficit per month for the same period, with no upper limit.',
    },
    {
      term: 'Rounding',
      text: 'Every amount is rounded up to the next rupee.',
    },
  ],

  authorities: [
    {
      title: 'Indian Stamp Act, 1899 — Sections 33, 35 and 38',
      text: 'Examination and impounding of instruments, their inadmissibility unless duly stamped, and the procedure after impounding.',
    },
    {
      title: 'Indian Stamp (Madhya Pradesh Second Amendment) Act, 2025 (M.P. Act No. 26 of 2025)',
      text: 'Substitutes clause (a) of the proviso to Section 35: penalty of 1% per month capped at the deficit, plus interest of 1% per month. In force from 17-12-2025.',
    },
    {
      title: 'Same Act — Sections 40 and 41',
      text: 'Applies the same penalty and interest before the Collector, and provides for instruments voluntarily produced within one year (deficit plus interest only).',
    },
  ],
};
