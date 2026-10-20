/**
 * Central list of tools. To add a new tool:
 *   1. Create `src/tools/<tool-id>/` with an `index.js` definition (see stamp-penalty-s35).
 *   2. Import it here and add it to TOOLS.
 * Navigation, the home page (cards and guides) and routing pick it up automatically.
 */
import { ROUTES } from '@/config/routes';
import stampPenaltyS35 from './stamp-penalty-s35';

export const CATEGORIES = [
  {
    id: 'stamp-revenue',
    name: 'Stamp & Revenue',
    description: 'Stamp duty, impounding, penalty and interest.',
  },
];

/**
 * Each tool definition has the shape (see stamp-penalty-s35/index.js):
 *   { id, name, fullName, category, icon, description, statute, isNew,
 *     guide: { purpose, procedure, steps, rules, authorities }, Component }
 */
export const TOOLS = [stampPenaltyS35];

export function getTool(id) {
  return TOOLS.find((tool) => tool.id === id) ?? null;
}

export function getCategory(id) {
  return CATEGORIES.find((category) => category.id === id) ?? null;
}

export function toolPath(tool) {
  return ROUTES.tool(tool.id);
}

/** Categories with their tools, skipping empty categories. */
export function getToolsByCategory() {
  return CATEGORIES.map((category) => ({
    ...category,
    tools: TOOLS.filter((tool) => tool.category === category.id),
  })).filter((category) => category.tools.length > 0);
}
