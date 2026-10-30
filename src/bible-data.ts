// Verbatim public-domain scripture from https://bible-api.com/ (retrieved 2026-10-29).
// Offline: ASV John 2–4, Proverbs 24, Psalm 23, Genesis 1, Matthew 6, Romans 8;
// WEB John 3 and Proverbs 24. Other chapters use the public API with CORS.
export interface BibleVerse {
  verse: number;
  text: string;
}
export interface BibleBook {
  name: string;
  chapters: number;
  aliases?: string[];
}
export type BibleVersion = "asv" | "web";
export const BIBLE_VERSIONS: {
  id: BibleVersion;
  abbreviation: string;
  name: string;
}[] = [
  { id: "asv", abbreviation: "ASV", name: "American Standard Version (1901)" },
  { id: "web", abbreviation: "WEB", name: "World English Bible" },
];
export const BIBLE_BOOKS: BibleBook[] = [
  { name: "Genesis", chapters: 50, aliases: ["gen"] },
  { name: "Exodus", chapters: 40, aliases: ["ex"] },
  { name: "Leviticus", chapters: 27, aliases: ["lev"] },
  { name: "Numbers", chapters: 36, aliases: ["num"] },
  { name: "Deuteronomy", chapters: 34, aliases: ["deut"] },
  { name: "Joshua", chapters: 24, aliases: ["josh"] },
  { name: "Judges", chapters: 21, aliases: ["judg"] },
  { name: "Ruth", chapters: 4 },
  { name: "1 Samuel", chapters: 31, aliases: ["1 sam"] },
  { name: "2 Samuel", chapters: 24, aliases: ["2 sam"] },
  { name: "1 Kings", chapters: 22 },
  { name: "2 Kings", chapters: 25 },
  { name: "1 Chronicles", chapters: 29, aliases: ["1 chron"] },
  { name: "2 Chronicles", chapters: 36, aliases: ["2 chron"] },
  { name: "Ezra", chapters: 10 },
  { name: "Nehemiah", chapters: 13, aliases: ["neh"] },
  { name: "Esther", chapters: 10 },
  { name: "Job", chapters: 42 },
  { name: "Psalms", chapters: 150, aliases: ["psalm", "ps"] },
  { name: "Proverbs", chapters: 31, aliases: ["prov", "pr"] },
  { name: "Ecclesiastes", chapters: 12, aliases: ["eccl"] },
  { name: "Song of Solomon", chapters: 8, aliases: ["song of songs", "song"] },
  { name: "Isaiah", chapters: 66, aliases: ["isa"] },
  { name: "Jeremiah", chapters: 52, aliases: ["jer"] },
  { name: "Lamentations", chapters: 5, aliases: ["lam"] },
  { name: "Ezekiel", chapters: 48, aliases: ["ezek"] },
  { name: "Daniel", chapters: 12, aliases: ["dan"] },
  { name: "Hosea", chapters: 14, aliases: ["hos"] },
  { name: "Joel", chapters: 3 },
  { name: "Amos", chapters: 9 },
  { name: "Obadiah", chapters: 1, aliases: ["obad"] },
  { name: "Jonah", chapters: 4 },
  { name: "Micah", chapters: 7 },
  { name: "Nahum", chapters: 3 },
  { name: "Habakkuk", chapters: 3, aliases: ["hab"] },
  { name: "Zephaniah", chapters: 3, aliases: ["zeph"] },
  { name: "Haggai", chapters: 2, aliases: ["hag"] },
  { name: "Zechariah", chapters: 14, aliases: ["zech"] },
  { name: "Malachi", chapters: 4, aliases: ["mal"] },
  { name: "Matthew", chapters: 28, aliases: ["matt", "mt"] },
  { name: "Mark", chapters: 16, aliases: ["mk"] },
  { name: "Luke", chapters: 24, aliases: ["lk"] },
  { name: "John", chapters: 21, aliases: ["jn"] },
  { name: "Acts", chapters: 28 },
  { name: "Romans", chapters: 16, aliases: ["rom"] },
  { name: "1 Corinthians", chapters: 16, aliases: ["1 cor"] },
  { name: "2 Corinthians", chapters: 13, aliases: ["2 cor"] },
  { name: "Galatians", chapters: 6, aliases: ["gal"] },
  { name: "Ephesians", chapters: 6, aliases: ["eph"] },
  { name: "Philippians", chapters: 4, aliases: ["phil"] },
  { name: "Colossians", chapters: 4, aliases: ["col"] },
  { name: "1 Thessalonians", chapters: 5, aliases: ["1 thess"] },
  { name: "2 Thessalonians", chapters: 3, aliases: ["2 thess"] },
  { name: "1 Timothy", chapters: 6, aliases: ["1 tim"] },
  { name: "2 Timothy", chapters: 4, aliases: ["2 tim"] },
  { name: "Titus", chapters: 3 },
  { name: "Philemon", chapters: 1, aliases: ["philem"] },
  { name: "Hebrews", chapters: 13, aliases: ["heb"] },
  { name: "James", chapters: 5 },
  { name: "1 Peter", chapters: 5, aliases: ["1 pet"] },
  { name: "2 Peter", chapters: 3, aliases: ["2 pet"] },
  { name: "1 John", chapters: 5, aliases: ["1 jn"] },
  { name: "2 John", chapters: 1, aliases: ["2 jn"] },
  { name: "3 John", chapters: 1, aliases: ["3 jn"] },
  { name: "Jude", chapters: 1 },
  { name: "Revelation", chapters: 22, aliases: ["rev"] },
];
export interface BibleReference {
  book: string;
  chapter: number;
  verse?: number;
  endVerse?: number;
}
export function parseBibleReference(value: string): BibleReference | null {
  const match = value
    .trim()
    // Citation labels identify the quoted translation, not the reader's version.
    .replace(/\s*\([a-z][a-z0-9]{1,9}\)$/i, "")
    .replace(/[–—]/g, "-")
    .match(/^(.+?)\s*(\d{1,3})(?:\s*:\s*(\d{1,3})(?:\s*-\s*(\d{1,3}))?)?$/);
  if (!match) return null;
  const name = match[1]
    .trim()
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/\s+/g, " ");
  const book = BIBLE_BOOKS.find(
    (item) => item.name.toLowerCase() === name || item.aliases?.includes(name),
  );
  const chapter = Number(match[2]);
  const verse = match[3] ? Number(match[3]) : undefined;
  const endVerse = match[4] ? Number(match[4]) : undefined;
  if (
    !book ||
    chapter < 1 ||
    chapter > book.chapters ||
    verse === 0 ||
    (endVerse !== undefined && endVerse < (verse ?? 1))
  )
    return null;
  return { book: book.name, chapter, verse, endVerse };
}
export type HighlightColor = "yellow" | "blue" | "pink";
export interface BibleHighlight {
  book: string;
  chapter: number;
  verse: number;
  version: BibleVersion;
  text: string;
  color: HighlightColor;
}
export function restoreBibleHighlights(
  value: unknown,
): Record<string, BibleHighlight> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const restored: Record<string, BibleHighlight> = {};
  for (const raw of Object.values(value)) {
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) continue;
    const item = raw as Partial<BibleHighlight>;
    const book = BIBLE_BOOKS.find((book) => book.name === item.book);
    if (
      !book ||
      !Number.isInteger(item.chapter) ||
      item.chapter! < 1 ||
      item.chapter! > book.chapters ||
      !Number.isInteger(item.verse) ||
      item.verse! < 1 ||
      typeof item.text !== "string" ||
      !item.text.trim() ||
      !["asv", "web"].includes(item.version ?? "") ||
      !["yellow", "blue", "pink"].includes(item.color ?? "")
    )
      continue;
    const chapterKey = `${item.version}:${item.book}:${item.chapter}`;
    const offline = OFFLINE_CHAPTERS[chapterKey];
    if (offline && !offline.some((verse) => verse.verse === item.verse))
      continue;
    const key = `${chapterKey}:${item.verse}`;
    restored[key] = item as BibleHighlight;
  }
  return restored;
}
export const OFFLINE_CHAPTERS: Record<string, BibleVerse[]> = {
  "asv:John:2": [
    {
      verse: 1,
      text: "And the third day there was a marriage in Cana of Galilee; and the mother of Jesus was there:",
    },
    {
      verse: 2,
      text: "and Jesus also was bidden, and his disciples, to the marriage.",
    },
    {
      verse: 3,
      text: "And when the wine failed, the mother of Jesus saith unto him, They have no wine.",
    },
    {
      verse: 4,
      text: "And Jesus saith unto her, Woman, what have I to do with thee? mine hour is not yet come.",
    },
    {
      verse: 5,
      text: "His mother saith unto the servants, Whatsoever he saith unto you, do it.",
    },
    {
      verse: 6,
      text: "Now there were six waterpots of stone set there after the Jews` manner of purifying, containing two or three firkins apiece.",
    },
    {
      verse: 7,
      text: "Jesus saith unto them, Fill the waterpots with water. And they filled them up to the brim.",
    },
    {
      verse: 8,
      text: "And he saith unto them, Draw out now, and bear unto the ruler of the feast. And they bare it.",
    },
    {
      verse: 9,
      text: "And when the ruler of the feast tasted the water now become wine, and knew not whence it was (but the servants that had drawn the water knew), the ruler of the feast calleth the bridegroom,",
    },
    {
      verse: 10,
      text: "and saith unto him, Every man setteth on first the good wine; and when [men] have drunk freely, [then] that which is worse: thou hast kept the good wine until now.",
    },
    {
      verse: 11,
      text: "This beginning of his signs did Jesus in Cana of Galilee, and manifested his glory; and his disciples believed on him.",
    },
    {
      verse: 12,
      text: "After this he went down to Capernaum, he, and his mother, and [his] brethren, and his disciples; and there they abode not many days.",
    },
    {
      verse: 13,
      text: "And the passover of the Jews was at hand, and Jesus went up to Jerusalem.",
    },
    {
      verse: 14,
      text: "And he found in the temple those that sold oxen and sheep and doves, and the changers of money sitting:",
    },
    {
      verse: 15,
      text: "and he made a scourge of cords, and cast all out of the temple, both the sheep and the oxen; and he poured out the changers` money, and overthrew their tables;",
    },
    {
      verse: 16,
      text: "and to them that sold the doves he said, Take these things hence; make not my Father`s house a house of merchandise.",
    },
    {
      verse: 17,
      text: "His disciples remembered that it was written, Zeal for thy house shall eat me up.",
    },
    {
      verse: 18,
      text: "The Jews therefore answered and said unto him, What sign showest thou unto us, seeing that thou doest these things?",
    },
    {
      verse: 19,
      text: "Jesus answered and said unto them, Destroy this temple, and in three days I will raise it up.",
    },
    {
      verse: 20,
      text: "The Jews therefore said, Forty and six years was this temple in building, and wilt thou raise it up in three days?",
    },
    {
      verse: 21,
      text: "But he spake of the temple of his body.",
    },
    {
      verse: 22,
      text: "When therefore he was raised from the dead, his disciples remembered that he spake this; and they believed the scripture, and the word which Jesus had said.",
    },
    {
      verse: 23,
      text: "Now when he was in Jerusalem at the passover, during the feast, many believed on his name, beholding his signs which he did.",
    },
    {
      verse: 24,
      text: "But Jesus did not trust himself unto them, for that he knew all men,",
    },
    {
      verse: 25,
      text: "and because he needed not that any one should bear witness concerning man; for he himself knew what was in man.",
    },
  ],
  "asv:John:3": [
    {
      verse: 1,
      text: "Now there was a man of the Pharisees, named Nicodemus, a ruler of the Jews:",
    },
    {
      verse: 2,
      text: "the same came unto him by night, and said to him, Rabbi, we know that thou art a teacher come from God; for no one can do these signs that thou doest, except God be with him.",
    },
    {
      verse: 3,
      text: "Jesus answered and said unto him, Verily, verily, I say unto thee, Except one be born anew, he cannot see the kingdom of God.",
    },
    {
      verse: 4,
      text: "Nicodemus saith unto him, How can a man be born when he is old? can he enter a second time into his mother`s womb, and be born?",
    },
    {
      verse: 5,
      text: "Jesus answered, Verily, verily, I say unto thee, Except one be born of water and the Spirit, he cannot enter into the kingdom of God!",
    },
    {
      verse: 6,
      text: "That which is born of the flesh is flesh; and that which is born of the Spirit is spirit.",
    },
    {
      verse: 7,
      text: "Marvel not that I said unto thee, Ye must be born anew.",
    },
    {
      verse: 8,
      text: "The wind bloweth where it will, and thou hearest the voice thereof, but knowest not whence it cometh, and whither it goeth: so is every one that is born of the Spirit.",
    },
    {
      verse: 9,
      text: "Nicodemus answered and said unto him, How can these things be?",
    },
    {
      verse: 10,
      text: "Jesus answered and said unto him, Art thou the teacher of Israel, and understandest not these things?",
    },
    {
      verse: 11,
      text: "Verily, verily, I say unto thee, We speak that which we know, and bear witness of that which we have seen; and ye receive not our witness.",
    },
    {
      verse: 12,
      text: "If I told you earthly things and ye believe not, how shall ye believe if I tell you heavenly things?",
    },
    {
      verse: 13,
      text: "And no one hath ascended into heaven, but he that descended out of heaven, [even] the Son of man, who is in heaven.",
    },
    {
      verse: 14,
      text: "And as Moses lifted up the serpent in the wilderness, even so must the Son of man be lifted up;",
    },
    {
      verse: 15,
      text: "that whosoever believeth may in him have eternal life.",
    },
    {
      verse: 16,
      text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth on him should not perish, but have eternal life.",
    },
    {
      verse: 17,
      text: "For God sent not the Son into the world to judge the world; but that the world should be saved through him.",
    },
    {
      verse: 18,
      text: "He that believeth on him is not judged: he that believeth not hath been judged already, because he hath not believed on the name of the only begotten Son of God.",
    },
    {
      verse: 19,
      text: "And this is the judgment, that the light is come into the world, and men loved the darkness rather than the light; for their works were evil.",
    },
    {
      verse: 20,
      text: "For every one that doeth evil hateth the light, and cometh not to the light, lest his works should be reproved.",
    },
    {
      verse: 21,
      text: "But he that doeth the truth cometh to the light, that his works may be made manifest, that they have been wrought in God.",
    },
    {
      verse: 22,
      text: "After these things came Jesus and his disciples into the land of Judea; and there he tarried with them, and baptized.",
    },
    {
      verse: 23,
      text: "And John also was baptizing in Enon near to Salim, because there was much water there: and they came, and were baptized.",
    },
    {
      verse: 24,
      text: "For John was not yet cast into prison.",
    },
    {
      verse: 25,
      text: "There arose therefore a questioning on the part of John`s disciples with a Jew about purifying.",
    },
    {
      verse: 26,
      text: "And they came unto John, and said to him, Rabbi, he that was with thee beyond the Jordan, to whom thou hast borne witness, behold, the same baptizeth, and all men come to him.",
    },
    {
      verse: 27,
      text: "John answered and said, A man can receive nothing, except it have been given him from heaven.",
    },
    {
      verse: 28,
      text: "Ye yourselves bear me witness, that I said, I am not the Christ, but, that I am sent before him.",
    },
    {
      verse: 29,
      text: "He that hath the bride is the bridegroom: but the friend of the bridegroom, that standeth and heareth him, rejoiceth greatly because of the bridegroom`s voice: this my joy therefore is made full.",
    },
    {
      verse: 30,
      text: "He must increase, but I must decrease.",
    },
    {
      verse: 31,
      text: "He that cometh from above is above all: he that is of the earth is of the earth, and of the earth he speaketh: he that cometh from heaven is above all.",
    },
    {
      verse: 32,
      text: "What he hath seen and heard, of that he beareth witness; and no man receiveth his witness.",
    },
    {
      verse: 33,
      text: "He that hath received his witness hath set his seal to [this], that God is true.",
    },
    {
      verse: 34,
      text: "For he whom God hath sent speaketh the words of God: for he giveth not the Spirit by measure.",
    },
    {
      verse: 35,
      text: "The Father loveth the Son, and hath given all things into his hand.",
    },
    {
      verse: 36,
      text: "He that believeth on the Son hath eternal life; but he that obeyeth not the Son shall not see life, but the wrath of God abideth on him.",
    },
  ],
  "asv:John:4": [
    {
      verse: 1,
      text: "When therefore the Lord knew that the Pharisees had heard that Jesus was making and baptizing more disciples than John",
    },
    {
      verse: 2,
      text: "(although Jesus himself baptized not, but his disciples),",
    },
    {
      verse: 3,
      text: "he left Judea, and departed again into Galilee.",
    },
    {
      verse: 4,
      text: "And he must needs pass through Samaria.",
    },
    {
      verse: 5,
      text: "So he cometh to a city of Samaria, called Sychar, near to the parcel of ground that Jacob gave to his son Joseph:",
    },
    {
      verse: 6,
      text: "and Jacob`s well was there. Jesus therefore, being wearied with his journey, sat thus by the well. It was about the sixth hour.",
    },
    {
      verse: 7,
      text: "There cometh a woman of Samaria to draw water: Jesus saith unto her, Give me to drink.",
    },
    {
      verse: 8,
      text: "For his disciples were gone away into the city to buy food.",
    },
    {
      verse: 9,
      text: "The Samaritan woman therefore saith unto him, How is it that thou, being a Jew, askest drink of me, who am a Samaritan woman? (For Jews have no dealings with Samaritans.)",
    },
    {
      verse: 10,
      text: "Jesus answered and said unto unto her, If thou knewest the gift of God, and who it is that saith to thee, Give me to drink; thou wouldest have asked of him, and he would have given thee living water.",
    },
    {
      verse: 11,
      text: "The woman saith unto him, Sir, thou hast nothing to draw with, and the well is deep: whence then hast thou that living water?",
    },
    {
      verse: 12,
      text: "Art thou greater than our father Jacob, who gave us the well, and drank thereof himself, and his sons, and his cattle?",
    },
    {
      verse: 13,
      text: "Jesus answered and said unto her, Every one that drinketh of this water shall thirst again:",
    },
    {
      verse: 14,
      text: "but whosoever drinketh of the water that I shall give him shall never thirst; but the water that I shall give him shall become in him a well of water springing up unto eternal life.",
    },
    {
      verse: 15,
      text: "The woman saith unto him, Sir, give me this water, that I thirst not, neither come all the way hither to draw.",
    },
    {
      verse: 16,
      text: "Jesus saith unto her, Go, call thy husband, and come hither.",
    },
    {
      verse: 17,
      text: "The woman answered and said unto him, I have no husband. Jesus saith unto her, Thou saidst well, I have no husband:",
    },
    {
      verse: 18,
      text: "for thou hast had five husbands; and he whom thou now hast is not thy husband: this hast thou said truly.",
    },
    {
      verse: 19,
      text: "The woman saith unto him, Sir, I perceive that thou art a prophet.",
    },
    {
      verse: 20,
      text: "Our fathers worshipped in this mountain; and ye say, that in Jerusalem is the place where men ought to worship.",
    },
    {
      verse: 21,
      text: "Jesus saith unto her, Woman, believe me, the hour cometh, when neither in this mountain, nor in Jerusalem, shall ye worship the Father.",
    },
    {
      verse: 22,
      text: "Ye worship that which ye know not: we worship that which we know; for salvation is from the Jews.",
    },
    {
      verse: 23,
      text: "But the hour cometh, and now is, when the true worshippers shall worship the Father in spirit and truth: for such doth the Father seek to be his worshippers.",
    },
    {
      verse: 24,
      text: "God is a Spirit: and they that worship him must worship in spirit and truth.",
    },
    {
      verse: 25,
      text: "The woman saith unto him, I know that Messiah cometh (he that is called Christ): when he is come, he will declare unto us all things.",
    },
    {
      verse: 26,
      text: "Jesus saith unto her, I that speak unto thee am [he].",
    },
    {
      verse: 27,
      text: "And upon this came his disciples; and they marvelled that he was speaking with a woman; yet no man said, What seekest thou? or, Why speakest thou with her?",
    },
    {
      verse: 28,
      text: "So the woman left her waterpot, and went away into the city, and saith to the people,",
    },
    {
      verse: 29,
      text: "Come, see a man, who told me all things that [ever] I did: can this be the Christ?",
    },
    {
      verse: 30,
      text: "They went out of the city, and were coming to him.",
    },
    {
      verse: 31,
      text: "In the mean while the disciples prayed him, saying, Rabbi, eat.",
    },
    {
      verse: 32,
      text: "But he said unto them, I have meat to eat that ye know not.",
    },
    {
      verse: 33,
      text: "The disciples therefore said one to another, Hath any man brought him [aught] to eat?",
    },
    {
      verse: 34,
      text: "Jesus saith unto them, My meat is to do the will of him that sent me, and to accomplish his work.",
    },
    {
      verse: 35,
      text: "Say not ye, There are yet four months, and [then] cometh the harvest? behold, I say unto you, Lift up your eyes, and look on the fields, that they are white already unto harvest.",
    },
    {
      verse: 36,
      text: "He that reapeth receiveth wages, and gathereth fruit unto life eternal; that he that soweth and he that reapeth may rejoice together.",
    },
    {
      verse: 37,
      text: "For herein is the saying true, One soweth, and another reapeth.",
    },
    {
      verse: 38,
      text: "I sent you to reap that whereon ye have not labored: others have labored, and ye are entered into their labor.",
    },
    {
      verse: 39,
      text: "And from that city many of the Samaritans believed on him because of the word of the woman, who testified, He told me all things that [ever] I did.",
    },
    {
      verse: 40,
      text: "So when the Samaritans came unto him, they besought him to abide with them: and he abode there two days.",
    },
    {
      verse: 41,
      text: "And many more believed because of his word;",
    },
    {
      verse: 42,
      text: "and they said to the woman, Now we believe, not because of thy speaking: for we have heard for ourselves, and know that this is indeed the Saviour of the world.",
    },
    {
      verse: 43,
      text: "And after the two days he went forth from thence into Galilee.",
    },
    {
      verse: 44,
      text: "For Jesus himself testified, that a prophet hath no honor in his own country.",
    },
    {
      verse: 45,
      text: "So when he came into Galilee, the Galilaeans received him, having seen all the things that he did in Jerusalem at the feast: for they also went unto the feast.",
    },
    {
      verse: 46,
      text: "He came therefore again unto Cana of Galilee, where he made the water wine. And there was a certain nobleman, whose son was sick at Capernaum.",
    },
    {
      verse: 47,
      text: "When he heard that Jesus was come out of Judaea into Galilee, he went unto him, and besought [him] that he would come down, and heal his son; for he was at the point of death.",
    },
    {
      verse: 48,
      text: "Jesus therefore said unto him, Except ye see signs and wonders, ye will in no wise believe.",
    },
    {
      verse: 49,
      text: "The nobleman saith unto him, Sir, come down ere my child die.",
    },
    {
      verse: 50,
      text: "Jesus saith unto him, Go thy way; thy son liveth. The man believed the word that Jesus spake unto him, and he went his way.",
    },
    {
      verse: 51,
      text: "And as he was now going down, his servants met him, saying, that his son lived.",
    },
    {
      verse: 52,
      text: "So he inquired of them the hour when he began to amend. They said therefore unto him, Yesterday at the seventh hour the fever left him.",
    },
    {
      verse: 53,
      text: "So the father knew that [it was] at that hour in which Jesus said unto him, Thy son liveth: and himself believed, and his whole house.",
    },
    {
      verse: 54,
      text: "This is again the second sign that Jesus did, having come out of Judaea into Galilee.",
    },
  ],
  "asv:Proverbs:24": [
    {
      verse: 1,
      text: "Be not thou envious against evil men; Neither desire to be with them:",
    },
    {
      verse: 2,
      text: "For their heart studieth oppression, And their lips talk of mischief.",
    },
    {
      verse: 3,
      text: "Through wisdom is a house builded; And by understanding it is established;",
    },
    {
      verse: 4,
      text: "And by knowledge are the chambers filled With all precious and pleasant riches.",
    },
    {
      verse: 5,
      text: "A wise man is strong; Yea, a man of knowledge increaseth might",
    },
    {
      verse: 6,
      text: "For by wise guidance thou shalt make thy war;  And in the multitude of counsellors there is safety.",
    },
    {
      verse: 7,
      text: "Wisdom is too high for a fool: He openeth not his mouth in the gate.",
    },
    {
      verse: 8,
      text: "He that deviseth to do evil, Men shall call him a mischief-maker.",
    },
    {
      verse: 9,
      text: "The thought of foolishness is sin; And the scoffer is an abomination to men.",
    },
    {
      verse: 10,
      text: "If thou faint in the day of adversity, Thy strength is small.",
    },
    {
      verse: 11,
      text: "Deliver them that are carried away unto death, And those that are ready to be slain see that thou hold back.",
    },
    {
      verse: 12,
      text: "If thou sayest, Behold, we knew not this; Doth not he that weigheth the hearts consider it? And he that keepeth thy soul, doth not he know it? And shall not he render to every man according to his work?",
    },
    {
      verse: 13,
      text: "My son, eat thou honey, for it is good; And the droppings of the honeycomb, which are sweet to thy taste:",
    },
    {
      verse: 14,
      text: "So shalt thou know wisdom to be unto thy soul; If thou hast found it, then shall there be a reward, And thy hope shall not be cut off.",
    },
    {
      verse: 15,
      text: "Lay not wait, O wicked man, against the habitation of       the righteous; Destroy not his resting-place:",
    },
    {
      verse: 16,
      text: "For a righteous man falleth seven times, and riseth up       again; But the wicked are overthrown by calamity.",
    },
    {
      verse: 17,
      text: "Rejoice not when thine enemy falleth, And let not thy heart be glad when he is overthrown;",
    },
    {
      verse: 18,
      text: "Lest Jehovah see it, and it displease him, And he turn away his wrath from him.",
    },
    {
      verse: 19,
      text: "Fret not thyself because of evil-doers; Neither be thou envious at the wicked:",
    },
    {
      verse: 20,
      text: "For there shall be no reward to the evil man; The lamp of the wicked shall be put out.",
    },
    {
      verse: 21,
      text: "My son, fear thou Jehovah and the king; [And] company not with them that are given to change:",
    },
    {
      verse: 22,
      text: "For their calamity shall rise suddenly; And the destruction from them both, who knoweth it?",
    },
    {
      verse: 23,
      text: "These also are [sayings] of the wise.      To have respect of persons in judgment is not good.",
    },
    {
      verse: 24,
      text: "He that saith unto the wicked, Thou art righteous; Peoples shall curse him, nations shall abhor him:",
    },
    {
      verse: 25,
      text: "But to them that rebuke [him] shall be delight,  And a good blessing shall come upon them.",
    },
    {
      verse: 26,
      text: "He kisseth the lips Who giveth a right answer.",
    },
    {
      verse: 27,
      text: "Prepare thy work without, And make it ready for thee in the field; And afterwards build thy house.",
    },
    {
      verse: 28,
      text: "Be not a witness against thy neighbor without cause; And deceive not with thy lips.",
    },
    {
      verse: 29,
      text: "Say not, I will do so to him as he hath done to me; I will render to the man according to his work.",
    },
    {
      verse: 30,
      text: "I went by the field of the sluggard, And by the vineyard of the man void of understanding;",
    },
    {
      verse: 31,
      text: "And, lo, it was all grown over with thorns, The face thereof was covered with nettles, And the stone wall thereof was broken down.",
    },
    {
      verse: 32,
      text: "Then I beheld, and considered well; I saw, and received instruction:",
    },
    {
      verse: 33,
      text: "[Yet] a little sleep, a little slumber, A little folding of the hands to sleep;",
    },
    {
      verse: 34,
      text: "So shall thy poverty come as a robber, And thy want as an armed man.",
    },
  ],
  "asv:Psalms:23": [
    {
      verse: 1,
      text: "Jehovah is my shepherd; I shall not want.",
    },
    {
      verse: 2,
      text: "He maketh me to lie down in green pastures; He leadeth me beside still waters.",
    },
    {
      verse: 3,
      text: "He restoreth my soul: He guideth me in the paths of righteousness for his name`s sake.",
    },
    {
      verse: 4,
      text: "Yea, thou I walk through the valley of the shadow of       death, I will fear no evil; for thou art with me; Thy rod and thy staff, they comfort me.",
    },
    {
      verse: 5,
      text: "Thou preparest a table before me in the presence of mine       enemies: Thou hast anointed my head with oil; My cup runneth over.",
    },
    {
      verse: 6,
      text: "Surely goodness and lovingkindness shall follow me all       the days of my life; And I shall dwell in the house of Jehovah for ever.           Psalm 24  A Psalm of David.",
    },
  ],
  "asv:Genesis:1": [
    {
      verse: 1,
      text: "In the beginning God created the heavens and the earth.",
    },
    {
      verse: 2,
      text: "And the earth was waste and void; and darkness was upon the face of the deep: and the Spirit of God moved upon the face of the waters",
    },
    {
      verse: 3,
      text: "And God said, Let there be light: and there was light.",
    },
    {
      verse: 4,
      text: "And God saw the light, that it was good: and God divided the light from the darkness.",
    },
    {
      verse: 5,
      text: "And God called the light Day, and the darkness he called Night. And there was evening and there was morning, one day.",
    },
    {
      verse: 6,
      text: "And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters.",
    },
    {
      verse: 7,
      text: "And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so.",
    },
    {
      verse: 8,
      text: "And God called the firmament Heaven. And there was evening and there was morning, a second day.",
    },
    {
      verse: 9,
      text: "And God said, Let the waters under the heavens be gathered together unto one place, and let the dry land appear: and it was so.",
    },
    {
      verse: 10,
      text: "And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good.",
    },
    {
      verse: 11,
      text: "And God said, Let the earth put forth grass, herbs yielding seed, [and] fruit-trees bearing fruit after their kind, wherein is the seed thereof, upon the earth: and it was so.",
    },
    {
      verse: 12,
      text: "And the earth brought forth grass, herbs yielding seed after their kind, and trees bearing fruit, wherein is the seed thereof, after their kind: and God saw that it was good.",
    },
    {
      verse: 13,
      text: "And there was evening and there was morning, a third day.",
    },
    {
      verse: 14,
      text: "And God said, Let there be lights in the firmament of heaven to divide the day from the night; and let them be for signs, and for seasons, and for days and years:",
    },
    {
      verse: 15,
      text: "and let them be for lights in the firmament of heaven to give light upon the earth: and it was so.",
    },
    {
      verse: 16,
      text: "And God made the two great lights; the greater light to rule the day, and the lesser light to rule the night: [he made] the stars also.",
    },
    {
      verse: 17,
      text: "And God set them in the firmament of heaven to give light upon the earth,",
    },
    {
      verse: 18,
      text: "and to rule over the day and over the night, and to divide the light from the darkness: and God saw that it was good.",
    },
    {
      verse: 19,
      text: "And there was evening and there was morning, a fourth day.",
    },
    {
      verse: 20,
      text: "And God said, Let the waters swarm with swarms of living creatures, and let birds fly above the earth in the open firmament of heaven.",
    },
    {
      verse: 21,
      text: "And God created the great sea-monsters, and every living creature that moveth, wherewith the waters swarmed, after their kind, and every winged bird after its kind: and God saw that it was good.",
    },
    {
      verse: 22,
      text: "And God blessed them, saying, Be fruitful, and multiply, and fill the waters in the seas, and let birds multiply on the earth.",
    },
    {
      verse: 23,
      text: "And there was evening and there was morning, a fifth day.",
    },
    {
      verse: 24,
      text: "And God said, Let the earth bring forth living creatures after their kind, cattle, and creeping things, and beasts of the earth after their kind: and it was so.",
    },
    {
      verse: 25,
      text: "And God made the beasts of the earth after their kind, and the cattle after their kind, and everything that creepeth upon the ground after its kind: and God saw that it was good.",
    },
    {
      verse: 26,
      text: "And God said, Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, and over the birds of the heavens, and over the cattle, and over all the earth, and over every creeping thing that creepeth upon the earth.",
    },
    {
      verse: 27,
      text: "And God created man in his own image, in the image of God created he him; male and female created he them.",
    },
    {
      verse: 28,
      text: "And God blessed them: and God said unto them, Be fruitful, and multiply, and replenish the earth, and subdue it; and have dominion over the fish of the sea, and over the birds of the heavens, and over every living thing that moveth upon the earth.",
    },
    {
      verse: 29,
      text: "And God said, Behold, I have given you every herb yielding seed, which is upon the face of all the earth, and every tree, in which is the fruit of a tree yielding seed; to you it shall be for food:",
    },
    {
      verse: 30,
      text: "and to every beast of the earth, and to every bird of the heavens, and to everything that creepeth upon the earth, wherein there is life, [I have given] every green herb for food: and it was so.",
    },
    {
      verse: 31,
      text: "And God saw everything that he had made, and, behold, it was very good. And there was evening and there was morning, the sixth day.",
    },
  ],
  "asv:Matthew:6": [
    {
      verse: 1,
      text: "Take heed that ye do not your righteousness before men, to be seen of them: else ye have no reward with your Father who is in heaven.",
    },
    {
      verse: 2,
      text: "When therefore thou doest alms, sound not a trumpet before thee, as the hypocrites do in the synagogues and in the streets, that they may have glory of men. Verily I say unto you, They have received their reward.",
    },
    {
      verse: 3,
      text: "But when thou doest alms, let not thy left hand know what thy right hand doeth:",
    },
    {
      verse: 4,
      text: "that thine alms may be in secret: and thy Father who seeth in secret shall recompense thee.",
    },
    {
      verse: 5,
      text: "And when ye pray, ye shall not be as the hypocrites: for they love to stand and pray in the synagogues and in the corners of the streets, that they may be seen of men. Verily I say unto you, They have received their reward.",
    },
    {
      verse: 6,
      text: "But thou, when thou prayest, enter into thine inner chamber, and having shut thy door, pray to thy Father who is in secret, and thy Father who seeth in secret shall recompense thee.",
    },
    {
      verse: 7,
      text: "And in praying use not vain repetitions, as the Gentiles do: for they think that they shall be heard for their much speaking.",
    },
    {
      verse: 8,
      text: "Be not therefore like unto them: for your Father knoweth what things ye have need of, before ye ask him.",
    },
    {
      verse: 9,
      text: "After this manner therefore pray ye. Our Father who art in heaven, Hallowed be thy name.",
    },
    {
      verse: 10,
      text: "Thy kingdom come. Thy will be done, as in heaven, so on earth.",
    },
    {
      verse: 11,
      text: "Give us this day our daily bread.",
    },
    {
      verse: 12,
      text: "And forgive us our debts, as we also have forgiven our debtors.",
    },
    {
      verse: 13,
      text: "And bring us not into temptation, but deliver us from the evil [one.]",
    },
    {
      verse: 14,
      text: "For if ye forgive men their trespasses, your heavenly Father will also forgive you.",
    },
    {
      verse: 15,
      text: "But if ye forgive not men their trespasses, neither will your Father forgive your trespasses.",
    },
    {
      verse: 16,
      text: "Moreover when ye fast, be not, as the hypocrites, of a sad countenance: for they disfigure their faces, that they may be seen of men to fast. Verily I say unto you, They have received their reward.",
    },
    {
      verse: 17,
      text: "But thou, when thou fastest, anoint thy head, and wash thy face;",
    },
    {
      verse: 18,
      text: "that thou be not seen of men to fast, but of thy Father who is in secret: and thy Father, who seeth in secret, shall recompense thee.",
    },
    {
      verse: 19,
      text: "Lay not up for yourselves treasures upon the earth, where moth and rust consume, and where thieves break through and steal:",
    },
    {
      verse: 20,
      text: "but lay up for yourselves treasures in heaven, where neither moth nor rust doth consume, and where thieves do not break through nor steal:",
    },
    {
      verse: 21,
      text: "for where thy treasure is, there will thy heart be also.",
    },
    {
      verse: 22,
      text: "The lamp of the body is the eye: if therefore thine eye be single, thy whole body shall be full of light.",
    },
    {
      verse: 23,
      text: "But if thine eye be evil, thy whole body shall be full of darkness. If therefore the light that is in thee be darkness, how great is the darkness!",
    },
    {
      verse: 24,
      text: "No man can serve two masters; for either he will hate the one, and love the other; or else he will hold to one, and despise the other. Ye cannot serve God and mammon.",
    },
    {
      verse: 25,
      text: "Therefore I say unto you, be not anxious for your life, what ye shall eat, or what ye shall drink; nor yet for your body, what ye shall put on. Is not the life more than the food, and the body than the raiment?",
    },
    {
      verse: 26,
      text: "Behold the birds of the heaven, that they sow not, neither do they reap, nor gather into barns; and your heavenly Father feedeth them. Are not ye of much more value then they?",
    },
    {
      verse: 27,
      text: "And which of you by being anxious can add one cubit unto the measure of his life?",
    },
    {
      verse: 28,
      text: "And why are ye anxious concerning raiment? Consider the lilies of the field, how they grow; they toil not, neither do they spin:",
    },
    {
      verse: 29,
      text: "yet I say unto you, that even Solomon in all his glory was not arrayed like one of these.",
    },
    {
      verse: 30,
      text: "But if God doth so clothe the grass of the field, which to-day is, and to-morrow is cast into the oven, [shall he] not much more [clothe] you, O ye of little faith?",
    },
    {
      verse: 31,
      text: "Be not therefore anxious, saying, What shall we eat? or, What shall we drink? or, Wherewithal shall we be clothed?",
    },
    {
      verse: 32,
      text: "For after all these things do the Gentiles seek; for your heavenly Father knoweth that ye have need of all these things.",
    },
    {
      verse: 33,
      text: "But seek ye first his kingdom, and his righteousness; and all these things shall be added unto you.",
    },
    {
      verse: 34,
      text: "Be not therefore anxious for the morrow: for the morrow will be anxious for itself. Sufficient unto the day is the evil thereof.",
    },
  ],
  "asv:Romans:8": [
    {
      verse: 1,
      text: "There is therefore now no condemnation to them that are in Christ Jesus.",
    },
    {
      verse: 2,
      text: "For the law of the Spirit of life in Christ Jesus made me free from the law of sin and of death.",
    },
    {
      verse: 3,
      text: "For what the law could not do, in that it was weak through the flesh, God, sending his own Son in the likeness of sinful flesh and for sin, condemned sin in the flesh:",
    },
    {
      verse: 4,
      text: "that the ordinance of the law might be fulfilled in us, who walk not after the flesh, but after the Spirit.",
    },
    {
      verse: 5,
      text: "For they that are after the flesh mind the things of the flesh; but they that are after the Spirit the things of the Spirit.",
    },
    {
      verse: 6,
      text: "For the mind of the flesh is death; but the mind of the Spirit is life and peace:",
    },
    {
      verse: 7,
      text: "because the mind of the flesh is enmity against God; for it is not subject to the law of God, neither indeed can it be:",
    },
    {
      verse: 8,
      text: "and they that are in the flesh cannot please God.",
    },
    {
      verse: 9,
      text: "But ye are not in the flesh but in the Spirit, if so be that the Spirit of God dwelleth in you. But if any man hath not the Spirit of Christ, he is none of his.",
    },
    {
      verse: 10,
      text: "And if Christ is in you, the body is dead because of sin; but the spirit is life because of righteousness.",
    },
    {
      verse: 11,
      text: "But if the Spirit of him that raised up Jesus from the dead dwelleth in you, he that raised up Christ Jesus from the dead shall give life also to your mortal bodies through his Spirit that dwelleth in you.",
    },
    {
      verse: 12,
      text: "So then, brethren, we are debtors, not to the flesh, to live after the flesh:",
    },
    {
      verse: 13,
      text: "for if ye live after the flesh, ye must die; but if by the Spirit ye put to death the deeds of the body, ye shall live.",
    },
    {
      verse: 14,
      text: "For as many as are led by the Spirit of God, these are sons of God.",
    },
    {
      verse: 15,
      text: "For ye received not the spirit of bondage again unto fear; but ye received the spirit of adoption, whereby we cry, Abba, Father.",
    },
    {
      verse: 16,
      text: "The Spirit himself beareth witness with our spirit, that we are children of God:",
    },
    {
      verse: 17,
      text: "and if children, then heirs; heirs of God, and joint-heirs with Christ; if so be that we suffer with [him], that we may be also glorified with [him].",
    },
    {
      verse: 18,
      text: "For I reckon that the sufferings of this present time are not worthy to be compared with the glory which shall be revealed to us-ward.",
    },
    {
      verse: 19,
      text: "For the earnest expectation of the creation waiteth for the revealing of the sons of God.",
    },
    {
      verse: 20,
      text: "For the creation was subjected to vanity, not of its own will, but by reason of him who subjected it, in hope",
    },
    {
      verse: 21,
      text: "that the creation itself also shall be delivered from the bondage of corruption into the liberty of the glory of the children of God.",
    },
    {
      verse: 22,
      text: "For we know that the whole creation groaneth and travaileth in pain together until now.",
    },
    {
      verse: 23,
      text: "And not only so, but ourselves also, who have the first-fruits of the Spirit, even we ourselves groan within ourselves, waiting for [our] adoption, [to wit], the redemption of our body.",
    },
    {
      verse: 24,
      text: "For in hope were we saved: but hope that is seen is not hope: for who hopeth for that which he seeth?",
    },
    {
      verse: 25,
      text: "But if we hope for that which we see not, [then] do we with patience wait for it.",
    },
    {
      verse: 26,
      text: "And in like manner the Spirit also helpeth our infirmity: for we know not how to pray as we ought; but the Spirit himself maketh intercession for [us] with groanings which cannot be uttered;",
    },
    {
      verse: 27,
      text: "and he that searcheth the hearts knoweth what is the mind of the Spirit, because he maketh intercession for the saints according to [the will of] God.",
    },
    {
      verse: 28,
      text: "And we know that to them that love God all things work together for good, [even] to them that are called according to [his] purpose.",
    },
    {
      verse: 29,
      text: "For whom he foreknew, he also foreordained [to be] conformed to the image of his Son, that he might be the firstborn among many brethren:",
    },
    {
      verse: 30,
      text: "and whom he foreordained, them he also called: and whom he called, them he also justified: and whom he justified, them he also glorified.",
    },
    {
      verse: 31,
      text: "What then shall we say to these things? If God [is] for us, who [is] against us?",
    },
    {
      verse: 32,
      text: "He that spared not his own Son, but delivered him up for us all, how shall he not also with him freely give us all things?",
    },
    {
      verse: 33,
      text: "Who shall lay anything to the charge of God`s elect? It is God that justifieth;",
    },
    {
      verse: 34,
      text: "who is he that condemneth? It is Christ Jesus that died, yea rather, that was raised from the dead, who is at the right hand of God, who also maketh intercession for us.",
    },
    {
      verse: 35,
      text: "Who shall separate us from the love of Christ? shall tribulation, or anguish, or persecution, or famine, or nakedness, or peril, or sword?",
    },
    {
      verse: 36,
      text: "Even as it is written, For thy sake we are killed all the day long; We were accounted as sheep for the slaughter.",
    },
    {
      verse: 37,
      text: "Nay, in all these things we are more than conquerors through him that loved us.",
    },
    {
      verse: 38,
      text: "For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor things present, nor things to come, nor powers,",
    },
    {
      verse: 39,
      text: "nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.",
    },
  ],
  "web:John:3": [
    {
      verse: 1,
      text: "Now there was a man of the Pharisees named Nicodemus, a ruler of the Jews.",
    },
    {
      verse: 2,
      text: "The same came to him by night, and said to him, “Rabbi, we know that you are a teacher come from God, for no one can do these signs that you do, unless God is with him.”",
    },
    {
      verse: 3,
      text: "Jesus answered him,\n“Most certainly, I tell you, unless one is born anew,\n\nhe can’t see God’s Kingdom.”",
    },
    {
      verse: 4,
      text: "Nicodemus said to him, “How can a man be born when he is old? Can he enter a second time into his mother’s womb, and be born?”",
    },
    {
      verse: 5,
      text: "Jesus answered,\n“Most certainly I tell you, unless one is born of water and spirit, he can’t enter into God’s Kingdom.",
    },
    {
      verse: 6,
      text: "That which is born of the flesh is flesh. That which is born of the Spirit is spirit.",
    },
    {
      verse: 7,
      text: "Don’t marvel that I said to you, ‘You must be born anew.’",
    },
    {
      verse: 8,
      text: "The wind\nblows where it wants to, and you hear its sound, but don’t know where it comes from and where it is going. So is everyone who is born of the Spirit.”",
    },
    {
      verse: 9,
      text: "Nicodemus answered him, “How can these things be?”",
    },
    {
      verse: 10,
      text: "Jesus answered him,\n“Are you the teacher of Israel, and don’t understand these things?",
    },
    {
      verse: 11,
      text: "Most certainly I tell you, we speak that which we know, and testify of that which we have seen, and you don’t receive our witness.",
    },
    {
      verse: 12,
      text: "If I told you earthly things and you don’t believe, how will you believe if I tell you heavenly things?",
    },
    {
      verse: 13,
      text: "No one has ascended into heaven, but he who descended out of heaven, the Son of Man, who is in heaven.",
    },
    {
      verse: 14,
      text: "As Moses lifted up the serpent in the wilderness, even so must the Son of Man be lifted up,",
    },
    {
      verse: 15,
      text: "that whoever believes in him should not perish, but have eternal life.",
    },
    {
      verse: 16,
      text: "For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life.",
    },
    {
      verse: 17,
      text: "For God didn’t send his Son into the world to judge the world, but that the world should be saved through him.",
    },
    {
      verse: 18,
      text: "He who believes in him is not judged. He who doesn’t believe has been judged already, because he has not believed in the name of the one and only Son of God.",
    },
    {
      verse: 19,
      text: "This is the judgment, that the light has come into the world, and men loved the darkness rather than the light; for their works were evil.",
    },
    {
      verse: 20,
      text: "For everyone who does evil hates the light, and doesn’t come to the light, lest his works would be exposed.",
    },
    {
      verse: 21,
      text: "But he who does the truth comes to the light, that his works may be revealed, that they have been done in God.”",
    },
    {
      verse: 22,
      text: "After these things, Jesus came with his disciples into the land of Judea. He stayed there with them, and baptized.",
    },
    {
      verse: 23,
      text: "John also was baptizing in Enon near Salim, because there was much water there. They came, and were baptized.",
    },
    {
      verse: 24,
      text: "For John was not yet thrown into prison.",
    },
    {
      verse: 25,
      text: "There arose therefore a questioning on the part of John’s disciples with some Jews about purification.",
    },
    {
      verse: 26,
      text: "They came to John, and said to him, “Rabbi, he who was with you beyond the Jordan, to whom you have testified, behold, the same baptizes, and everyone is coming to him.”",
    },
    {
      verse: 27,
      text: "John answered, “A man can receive nothing, unless it has been given him from heaven.",
    },
    {
      verse: 28,
      text: "You yourselves testify that I said, ‘I am not the Christ,’ but, ‘I have been sent before him.’",
    },
    {
      verse: 29,
      text: "He who has the bride is the bridegroom; but the friend of the bridegroom, who stands and hears him, rejoices greatly because of the bridegroom’s voice. This, my joy, therefore is made full.",
    },
    {
      verse: 30,
      text: "He must increase, but I must decrease.",
    },
    {
      verse: 31,
      text: "He who comes from above is above all. He who is from the earth belongs to the earth, and speaks of the earth. He who comes from heaven is above all.",
    },
    {
      verse: 32,
      text: "What he has seen and heard, of that he testifies; and no one receives his witness.",
    },
    {
      verse: 33,
      text: "He who has received his witness has set his seal to this, that God is true.",
    },
    {
      verse: 34,
      text: "For he whom God has sent speaks the words of God; for God gives the Spirit without measure.",
    },
    {
      verse: 35,
      text: "The Father loves the Son, and has given all things into his hand.",
    },
    {
      verse: 36,
      text: "One who believes in the Son has eternal life, but one who disobeys\n the Son won’t see life, but the wrath of God remains on him.”",
    },
  ],
  "web:Proverbs:24": [
    {
      verse: 1,
      text: "Don’t be envious of evil men;\nneither desire to be with them:",
    },
    {
      verse: 2,
      text: "for their hearts plot violence,\nand their lips talk about mischief.",
    },
    {
      verse: 3,
      text: "Through wisdom a house is built;\nby understanding it is established;",
    },
    {
      verse: 4,
      text: "by knowledge the rooms are filled\nwith all rare and beautiful treasure.",
    },
    {
      verse: 5,
      text: "A wise man has great power;\nand a knowledgeable man increases strength;",
    },
    {
      verse: 6,
      text: "for by wise guidance you wage your war;\nand victory is in many advisors.",
    },
    {
      verse: 7,
      text: "Wisdom is too high for a fool:\nhe doesn’t open his mouth in the gate.",
    },
    {
      verse: 8,
      text: "One who plots to do evil\nwill be called a schemer.",
    },
    {
      verse: 9,
      text: "The schemes of folly are sin.\nThe mocker is detested by men.",
    },
    {
      verse: 10,
      text: "If you falter in the time of trouble,\nyour strength is small.",
    },
    {
      verse: 11,
      text: "Rescue those who are being led away to death!\nIndeed, hold back those who are staggering to the slaughter!",
    },
    {
      verse: 12,
      text: "If you say, “Behold, we didn’t know this”;\ndoesn’t he who weighs the hearts consider it?\nHe who keeps your soul, doesn’t he know it?\nShall he not render to every man according to his work?",
    },
    {
      verse: 13,
      text: "My son, eat honey, for it is good;\nthe droppings of the honeycomb, which are sweet to your taste:",
    },
    {
      verse: 14,
      text: "so you shall know wisdom to be to your soul;\nif you have found it, then there will be a reward,\nyour hope will not be cut off.",
    },
    {
      verse: 15,
      text: "Don’t lay in wait, wicked man, against the habitation of the righteous.\nDon’t destroy his resting place:",
    },
    {
      verse: 16,
      text: "for a righteous man falls seven times, and rises up again;\nbut the wicked are overthrown by calamity.",
    },
    {
      verse: 17,
      text: "Don’t rejoice when your enemy falls.\nDon’t let your heart be glad when he is overthrown;",
    },
    {
      verse: 18,
      text: "lest Yahweh see it, and it displease him,\nand he turn away his wrath from him.",
    },
    {
      verse: 19,
      text: "Don’t fret yourself because of evildoers;\nneither be envious of the wicked:",
    },
    {
      verse: 20,
      text: "for there will be no reward to the evil man;\nand the lamp of the wicked shall be snuffed out.",
    },
    {
      verse: 21,
      text: "My son, fear Yahweh and the king.\nDon’t join those who are rebellious:",
    },
    {
      verse: 22,
      text: "for their calamity will rise suddenly;\nthe destruction from them both—who knows?",
    },
    {
      verse: 23,
      text: "These also are sayings of the wise.\nTo show partiality in judgment is not good.",
    },
    {
      verse: 24,
      text: "He who says to the wicked, “You are righteous”;\npeoples will curse him, and nations will abhor him—",
    },
    {
      verse: 25,
      text: "but it will go well with those who convict the guilty,\nand a rich blessing will come on them.",
    },
    {
      verse: 26,
      text: "An honest answer\nis like a kiss on the lips.",
    },
    {
      verse: 27,
      text: "Prepare your work outside,\nand get your fields ready.\nAfterwards, build your house.",
    },
    {
      verse: 28,
      text: "Don’t be a witness against your neighbor without cause.\nDon’t deceive with your lips.",
    },
    {
      verse: 29,
      text: "Don’t say, “I will do to him as he has done to me;\nI will render to the man according to his work.”",
    },
    {
      verse: 30,
      text: "I went by the field of the sluggard,\nby the vineyard of the man void of understanding;",
    },
    {
      verse: 31,
      text: "Behold, it was all grown over with thorns.\nIts surface was covered with nettles,\nand its stone wall was broken down.",
    },
    {
      verse: 32,
      text: "Then I saw, and considered well.\nI saw, and received instruction:",
    },
    {
      verse: 33,
      text: "a little sleep, a little slumber,\na little folding of the hands to sleep;",
    },
    {
      verse: 34,
      text: "so your poverty will come as a robber,\nand your want as an armed man.",
    },
  ],
};
