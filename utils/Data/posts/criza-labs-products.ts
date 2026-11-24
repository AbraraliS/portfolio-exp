import { Post } from "@/Types/types";

export const crizaLabsProducts: Post = {
  slug: "building-products-at-criza-labs",
  title: "Building products at Criza Labs: Crizo, CrizaVoise and CrizaTools",
  description:
    "What I build at Criza Labs: a private Android app, free offline billing software and free browser tools, and the rules every one of them follows.",
  excerpt:
    "Three products, three platforms, one set of rules: free to start, private by default, and fast on the devices people already own.",
  date: "2026-11-24",
  line: "web",
  stops: ["Idea", "Design", "Build", "Ship", "Support"],
  projects: ["crizo-app", "crizavoise", "crizatools", "criza"],
  skills: ["Kotlin", "Flutter", "Astro", "System Architecture"],
  blocks: [
    {
      t: "p",
      text: "At [Criza Labs](https://criza.dev) I lead the studio and build its own products from the first sketch to the release. Each one answers a plain need, and each one runs on hardware people already have.",
    },
    { t: "h2", text: "Crizo for Android" },
    {
      t: "p",
      text: "[Crizo](https://crizo.criza.dev) keeps notes, reminders, places, payments and budgets in one private app. When a bank or UPI alert arrives, the payment files itself. Everything stays on the phone, with a biometric lock and an optional encrypted database, and a live animated companion makes it feel like yours.",
    },
    { t: "h2", text: "CrizaVoise" },
    {
      t: "p",
      text: "[CrizaVoise](https://voise.criza.dev) is free, open source billing software for small shops. It prints GST ready invoices and thermal receipts, tracks stock and payments, and works with no internet connection on Windows, Linux and macOS.",
    },
    { t: "h2", text: "CrizaTools" },
    {
      t: "p",
      text: "[CrizaTools](https://tools.criza.dev) is a growing set of free tools for documents, images and everyday work. Files are processed in your own browser, so nothing is uploaded.",
    },
    { t: "h2", text: "The rules they share" },
    {
      t: "list",
      items: [
        "**Free to start.** No account needed to try any of them.",
        "**Private by default.** Data stays on the device; analytics only with consent.",
        "**Fast on real devices.** Built and tested on ordinary phones and laptops.",
        "**Facts only.** No invented reviews, ratings or user counts.",
      ],
    },
    {
      t: "p",
      text: "Want something like this for your business? [Criza Labs](https://criza.dev/contact) builds websites, apps and AI tools on a fixed scope.",
    },
  ],
};
