import { Button, EmptyState } from '@/shared/ui';
import { ROUTES } from '@/config/routes';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';

export default function NotFoundPage() {
  useDocumentTitle('Page not found');
  return (
    <EmptyState icon="alert" title="Page not found">
      <p>The page you are looking for does not exist.</p>
      <p style={{ marginTop: 12 }}>
        <Button to={ROUTES.home} icon="home">
          Go to home
        </Button>
      </p>
    </EmptyState>
  );
}
