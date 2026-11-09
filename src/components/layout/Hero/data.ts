// Fixed data of the hero: the social links in its footer.
import type { SocialLink } from "./types";

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
  { label: "Facebook", href: "https://www.facebook.com/", icon: "facebook" },
  { label: "Telegram", href: "https://telegram.org/", icon: "send" },
];

// Animation numbers of the hero (pixels move, seconds last). `still()` turns them to 0 for reduced motion.
export const NEIGHBOUR_OFFSETS = [1, -1];
export const COPY_ENTER_Y = 10;
export const COPY_EXIT_Y = -8;
export const COPY_FADE_SECONDS = 0.2;
export const STAGE_ENTER_Y = 14;
export const STAGE_EXIT_Y = -12;
export const THUMB_ENTER_Y = 12;
export const THUMB_EXIT_Y = -12;
export const THUMB_SECONDS = 0.3;
export const THUMB_INFO_SECONDS = 0.25;
export const THUMB_INFO_DELAY_SECONDS = 0.1;
