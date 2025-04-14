
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from './LanguageContext';

export type AudioFile = {
  id: string;
  name: string;
  url: string; // Data URL or path to the file
  type: string;
  size: number;
};

export type SavedUrl = {
  id: string;
  url: string;
};

type AudioContextType = {
  audioFiles: AudioFile[];
  savedUrls: SavedUrl[];
  isServiceActive: boolean;
  addAudioFile: (file: File) => Promise<void>;
  addUrl: (url: string) => Promise<void>;
  removeAudioFile: (id: string) => void;
  removeUrl: (id: string) => void;
  toggleService: () => void;
  playRandomSound: () => void;
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [savedUrls, setSavedUrls] = useState<SavedUrl[]>([]);
  const [isServiceActive, setIsServiceActive] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    // Load saved data from localStorage
    const loadSavedData = async () => {
      try {
        const savedAudioFiles = localStorage.getItem('audioFiles');
        const savedUrlsStr = localStorage.getItem('savedUrls');
        const savedServiceState = localStorage.getItem('isServiceActive');

        if (savedAudioFiles) {
          setAudioFiles(JSON.parse(savedAudioFiles));
        }
        if (savedUrlsStr) {
          setSavedUrls(JSON.parse(savedUrlsStr));
        }
        if (savedServiceState) {
          setIsServiceActive(savedServiceState === 'true');
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    };

    loadSavedData();
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('audioFiles', JSON.stringify(audioFiles));
  }, [audioFiles]);

  useEffect(() => {
    localStorage.setItem('savedUrls', JSON.stringify(savedUrls));
  }, [savedUrls]);

  useEffect(() => {
    localStorage.setItem('isServiceActive', isServiceActive.toString());
  }, [isServiceActive]);

  const addAudioFile = async (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Only accept audio files
      if (!file.type.startsWith('audio/')) {
        toast({
          variant: "destructive",
          title: t('error'),
          description: 'Invalid file type. Please upload an audio file.',
        });
        reject(new Error('Invalid file type'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const newAudio: AudioFile = {
            id: Date.now().toString(),
            name: file.name,
            url: e.target.result as string,
            type: file.type,
            size: file.size,
          };

          setAudioFiles((prev) => [...prev, newAudio]);
          toast({
            title: t('success'),
            description: t('audioUploaded'),
          });
          resolve();
        }
      };
      reader.onerror = (error) => {
        toast({
          variant: "destructive",
          title: t('error'),
          description: 'Failed to read file.',
        });
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const addUrl = async (url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!validateUrl(url)) {
        toast({
          variant: "destructive",
          title: t('error'),
          description: t('invalidUrl'),
        });
        reject(new Error('Invalid URL format'));
        return;
      }

      const newUrl: SavedUrl = {
        id: Date.now().toString(),
        url,
      };

      setSavedUrls((prev) => [...prev, newUrl]);
      toast({
        title: t('success'),
        description: t('urlAdded'),
      });
      resolve();
    });
  };

  const removeAudioFile = (id: string) => {
    setAudioFiles((prev) => prev.filter((file) => file.id !== id));
    toast({
      title: t('success'),
      description: t('audioRemoved'),
    });
  };

  const removeUrl = (id: string) => {
    setSavedUrls((prev) => prev.filter((url) => url.id !== id));
    toast({
      title: t('success'),
      description: t('urlRemoved'),
    });
  };

  const toggleService = () => {
    setIsServiceActive((prev) => !prev);
    toast({
      title: t('success'),
      description: isServiceActive ? t('serviceDisabled') : t('serviceEnabled'),
    });
  };

  const playRandomSound = () => {
    if (audioFiles.length === 0) {
      toast({
        variant: "destructive",
        title: t('error'),
        description: t('noAudioForTest'),
      });
      return;
    }

    const randomIndex = Math.floor(Math.random() * audioFiles.length);
    const audioToPlay = audioFiles[randomIndex];
    
    const audio = new Audio(audioToPlay.url);
    audio.play().catch((error) => {
      console.error('Error playing audio:', error);
      toast({
        variant: "destructive",
        title: t('error'),
        description: 'Failed to play audio.',
      });
    });
  };

  return (
    <AudioContext.Provider value={{
      audioFiles,
      savedUrls,
      isServiceActive,
      addAudioFile,
      addUrl,
      removeAudioFile,
      removeUrl,
      toggleService,
      playRandomSound,
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
