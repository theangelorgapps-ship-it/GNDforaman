import type { Audience, Devotional } from "./types";
export const devotionals: Devotional[] = [
  {
    id: "dont-sleep",
    title: "Don’t Sleep!",
    audience: "Adults",
    date: "2026-10-29",
    image: "/assets/october.png",
    category: "Devotional",
    minutes: 1,
    scriptureRef: "Proverbs 24:33-34 (ISV)",
    scripture:
      "“A little sleep! A little slumber! A little folding of my hands to rest!” Then your poverty will come upon you like a robber, your need like an armed bandit.",
    body: [
      "Health experts estimate that the average adult lifespan is approximately seventy to seventy-five years, and the typical sleep duration ranges from eight to ten hours per day. That means over the course of an entire lifetime, a person could spend roughly twenty-five years of them asleep! Today’s verse reveals a shocking biblical truth: resting at the wrong time possesses a faculty that spurs on poverty’s destructive allure.",
      "As a child of God, you have to live an active life. Don’t rest when there’s work to be done and souls to be won! Sleep, slack, and laziness are tools the devil utilises to ruin you. Do not become accustomed to an idle life, for it breeds nothing but poverty and destruction.",
    ],
    prayer:
      "God, give me the energy and willpower to carry out Your plan for me this year. Keep me alert and disciplined, so I make the most of every opportunity You place before me, in Jesus’ name.",
    declaration:
      "I will not allow the enemy to use the weapon of laziness to disrupt God’s plans for my life. I refuse to be idle when there is Kingdom work to be done.",
    furtherStudy: "Proverbs 10:4",
  },
  {
    id: "i-am-in-charge",
    title: "I Am in Charge",
    audience: "Teens",
    date: "2026-10-29",
    image: "/assets/teens.png",
    category: "Devotional",
    minutes: 1,
    scriptureRef: "Romans 12:1 (KJV)",
    scripture:
      "I beseech you therefore, brethren, by the mercies of God, that ye present your bodies a living sacrifice, holy, acceptable unto God, which is your reasonable service.",
    body: [
      "Being “in charge” doesn’t mean doing whatever you feel like; it means intentionally offering your life to God and letting His wisdom lead you. As a teenager, this applies to your choices, habits, friendships, mindset, and goals.",
      "When you consciously present yourself to God, you take responsibility for your life. You stop drifting with pressure, trends, or emotions and start living deliberately. Others may be controlled by impulses or opinions, but you choose discipline and purpose. This is spiritual leadership, governing your life from the inside out.",
      "You are not powerless. God has given you the ability to decide what influences you allow and how you respond. When your life is yielded to God, confusion loses control, and direction becomes clear. You are not a victim of circumstances; you are in charge through Christ.",
    ],
    prayer:
      "Father, I present my life to You. Help me live intentionally, make wise choices, and walk daily in clarity and purpose. Amen.",
    declaration:
      "I am in charge through Christ. My life is disciplined, God led, purposeful, and aligned with divine wisdom daily.",
    furtherStudy: "Galatians 2:20",
  },
  {
    id: "little-lights-big-love",
    title: "Little Lights, Big Love",
    audience: "Kids",
    date: "2026-10-29",
    image: "/assets/kids.jpg",
    category: "Kindness",
    minutes: 3,
    scriptureRef: "Matthew 5:16 (NIRV)",
    scripture:
      "In the same way, let your light shine so others can see it. Then they will praise your Father in heaven.",
    body: [
      "Did you know that you are a little light? Just like a flashlight in a dark room shows us where to walk, your kindness shows people how much Jesus loves them.",
      "When you share your toys, help clean up, or say nice words to a friend who is sad, your light is shining super bright!",
      "Today, try to find one way to help someone at home or at school. Be a helper and watch how happy it makes everyone around you!",
    ],
    prayer:
      "Dear Jesus, thank You for loving me. Help me to shine my little light today. Teach me to be kind, to share my toys, and to help others smile. Amen!",
  },
];
export const todayFor = (audience: Audience) =>
  devotionals.find((d) => d.audience === audience) ?? devotionals[0]!;
export function readingBadge(devotional: Devotional, today = new Date()) {
  const localDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
  if (devotional.audience !== "Kids" && devotional.date === localDate)
    return "Today’s reading";
  const date = new Date(`${devotional.date}T12:00:00`).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "short", year: "numeric" },
  );
  return `${devotional.audience === "Kids" ? "Sample reading" : "Latest reading"} · ${date}`;
}
export const storyTitles = [
  "We’re igniting young minds with enthusiasm in Sunday School",
  "YouTube Series 2, 10 Questions With…",
  "GoodNews Daily Kids impact, Pakistan Islamabad",
  "Young Hearts All Across Africa Welcome The GoodNews Daily",
  "GoodNews Daily makes its debut in Portugal",
  "Reaching New Territories, Students in Singapore Receive the GoodNews Daily",
  "Venturing into the heart of Fiji: Reaching remote communities",
  "Making waves in France",
];
