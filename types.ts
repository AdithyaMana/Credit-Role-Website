import { LucideIcon } from 'lucide-react';

export enum CategoryType {
  STRATEGY = 'Strategy & Leadership',
  RESEARCH = 'Research & Data',
  INFRASTRUCTURE = 'Infrastructure',
  DISSEMINATION = 'Dissemination'
}

export interface CreditRole {
  id: string;
  title: string;
  description: string;
  examples: string[];
  category: CategoryType;
  icon: LucideIcon;
}

export interface HexagonProps {
  role: CreditRole;
  isActive: boolean;
  onClick: (role: CreditRole) => void;
  className?: string;
}