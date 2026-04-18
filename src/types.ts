
export type Exercise = {
  id: string;
  name: string;
  category: 'Strength' | 'Cardio' | 'Flexibility';
  sets: number;
  reps: number;
  weight?: number;
};

export type Workout = {
  id: string;
  date: string;
  title: string;
  exercises: Exercise[];
  completed: boolean;
};

export type Meal = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  time: string;
};

export type Equipment = {
  id: string;
  name: string;
  description: string;
  properUse: string;
  safetyTips: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  targetMuscles: string[];
};

export type Reward = {
  id: string;
  name: string;
  points: number;
  description: string;
  type: 'virtual' | 'discount';
};

export type OnlineClass = {
  id: string;
  title: string;
  coach: string;
  duration: string;
  discountPercentage: number;
  price: number;
};

export type UserRole = 'admin' | 'coach' | 'user';

export type UserAccount = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isOnline: boolean;
  assignedCoachId?: string;
  points: number;
};

export type UserState = {
  account?: UserAccount;
  points: number;
  level: number;
  activeWorkouts: Workout[];
  meals: Meal[];
  completedEquipmentTasks: string[];
};
