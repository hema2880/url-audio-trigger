
import { useLanguage } from '@/contexts/LanguageContext';
import { useAudio } from '@/contexts/AudioContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Power } from 'lucide-react';

export function ServiceToggle() {
  const { t } = useLanguage();
  const { isServiceActive, toggleService } = useAudio();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('activateService')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Button 
            onClick={toggleService}
            variant={isServiceActive ? "outline" : "default"}
            className={isServiceActive ? "border-green-500" : ""}
          >
            <Power className={`mr-2 h-4 w-4 ${isServiceActive ? "text-green-500" : ""}`} />
            {isServiceActive ? t('serviceActive') : t('serviceInactive')}
          </Button>
          
          <p className="text-sm text-muted-foreground">
            {isServiceActive 
              ? "The service is currently monitoring for URL triggers." 
              : "Activate the service to start monitoring for URL triggers."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
