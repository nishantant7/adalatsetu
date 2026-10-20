import { RecentCalculations } from '@/features/history';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { TOOLS } from '@/tools/registry';
import DisclaimerSection from './sections/DisclaimerSection';
import HeroSection from './sections/HeroSection';
import PrinciplesSection from './sections/PrinciplesSection';
import QuickStartSection from './sections/QuickStartSection';
import ToolGuideSection from './sections/ToolGuideSection';
import WorkflowSection from './sections/WorkflowSection';
import './HomePage.css';

/** Landing page: what AdalatSetu is, where to start, and a guide for every tool. */
export default function HomePage() {
  useDocumentTitle(null);
  const toolsWithGuides = TOOLS.filter((tool) => tool.guide);

  return (
    <div className="home">
      <HeroSection />
      <QuickStartSection />
      <RecentCalculations />
      <WorkflowSection />
      <div id="guides" className="home__guides">
        {toolsWithGuides.map((tool) => (
          <ToolGuideSection key={tool.id} tool={tool} />
        ))}
      </div>
      <PrinciplesSection />
      <DisclaimerSection />
    </div>
  );
}
