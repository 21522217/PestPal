
export type ImageType = {
  id: string;
  represent_image: string | null;
  pest_name: string;
  habitat: string;
  history: string;
  danger_scale: string;
  additionalImages: string[];
};

export type ImageType1 = {
  uri: string | undefined;
  description: string;
};

export type AppStackParamList = {
  HomeScreen: undefined;
  HistoryScreen: { images: ImageType[] } | undefined;
  SettingScreen: undefined;
  OtherScreen: undefined;
};
