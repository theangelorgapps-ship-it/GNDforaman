export type Audience = "Adults" | "Teens" | "Kids";
export interface Devotional {
  id: string;
  title: string;
  audience: Audience;
  date: string;
  image: string;
  category: string;
  minutes: number;
  scriptureRef: string;
  scripture: string;
  body: string[];
  prayer: string;
  declaration?: string;
  furtherStudy?: string;
}
export type Screen =
  | "home"
  | "library"
  | "collections"
  | "bible"
  | "profile"
  | "reader"
  | "notes"
  | "store"
  | "product";
