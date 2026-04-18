import { Equipment, Reward, OnlineClass, UserAccount } from '../types';

export const MOCK_EQUIPMENT: Equipment[] = [
  {
    id: 'e1',
    name: 'Barbell Back Squat',
    description: 'The king of all lower body exercises, targeting your quadriceps, hamstrings, and glutes.',
    properUse: 'Rest the bar on your upper traps. Keep chest up, hips back, and lower until thighs are parallel to the floor.',
    safetyTips: ['Keep your spine neutral', 'Do not let knees cave inward', 'Always use a rack with safety bars'],
    difficulty: 'Intermediate',
    targetMuscles: ['Quads', 'Glutes', 'Hamstrings']
  },
  {
    id: 'e2',
    name: 'Seated Leg Press',
    description: 'A great starter for building leg strength without the balance requirements of a squat.',
    properUse: 'Place feet shoulder-width apart. Lower the weight until knees are at 90 degrees. Push back through heels.',
    safetyTips: ['Do not lock your knees at the top', 'Keep your lower back pressed against the seat'],
    difficulty: 'Beginner',
    targetMuscles: ['Quads', 'Glutes']
  },
  {
    id: 'e3',
    name: 'Cable Lat Pull-down',
    description: 'Primary exercise for developing back width and upper body pulling strength.',
    properUse: 'Grip the bar wider than shoulders. Pull down to your upper chest while leaning back slightly.',
    safetyTips: ['Avoid using momentum', 'Control the weight on the way up'],
    difficulty: 'Beginner',
    targetMuscles: ['Lats', 'Biceps']
  }
];

export const MOCK_REWARDS: Reward[] = [
  { id: 'r1', name: 'Virtual Golden Dumbbell', points: 500, description: 'Show off your dedication with this profile badge.', type: 'virtual' },
  { id: 'r2', name: '10% Off Private Coaching', points: 1200, description: 'Unlock a special discount code for 1:1 sessions.', type: 'discount' },
  { id: 'r3', name: 'Neon Skin UI', points: 2000, description: 'Change your app theme to ultra-vibrant mode.', type: 'virtual' }
];

export const MOCK_CLASSES: OnlineClass[] = [
  { id: 'c1', title: 'HIIT Explosion', coach: 'Sarah J.', duration: '45m', discountPercentage: 20, price: 15 },
  { id: 'c2', title: 'Power Yoga Flow', coach: 'David M.', duration: '60m', discountPercentage: 15, price: 12 },
  { id: 'c3', title: 'Strength Foundations', coach: 'Marcus R.', duration: '50m', discountPercentage: 25, price: 20 }
];

export const PROGRESS_DATA = [
  { day: 'Mon', calories: 2100, weight: 82.1 },
  { day: 'Tue', calories: 2300, weight: 81.8 },
  { day: 'Wed', calories: 1950, weight: 81.9 },
  { day: 'Thu', calories: 2400, weight: 81.6 },
  { day: 'Fri', calories: 2150, weight: 81.4 },
  { day: 'Sat', calories: 2600, weight: 81.5 },
  { day: 'Sun', calories: 2200, weight: 81.3 },
];

export const MOCK_USERS: UserAccount[] = [
  { id: 'u1', name: 'James Wilson', email: 'james@gym.com', role: 'user', isOnline: true, assignedCoachId: 'c1', points: 1200 },
  { id: 'u2', name: 'Maria Garcia', email: 'maria@gym.com', role: 'user', isOnline: true, assignedCoachId: 'c1', points: 2300 },
  { id: 'u3', name: 'Tom Baker', email: 'tom@gym.com', role: 'user', isOnline: false, assignedCoachId: 'none', points: 450 },
  { id: 'u4', name: 'Sarah Connor', email: 'sarah@gym.com', role: 'user', isOnline: true, assignedCoachId: 'c1', points: 3100 },
  { id: 'u5', name: 'Lucas Scott', email: 'lucas@gym.com', role: 'user', isOnline: false, assignedCoachId: 'c2', points: 890 },
];
