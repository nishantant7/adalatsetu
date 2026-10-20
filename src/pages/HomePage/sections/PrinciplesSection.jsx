import { PRINCIPLES, SITE } from '@/config/site';
import { Icon } from '@/shared/ui';
import SectionHeading from './SectionHeading';
import './PrinciplesSection.css';

export default function PrinciplesSection() {
  return (
    <section aria-labelledby="principles-heading">
      <SectionHeading
        id="principles-heading"
        eyebrow={`Why ${SITE.name}`}
        title="Built for the way courts work"
      />
      <ul className="principles">
        {PRINCIPLES.map((principle) => (
          <li key={principle.title} className="principles__item">
            <span className="principles__icon">
              <Icon name={principle.icon} size={18} />
            </span>
            <h3 className="principles__title">{principle.title}</h3>
            <p className="principles__text">{principle.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
