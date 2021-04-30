export type EnvironmentProps = {
  key: string;
  title: string;
};

export interface PlantProps {
  id: number;
  name: string;
  about: string;
  waterTips: string;
  photo: string;
  environments: string[];
  frequency: Frequency;
}

export interface Frequency {
  times: number;
  repeatEvery: string;
}
