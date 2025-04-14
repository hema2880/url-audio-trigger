
import { useLanguage } from '@/contexts/LanguageContext';
import { useAudio, type SavedUrl } from '@/contexts/AudioContext';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Trash2, Link } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function SavedUrlsList() {
  const { t } = useLanguage();
  const { savedUrls, removeUrl } = useAudio();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{t('savedUrls')}</CardTitle>
        <CardDescription>
          {savedUrls.length} {savedUrls.length === 1 ? 'URL' : 'URLs'} saved
        </CardDescription>
      </CardHeader>
      <CardContent>
        {savedUrls.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Link className="h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-lg font-medium text-muted-foreground">
              {t('noSavedUrls')}
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[300px] rounded-md border">
            <div className="p-4 space-y-2">
              {savedUrls.map((url) => (
                <SavedUrlItem
                  key={url.id}
                  url={url}
                  onDelete={removeUrl}
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}

interface SavedUrlItemProps {
  url: SavedUrl;
  onDelete: (id: string) => void;
}

function SavedUrlItem({ url, onDelete }: SavedUrlItemProps) {
  const { t } = useLanguage();
  
  const truncateUrl = (url: string, maxLength = 40) => {
    return url.length > maxLength
      ? url.substring(0, maxLength) + '...'
      : url;
  };
  
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div className="flex items-center gap-3 overflow-hidden">
        <Link className="h-5 w-5 flex-shrink-0 text-primary" />
        <a 
          href={url.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="truncate text-primary hover:underline"
          title={url.url}
        >
          {truncateUrl(url.url)}
        </a>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => onDelete(url.id)}
        className="flex-shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">{t('deleteUrl')}</span>
      </Button>
    </div>
  );
}
