
import { useLanguage } from '@/contexts/LanguageContext';
import { useAudio } from '@/contexts/AudioContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play } from 'lucide-react';

export function TestSoundButton() {
  const { t } = useLanguage();
  const { playRandomSound, audioFiles } = useAudio();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('testSound')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={playRandomSound} 
          disabled={audioFiles.length === 0}
          className="w-full"
        >
          <Play className="mr-2 h-4 w-4" />
          {t('testSound')}
        </Button>
      </CardContent>
    </Card>
  );
}
