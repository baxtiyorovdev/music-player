export interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string;
  url: string;
  favorite: boolean;
}

export type AddMethod = "url" | "file" | null;
