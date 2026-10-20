import { lazy } from 'react';
import { GUIDE } from './content/guide';

/** Tool definition consumed by the registry. */
const stampPenaltyS35 = {
  id: 'stamp-penalty-s35',
  name: 'Stamp Penalty u/s 35',
  fullName: 'Stamp Calculator (Impounding of Document) u/s 35',
  category: 'stamp-revenue',
  icon: 'calculator',
  description:
    'Deficit stamp duty, penalty and interest for an impounded instrument, with a ready order-sheet paragraph.',
  statute: 'Indian Stamp Act, 1899 · MP Second Amendment 2025',
  isNew: true,
  guide: GUIDE,
  Component: lazy(() => import('./StampPenaltyTool')),
};

export default stampPenaltyS35;
