
import { 
  FileText, 
  Search, 
  Bot, 
  Pencil, 
  Database, 
  Mail 
} from "lucide-react";

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: any;
}

export const services: Service[] = [
  {
    id: "uiux-assessment",
    name: "UI/UX Assessment",
    description: "AI-powered analysis of user interfaces and experiences to improve usability and conversion.",
    icon: FileText
  },
  {
    id: "competitor-research",
    name: "Competitor Research",
    description: "Deep insights into competitor strategies, strengths, and weaknesses.",
    icon: Search
  },
  {
    id: "competitor-crawler",
    name: "Competitor Crawler",
    description: "Automated data extraction from competitor websites for comprehensive analysis.",
    icon: Bot
  },
  {
    id: "seo-writer",
    name: "SEO and Topic Writer",
    description: "AI-generated SEO-optimized content tailored to your niche.",
    icon: Pencil
  },
  {
    id: "fair-database",
    name: "Convention Database",
    description: "Centralized data storage for industry conventions, including comprehensive Hannover Messe insights and documentation.",
    icon: Database
  },
  {
    id: "personalized-outreach",
    name: "Hyperpersonalized Outreach",
    description: "AI-driven communication tailored uniquely to each recipient.",
    icon: Mail
  }
];
