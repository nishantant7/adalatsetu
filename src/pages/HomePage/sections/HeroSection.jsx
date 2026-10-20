import { SITE } from '@/config/site';
import { Button } from '@/shared/ui';
import { TOOLS, toolPath } from '@/tools/registry';
import './HeroSection.css';

export default function HeroSection() {
  const [featuredTool] = TOOLS;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__content">
        <p className="hero__eyebrow">
          {SITE.name} · <span lang="hi">{SITE.nameHindi}</span> · {SITE.meaning}
        </p>
        <h1 id="hero-title" className="hero__title">
          {SITE.tagline}
        </h1>
        <p className="hero__lead">
          {SITE.description} Every result shows its working and comes with a ready order-sheet
          paragraph in English and Hindi.
        </p>
        <div className="hero__actions">
          {featuredTool && (
            <Button
              to={toolPath(featuredTool)}
              size="lg"
              icon="calculator"
              className="hero__primary"
            >
              Open {featuredTool.name}
            </Button>
          )}
          <a className="hero__link" href="#guides">
            Read the guide
          </a>
        </div>
      </div>

      <div className="hero__emblem" aria-hidden="true">
        <svg viewBox="0 0 64 64">
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M32 15v33M21 48h22M19 21h26" />
            <path d="M19 21l-6 12h12zM45 21l-6 12h12z" />
          </g>
          <circle cx="32" cy="15" r="2.5" fill="currentColor" />
        </svg>
      </div>
    </section>
  );
}
