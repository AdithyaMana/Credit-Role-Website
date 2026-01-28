import { 
  Lightbulb, 
  Database, 
  Calculator, 
  DollarSign, 
  Microscope, 
  GitCompareArrows, 
  FolderTree, 
  Box, 
  Code, 
  Eye, 
  CheckCircle2, 
  BarChart3, 
  Pencil, 
  MessageSquareText 
} from 'lucide-react';
import { CategoryType, CreditRole } from '../types';

export const creditRoles: CreditRole[] = [
  // Strategy & Leadership (Indigo)
  {
    id: 'conceptualization',
    title: 'Conceptualization',
    description: 'Ideas; formulation or evolution of overarching research goals and aims.',
    category: CategoryType.STRATEGY,
    icon: Lightbulb,
    examples: [
      'Formulating the core research question',
      'Developing hypotheses',
      'Defining the scope of the study',
      'Proposing the initial idea'
    ]
  },
  {
    id: 'funding-acquisition',
    title: 'Funding Acquisition',
    description: 'Acquisition of the financial support for the project leading to this publication.',
    category: CategoryType.STRATEGY,
    icon: DollarSign,
    examples: [
      'Writing grant proposals',
      'Securing research fellowships',
      'Managing grant funds',
      'Sourcing financial support'
    ]
  },
  {
    id: 'project-admin',
    title: 'Project Administration',
    description: 'Management and coordination responsibility for the research activity planning and execution.',
    category: CategoryType.STRATEGY,
    icon: FolderTree,
    examples: [
      'Managing the research team',
      'Coordinating study activities',
      'Tracking project timelines',
      'Organizing project meetings'
    ]
  },
  {
    id: 'supervision',
    title: 'Supervision',
    description: 'Oversight and leadership responsibility for the research activity planning and execution, including mentorship external to the core team.',
    category: CategoryType.STRATEGY,
    icon: Eye,
    examples: [
      'Mentoring junior researchers',
      'Providing strategic direction',
      'Overseeing project progress',
      'Reviewing and signing off on outputs'
    ]
  },

  // Investigation & Data (Teal)
  {
    id: 'data-curation',
    title: 'Data Curation',
    description: 'Management activities to annotate (produce metadata), scrub data and maintain research data (including software code, where it is necessary for interpreting the data) for initial use and later reuse.',
    category: CategoryType.RESEARCH,
    icon: Database,
    examples: [
      'Producing metadata',
      'Scrubbing and anonymizing data',
      'Archiving research data',
      'Managing data access'
    ]
  },
  {
    id: 'formal-analysis',
    title: 'Formal Analysis',
    description: 'Application of statistical, mathematical, computational, or other formal techniques to analyze or synthesize study data.',
    category: CategoryType.RESEARCH,
    icon: Calculator,
    examples: [
      'Running statistical tests',
      'Mathematical modeling',
      'Computational analysis',
      'Synthesizing study datasets'
    ]
  },
  {
    id: 'investigation',
    title: 'Investigation',
    description: 'Conducting a research and investigation process, specifically performing the experiments, or data/evidence collection.',
    category: CategoryType.RESEARCH,
    icon: Microscope,
    examples: [
      'Performing laboratory experiments',
      'Collecting data in the field',
      'Conducting interviews or surveys',
      'Gathering evidence'
    ]
  },
  {
    id: 'methodology',
    title: 'Methodology',
    description: 'Development or design of methodology; creation of models.',
    category: CategoryType.RESEARCH,
    icon: GitCompareArrows,
    examples: [
      'Designing experimental protocols',
      'Developing new models',
      'Creating survey instruments',
      'Establishing research frameworks'
    ]
  },
  {
    id: 'validation',
    title: 'Validation',
    description: 'Verification, whether as a part of the activity or separate, of the overall replication/reproducibility of results/experiments and other research outputs.',
    category: CategoryType.RESEARCH,
    icon: CheckCircle2,
    examples: [
      'Replicating experiments',
      'Verifying statistical outputs',
      'Checking code integrity',
      'Confirming reproducibility of results'
    ]
  },

  // Infrastructure (Slate)
  {
    id: 'resources',
    title: 'Resources',
    description: 'Provision of study materials, reagents, materials, patients, laboratory samples, animals, instrumentation, computing resources, or other analysis tools.',
    category: CategoryType.INFRASTRUCTURE,
    icon: Box,
    examples: [
      'Providing laboratory space',
      'Supplying reagents or animals',
      'Provisioning computing power',
      'Facilitating patient access'
    ]
  },
  {
    id: 'software',
    title: 'Software',
    description: 'Programming, software development; designing computer programs; implementation of the computer code and supporting algorithms; testing of existing code components.',
    category: CategoryType.INFRASTRUCTURE,
    icon: Code,
    examples: [
      'Writing custom code',
      'Developing algorithms',
      'Testing software components',
      'Maintaining code repositories'
    ]
  },

  // Dissemination (Amber)
  {
    id: 'visualization',
    title: 'Visualization',
    description: 'Preparation, creation and/or presentation of the published work, specifically visualization/data presentation.',
    category: CategoryType.DISSEMINATION,
    icon: BarChart3,
    examples: [
      'Creating charts and graphs',
      'Designing diagrams',
      'Preparing figure layouts',
      'Visualizing complex datasets'
    ]
  },
  {
    id: 'writing-original',
    title: 'Writing - Original Draft',
    description: 'Preparation, creation and/or presentation of the published work, specifically writing the initial draft (including substantive translation).',
    category: CategoryType.DISSEMINATION,
    icon: Pencil,
    examples: [
      'Writing the first draft',
      'Drafting the manuscript structure',
      'Substantive translation',
      'Producing the initial text'
    ]
  },
  {
    id: 'writing-review',
    title: 'Writing - Review & Editing',
    description: 'Preparation, creation and/or presentation of the published work by those from the original research group, specifically critical review, commentary or revision – including pre- or post-publication stages.',
    category: CategoryType.DISSEMINATION,
    icon: MessageSquareText,
    examples: [
      'Critical review of the draft',
      'Editing for content and flow',
      'Responding to peer reviewers',
      'Proofreading final versions'
    ]
  }
];