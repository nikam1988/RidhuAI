export interface User {
  uid: string;
  role: 'parent' | 'admin' | 'teacher';
  email: string;
  displayName: string;
  subscriptionTier: 'free' | 'premium';
  createdAt: string; // ISO string or Firebase Timestamp
}

export interface Student {
  studentId: string;
  parentId: string;
  name: string;
  age: number;
  class: string;
  avatarUrl: string;
  stats: {
    xp: number;
    coins: number;
    stars: number;
    currentStreak: number;
    maxStreak: number;
    level: number;
    energy: number;
  };
}

export interface Progress {
  progressId: string;
  studentId: string;
  nodeId: string;
  worldId: string;
  type: 'lesson' | 'quiz' | 'boss';
  status: 'locked' | 'unlocked' | 'completed';
  score?: number;
  accuracy?: number;
  starsEarned?: number;
  completedAt: string;
}
