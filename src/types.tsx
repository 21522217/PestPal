
export type ImageType = {
  uri: string;
  title: string;
  description: string;
  additionalInfo: string;
  additionalImages: string[];
};

  
  export type AppStackParamList = {
    HomeScreen: undefined;
    HistoryScreen: { images: ImageType[] };
    SettingScreen: undefined;
    OtherScreen: undefined;
  };
  