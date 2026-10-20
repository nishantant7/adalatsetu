/** Every URL in the app is built here, so paths are never hard-coded in components. */
export const ROUTES = {
  home: '/',
  history: '/history',
  about: '/about',
  tool: (toolId) => `/tools/${toolId}`,
  /** Opens a tool with a saved calculation pre-filled. */
  toolRecord: (toolId, recordId) => `/tools/${toolId}?record=${encodeURIComponent(recordId)}`,
};

/** Route patterns used by React Router. */
export const ROUTE_PATTERNS = {
  tool: 'tools/:toolId',
  history: 'history',
  about: 'about',
};
