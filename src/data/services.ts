
import { 
  FileText, 
  Search, 
  Spider, 
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
    icon: Spider
  },
  {
    id: "seo-writer",
    name: "SEO and Topic Writer",
    description: "AI-generated SEO-optimized content tailored to your niche.",
    icon: Pencil
  },
  {
    id: "fair-database",
    name: "Fair Database",
    description: "Ethical data storage and management solutions for your business.",
    icon: Database
  },
  {
    id: "personalized-outreach",
    name: "Hyperpersonalized Outreach",
    description: "AI-driven communication tailored uniquely to each recipient.",
    icon: Mail
  }
];
