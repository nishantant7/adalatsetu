import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { Badge, Icon } from '@/shared/ui';
import { getCategory, TOOLS, toolPath } from '@/tools/registry';
import SectionHeading from './SectionHeading';
import './QuickStartSection.css';

const WORKSPACE_LINKS = [
  {
    to: ROUTES.history,
    icon: 'history',
    title: 'Calculation history',
    text: 'Re-open, search and manage calculations you have saved on this device.',
  },
  {
    to: ROUTES.about,
    icon: 'info',
    title: 'About AdalatSetu',
    text: 'What the platform is for, the principles behind it and its limitations.',
  },
];

export default function QuickStartSection() {
  return (
    <section aria-labelledby="start-heading">
      <SectionHeading id="start-heading" eyebrow="Start here" title="Choose what you need" />
      <div className="quick-start">
        {TOOLS.map((tool) => (
          <Link key={tool.id} to={toolPath(tool)} className="quick-card quick-card--tool">
            <div className="quick-card__top">
              <span className="quick-card__icon">
                <Icon name={tool.icon} size={20} />
              </span>
              {tool.isNew && <Badge tone="accent">New</Badge>}
            </div>
            <p className="quick-card__category">{getCategory(tool.category)?.name}</p>
            <h3 className="quick-card__title">{tool.fullName}</h3>
            <p className="quick-card__text">{tool.description}</p>
            <span className="quick-card__cta">
              Open calculator <Icon name="arrowRight" size={16} />
            </span>
          </Link>
        ))}

        {WORKSPACE_LINKS.map((link) => (
          <Link key={link.to} to={link.to} className="quick-card">
            <span className="quick-card__icon">
              <Icon name={link.icon} size={20} />
            </span>
            <h3 className="quick-card__title">{link.title}</h3>
            <p className="quick-card__text">{link.text}</p>
          </Link>
        ))}

        <div className="quick-card quick-card--soon">
          <span className="quick-card__icon">
            <Icon name="sparkle" size={20} />
          </span>
          <h3 className="quick-card__title">More calculators coming</h3>
          <p className="quick-card__text">
            New tools for everyday court calculations will appear here as they are added.
          </p>
        </div>
      </div>
    </section>
  );
}
