export type EnvironmentProps = {
    key: string;
    title: string;
  };
  
  export interface PlantProps {
    id: number;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: string[];
    frequency: Frequency;
    dateTimeNotification: Date;
  }
  
  export interface Frequency {
    times: number;
    repeatEvery: string;
  }
  