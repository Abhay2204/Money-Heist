export interface CrewMember {
  id: string;
  codeName: string;
  realName: string;
  role: string;
  image: string;
  status: 'Active' | 'Deceased' | 'Captured';
}

export interface DossierItem {
  id: string;
  title: string;
  description: string;
  icon: 'glasses' | 'origami' | 'phone';
  secretContent: string;
}

export interface VaultState {
  unlocked: boolean;
  rotation: number;
}

export interface TimelineEvent {
  id: string;
  phase: string;
  title: string;
  description: string;
  time: string;
}