
import { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAudio } from '@/contexts/AudioContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload } from 'lucide-react';

export function AudioUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();
  const { addAudioFile } = useAudio();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      for (let i = 0; i < e.target.files.length; i++) {
        await addAudioFile(e.target.files[i]);
      }
      
      // Reset the input to allow selecting the same file again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('uploadAudio')}</CardTitle>
      </CardHeader>
      <CardContent>
        <input
          type="file"
          accept="audio/*"
          multiple
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <Button onClick={triggerFileInput} className="w-full">
          <Upload className="mr-2 h-4 w-4" />
          {t('upload')}
        </Button>
      </CardContent>
    </Card>
  );
}
