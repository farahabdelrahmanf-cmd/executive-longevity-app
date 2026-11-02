export interface ProtocolItem {
  id: string;
  title: string;
  expert: string;
  badge: string;
  summary: string;
  keyPoints: string[];
  actionSteps: string[];
}

export const LONGEVITY_PROTOCOLS: ProtocolItem[] = [
  {
    id: "attia-pillars",
    title: "The 4 Rules of Longevity & Strength",
    expert: "Dr. Peter Attia, MD",
    badge: "Core Framework",
    summary: "Simple, powerful rules to stay strong, protect your joints, and maintain high vitality into your 80s and 90s.",
    keyPoints: [
      "Muscle Is Your Armor: Lean muscle keeps blood sugar stable, burns calories even when resting, and keeps you agile.",
      "Conversational Cardio (Zone 2): 150 minutes a week of easy, steady walking or cycling builds your aerobic engine without tiring you out or making you sore.",
      "Grip Strength: Strong hands and forearms are scientifically linked to lower risk of cardiovascular problems and back injuries.",
      "Joint Safety First: By using modern guided machines at Fitness Time+, you get 100% of the muscle benefit with zero dangerous pressure on your back."
    ],
    actionSteps: [
      "Follow the app's 3-second lowering tempo on machines to protect your tendons.",
      "Keep your walking pace easy enough that you can breathe through your nose.",
      "Do the dumbbell farmer carries every Sunday and Wednesday."
    ]
  },
  {
    id: "huberman-thermal",
    title: "Sauna & Thermal Recovery",
    expert: "Dr. Andrew Huberman, PhD",
    badge: "Recovery Science",
    summary: "Using the dry sauna and jacuzzis at Fitness Time+ to lower blood pressure, soothe sore muscles, and sleep deeper.",
    keyPoints: [
      "Heat Shock Proteins: 15 minutes of dry heat (80-85°C) stimulates natural repair proteins that clean up cellular waste and protect your heart.",
      "40% Lower Heart Risk: Studies show 2-3 sauna sessions a week significantly reduce cardiovascular disease risk and lower blood pressure.",
      "Stress Decompression: Alternating the heat with a cool rinse relaxes your nervous system instantly after high-pressure corporate decisions.",
      "Better Sleep: An evening sauna naturally cools your internal body temperature an hour later, signaling your brain to fall into deep, uninterrupted sleep."
    ],
    actionSteps: [
      "Use the Fitness Time+ dry sauna on Sunday, Wednesday, and Friday for 12-15 minutes.",
      "Follow with a quick cool shower to stimulate circulation.",
      "Drink a bottle of water with a pinch of electrolytes afterwards."
    ]
  },
  {
    id: "executive-circadian",
    title: "Sleep & Energy Rules for Long Workdays",
    expert: "Circadian Science",
    badge: "High-Stress Performance",
    summary: "How an executive working 7:30 AM to 7:00 PM at Saudi Technic can maintain high energy all day and get restorative sleep.",
    keyPoints: [
      "Morning Natural Light: Look at natural daylight for 10-15 minutes on your morning commute to set your internal energy clock.",
      "The 1:30 PM Coffee Cutoff: Caffeine stays in your bloodstream for 8-10 hours. Enjoy your Saudi coffee in the morning and early afternoon, then switch to water.",
      "Gym as a Mental Border: Use your 40-minute gym workout as the official wall that leaves work behind before you walk into your home.",
      "Cool Bedroom in Jeddah: Keep the AC comfortably cool at night (around 20-21°C) so your body can sink into deep restorative sleep."
    ],
    actionSteps: [
      "Last cup of coffee before 1:30 PM at the office.",
      "Head straight from Saudi Technic to Fitness Time+ to sweat out the day's stress.",
      "Avoid reading work emails on your phone 60 minutes before bed."
    ]
  },
  {
    id: "executive-nutrition",
    title: "Executive Dining & Hydration in Jeddah",
    expert: "Metabolic Longevity",
    badge: "Vitality & Weight",
    summary: "Easy nutritional guidelines to shed excess weight, avoid the 2:00 PM afternoon crash, and feel energetic.",
    keyPoints: [
      "Prioritize Quality Protein: Aim for a palm-sized portion of grilled chicken, fish, eggs, or lean meat at each meal to maintain muscle while dropping fat.",
      "Smart Business Lunches: At corporate dining events, fill your plate with grilled proteins and salads first; avoid heavy white rice and sugary desserts that cause afternoon sluggishness.",
      "Hydration in Air-Conditioned Offices: Office AC and the Jeddah climate cause subtle dehydration. Drink 2.5 to 3 liters of water daily.",
      "Early Dinners: Try to finish dinner at least 2.5 to 3 hours before bed so your stomach is resting while you sleep."
    ],
    actionSteps: [
      "Start the morning with a tall glass of water before your first coffee.",
      "Choose grilled fish or chicken with vegetables at executive lunches.",
      "Check your body composition on the Fitness Time+ InBody machine once a month."
    ]
  }
];
