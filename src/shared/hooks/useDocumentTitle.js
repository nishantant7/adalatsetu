import { useEffect } from 'react';
import { SITE } from '@/config/site';

/** Sets the browser tab title, e.g. "History · AdalatSetu". */
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;
  }, [title]);
}
