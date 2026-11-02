export interface MotivationPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  dateTag?: string;
  aspect?: "portrait" | "landscape" | "square";
}

export const INITIAL_MOTIVATION_PHOTOS: MotivationPhoto[] = [
  {
    id: "father-son-hug",
    url: "/photos/father-son-hug.jpg",
    title: "Unbreakable Bond",
    caption: "A son's deepest pride and love. Staying strong, pain-free, and energetic for every hug, every milestone, and every year ahead.",
    dateTag: "Heart & Purpose",
    aspect: "portrait"
  },
  {
    id: "family-amsterdam",
    url: "/photos/family-amsterdam.jpg",
    title: "Family Is Everything",
    caption: "Exploring the world together, smiling in the sunshine, and creating memories that last for generations.",
    dateTag: "Family Core",
    aspect: "portrait"
  },
  {
    id: "baby-cheeks",
    url: "/photos/baby-cheeks.jpg",
    title: "The Purest Joy",
    caption: "The sweet smiles, the tiny hands, and the pure joy that gives every rep and every healthy choice its true meaning.",
    dateTag: "Cherished Moments",
    aspect: "portrait"
  },
  {
    id: "sofa-hug",
    url: "/photos/sofa-hug.jpg",
    title: "Warmth & Security",
    caption: "Being the strong pillar of the family. Keeping your vitality high for cozy movie nights and quiet home moments.",
    dateTag: "Home & Heart",
    aspect: "landscape"
  },
  {
    id: "bus-ride",
    url: "/photos/bus-ride.jpg",
    title: "Adventures & Memories",
    caption: "Every bus ride, flight, and family journey. Training today so you can hike, travel, and explore with ease at 70, 80, and beyond.",
    dateTag: "Endless Adventures",
    aspect: "landscape"
  },
  {
    id: "vp-saudia-technic",
    url: "/photos/vp-saudia-technic.jpg",
    title: "Executive Leadership • Saudia Technic",
    caption: "Leading Saudia Technic Marketing & Sales with sharp mental clarity, effortless executive presence, and sustained high energy.",
    dateTag: "Saudia Technic • VP",
    aspect: "portrait"
  }
];
