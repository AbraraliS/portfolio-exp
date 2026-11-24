import { Post } from "@/Types/types";

export const buildingCrizoAndroid: Post = {
  slug: "building-crizo-for-android",
  title:
    "Building Crizo for Android: a private app that files your payments for you",
  description:
    "How I built Crizo for Android in Kotlin and Jetpack Compose: payments read from bank alerts, data that stays on the phone, a live companion and signed updates without the Play Store.",
  excerpt:
    "Notes, reminders and money usually live in three apps. Crizo keeps them in one private place, files payments by itself and ships updates from its own website.",
  date: "2026-11-24",
  line: "ai",
  stops: ["Idea", "Design", "Build", "Test", "Release", "Update"],
  projects: ["crizo-app"],
  skills: ["Kotlin", "Jetpack Compose", "Android", "System Architecture"],
  blocks: [
    {
      t: "p",
      text: "[Crizo for Android](https://crizo.criza.dev) started from a small annoyance: the things I want to remember are scattered. A note in one app, a reminder in another, and every payment lost in a stream of bank messages. Crizo keeps notes, reminders, places, payments and budgets together, so it can connect them.",
    },
    { t: "h2", text: "Payments that file themselves" },
    {
      t: "p",
      text: "When a bank or UPI app posts a payment alert, Crizo reads it on the phone, works out the amount, the payee and a category, and saves it. Sure matches go straight in. Anything unclear waits for one tap, with an Undo always in reach, because a wrong automatic entry costs more trust than a skipped one.",
    },
    {
      t: "route",
      stops: [
        "Bank alert",
        "On-device parser",
        "Category",
        "Local database",
        "Budgets",
      ],
      label: "How a payment travels inside the phone",
    },
    { t: "h2", text: "Private by default" },
    {
      t: "list",
      items: [
        "**No account.** Everything is stored on the phone.",
        "**Optional encryption.** The database can be encrypted with SQLCipher, and a biometric lock guards the app.",
        "**Statistics off by default.** Usage numbers are only sent if the user turns them on.",
      ],
    },
    { t: "h2", text: "A companion, not a mascot" },
    {
      t: "p",
      text: "Crizo the character has moods, colours and outfits, and reacts to what happens: the time of day, a payment just saved, a streak kept. He can float over the phone and play a mini game, or stay quietly in the app. The point is warmth: an app you open because it feels like yours.",
    },
    { t: "h2", text: "Shipping without a store" },
    {
      t: "p",
      text: "Crizo is not on the Play Store yet, so it needed its own release line. GitHub Actions builds and signs every release. The website publishes the APK with its notes, size and SHA-256 checksum, and a small update feed tells installed apps, once a day, that a new version is ready.",
    },
    {
      t: "table",
      head: ["Step", "Where it happens"],
      rows: [
        ["Build and sign the APK", "GitHub Actions"],
        ["Publish notes, size and checksum", "crizo.criza.dev"],
        ["Find the new version", "The app, once a day"],
        ["Verify before installing", "The app, against the checksum"],
      ],
    },
    { t: "h2", text: "What 0.10.0 changed" },
    {
      t: "list",
      items: [
        "Smoother switching between tabs.",
        "The Crizo button became quick actions.",
        "Quick entry got its own Save button.",
        "A short first-run tour, with a Skip button.",
      ],
    },
    {
      t: "p",
      text: "Crizo is free. [Get it on crizo.criza.dev](https://crizo.criza.dev/download), or read the [case study](/projects/crizo-app).",
    },
  ],
};
