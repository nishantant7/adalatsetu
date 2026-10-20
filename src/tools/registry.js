/**
 * Central list of tools. To add a new tool:
 *   1. Create `src/tools/<tool-id>/` with an `index.js` definition (see stamp-penalty-s35).
 *   2. Import it here and add it to TOOLS.
 * Navigation, the home page and routing pick it up automatically.
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

export function searchTools(query) {
  const needle = query.trim().toLowerCase();
  if (!needle) return TOOLS;
  return TOOLS.filter((tool) =>
    [tool.name, tool.fullName, tool.description, tool.statute, ...tool.keywords]
      .join(' ')
      .toLowerCase()
      .includes(needle),
  );
}
