
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { UrlForm } from '@/components/UrlForm';
import { AudioUploader } from '@/components/AudioUploader';
import { ServiceToggle } from '@/components/ServiceToggle';
import { TestSoundButton } from '@/components/TestSoundButton';
import { AudioFilesList } from '@/components/AudioFilesList';
import { SavedUrlsList } from '@/components/SavedUrlsList';

const Index = () => {
  const { dir } = useLanguage();

  return (
    <div className={`min-h-screen bg-background flex flex-col`} dir={dir}>
      <Header />
      <main className="flex-1 container py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <UrlForm />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <AudioUploader />
              <ServiceToggle />
            </div>
            <TestSoundButton />
          </div>
          <div className="space-y-6">
            <AudioFilesList />
            <SavedUrlsList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
