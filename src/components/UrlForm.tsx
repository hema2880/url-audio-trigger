
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAudio } from '@/contexts/AudioContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';

export function UrlForm() {
  const [url, setUrl] = useState('');
  const { t } = useLanguage();
  const { addUrl } = useAudio();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addUrl(url);
      setUrl(''); // Clear input after successful add
    } catch (error) {
      // Error is handled in the context with toast
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('addUrl')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder={t('urlPlaceholder')}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={!url.trim()}>
            <Plus className="mr-2 h-4 w-4" />
            {t('addUrl')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
