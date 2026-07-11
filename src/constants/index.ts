// Gamification Constants
export const LEVEL_UP_XP_MULTIPLIER = 1.5;
export const BASE_XP_PER_LEVEL = 1000;
export const MAX_ENERGY = 5;
export const ENERGY_REFILL_MINUTES = 30;

// Application Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  STUDENT_DASHBOARD: '/dashboard',
  PARENT_DASHBOARD: '/parent',
  WORLDS: '/worlds',
  PROFILE: '/profile',
};

// Roles
export const ROLES = {
  STUDENT: 'student',
  PARENT: 'parent',
  ADMIN: 'admin',
  TEACHER: 'teacher'
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@kidspark/auth',
  THEME: '@kidspark/theme',
  SOUND_ENABLED: '@kidspark/sound'
};
