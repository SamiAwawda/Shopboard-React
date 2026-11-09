// Types of the hero: what the slider needs to know about a product.
import type { IconName } from "../../ui/Icon";

export interface HeroProduct {
  id: number;
  name: string;
  priceCents: number;
  description: string;
  accent: string;
  imageScale: number;
  heroImage: string;
  thumbnailImage: string;
}

export interface Selection {
  index: number;
  direction: number;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
}
