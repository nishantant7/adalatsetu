import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SITE } from '@/config/site';
import { RecentCalculations } from '@/features/history';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { Badge, Icon, PageHeader, SearchInput } from '@/shared/ui';
import { getCategory, searchTools, toolPath } from '@/tools/registry';
import './HomePage.css';

export default function HomePage() {
  useDocumentTitle(null);
  const [query, setQuery] = useState('');
  const tools = searchTools(query);

  return (
    <div className="home">
      <section className="home__hero">
        <PageHeader
          eyebrow={`${SITE.name} · ${SITE.nameHindi}`}
          title={SITE.tagline}
          description={SITE.description}
        />
        <SearchInput
          className="home__search"
          label="Search tools"
          placeholder="Search tools — e.g. stamp, section 35, penalty"
          value={query}
          onChange={setQuery}
        />
      </section>

      <section aria-labelledby="tools-heading">
        <h2 id="tools-heading" className="home__section-title">
          Tools
        </h2>
        <div className="home__grid">
          {tools.map((tool) => (
            <Link key={tool.id} to={toolPath(tool)} className="tool-card">
              <div className="tool-card__top">
                <span className="tool-card__icon">
                  <Icon name={tool.icon} size={20} />
                </span>
                {tool.isNew && <Badge tone="accent">New</Badge>}
              </div>
              <p className="tool-card__category">{getCategory(tool.category)?.name}</p>
              <h3 className="tool-card__title">{tool.fullName}</h3>
              <p className="tool-card__description">{tool.description}</p>
              <p className="tool-card__statute">{tool.statute}</p>
              <span className="tool-card__cta">
                Open tool <Icon name="arrowRight" size={16} />
              </span>
            </Link>
          ))}

          {!query && (
            <div className="tool-card tool-card--placeholder">
              <span className="tool-card__icon">
                <Icon name="sparkle" size={20} />
              </span>
              <h3 className="tool-card__title">More tools coming</h3>
              <p className="tool-card__description">
                Court fee, limitation and other everyday calculations will be added here.
              </p>
            </div>
          )}
        </div>
        {tools.length === 0 && <p className="home__no-results">No tools match “{query}”.</p>}
      </section>

      <RecentCalculations />
    </div>
  );
}
