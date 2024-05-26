
export type ImageType = {
    uri: string | undefined;
    description: string;
  };
  
  export type AppStackParamList = {
    HomeScreen: undefined;
    HistoryScreen: { images: ImageType[] };
    SettingScreen: undefined;
    OtherScreen: undefined;
  };
  