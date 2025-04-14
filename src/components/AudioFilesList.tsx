
import { useLanguage } from '@/contexts/LanguageContext';
import { useAudio, type AudioFile } from '@/contexts/AudioContext';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Trash2, File, Music2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function AudioFilesList() {
  const { t } = useLanguage();
  const { audioFiles, removeAudioFile } = useAudio();

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{t('audioFiles')}</CardTitle>
        <CardDescription>
          {audioFiles.length} {audioFiles.length === 1 ? 'file' : 'files'} uploaded
        </CardDescription>
      </CardHeader>
      <CardContent>
        {audioFiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Music2 className="h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-lg font-medium text-muted-foreground">
              {t('noAudioFiles')}
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[300px] rounded-md border">
            <div className="p-4 space-y-2">
              {audioFiles.map((file) => (
                <AudioFileItem 
                  key={file.id} 
                  file={file} 
                  onDelete={removeAudioFile} 
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}

interface AudioFileItemProps {
  file: AudioFile;
  onDelete: (id: string) => void;
}

function AudioFileItem({ file, onDelete }: AudioFileItemProps) {
  const { t, dir } = useLanguage();
  
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div className="flex items-center gap-3">
        <File className="h-8 w-8 text-primary" />
        <div className="space-y-1">
          <p className="font-medium">{file.name}</p>
          <p className="text-xs text-muted-foreground">
            {formatFileSize(file.size)}
          </p>
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => onDelete(file.id)}
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">{t('deleteAudio')}</span>
      </Button>
    </div>
  );
}
