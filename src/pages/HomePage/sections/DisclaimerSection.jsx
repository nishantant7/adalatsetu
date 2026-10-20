import { DISCLAIMER } from '@/config/site';
import { Icon } from '@/shared/ui';
import './DisclaimerSection.css';

export default function DisclaimerSection() {
  return (
    <aside className="disclaimer" aria-label="Disclaimer">
      <Icon name="alert" size={20} />
      <div>
        <p className="disclaimer__title">Disclaimer</p>
        <p>{DISCLAIMER}</p>
      </div>
    </aside>
  );
}
