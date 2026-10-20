import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { EmptyState } from '@/shared/ui';
import { getTool } from '@/tools/registry';
import NotFoundPage from '@/pages/NotFoundPage';

/** Resolves `/tools/:toolId` to a registered tool and renders it lazily. */
export default function ToolPage() {
  const { toolId } = useParams();
  const tool = getTool(toolId);

  if (!tool) return <NotFoundPage />;

  const { Component } = tool;
  return (
    <Suspense fallback={<EmptyState icon="calculator" title="Loading tool…" />}>
      <Component tool={tool} />
    </Suspense>
  );
}
