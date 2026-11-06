import { IconType } from "react-icons";
import {
  FaGithub,
  FaGitlab,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { personalData } from "@/../utils/Data/PersonalData";

export interface Social {
  label: string;
  handle: string;
  href: string;
  icon: IconType;
  note: string;
}

const all: Social[] = [
  {
    label: "GitHub",
    handle: "abraralis",
    href: personalData.github,
    icon: FaGithub,
    note: "Source code and experiments",
  },
  {
    label: "LinkedIn",
    handle: "abraralis",
    href: personalData.linkedIn,
    icon: FaLinkedin,
    note: "Professional history",
  },
  {
    label: "GitLab",
    handle: "AbraraliS",
    href: personalData.gitlab,
    icon: FaGitlab,
    note: "More repositories",
  },
  {
    label: "YouTube",
    handle: "@abraralis7",
    href: personalData.youtube,
    icon: FaYoutube,
    note: "Video channel",
  },
  {
    label: "X",
    handle: "@abrarali429",
    href: personalData.twitter,
    icon: FaXTwitter,
    note: "Posts and updates",
  },
  {
    label: "Instagram",
    handle: "@abrar00429",
    href: personalData.Instagram,
    icon: FaInstagram,
    note: "Personal",
  },
];

export const socials = all.filter((social) => social.href);
