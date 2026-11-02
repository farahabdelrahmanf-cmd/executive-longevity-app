import type { DayRoutine } from "../types";

export const WEEKLY_ROUTINE: DayRoutine[] = [
  {
    day: "Sunday",
    shortDay: "Sun",
    dayType: "workday",
    title: "Upper Posture, Grip & Neck Relief",
    subtitle: "Reverses desk posture from corporate meetings and builds essential grip strength for long-term vitality.",
    estimatedMinutes: 42,
    focus: "Upper Body & Posture",
    intensity: "Moderate",
    cardioMinutes: 12,
    recovery: {
      title: "Dry Finnish Sauna (80°C - 85°C)",
      durationMinutes: 12,
      facility: "Fitness Time+ Dry Finnish Sauna • Jeddah",
      temperature: "80°C - 85°C",
      procedure: [
        "Drink 500ml water with a pinch of electrolytes before entering.",
        "Sit on the middle bench for 12 minutes. Breathe slowly through your nose.",
        "Take a 2-minute cool shower right after.",
        "Rest 5 minutes in the lounge before heading home."
      ],
      scienceBenefit: "Triggers heat shock proteins that protect heart arteries and naturally switches your body from work stress into deep evening relaxation."
    },
    warmup: {
      title: "Rotator Cuff & Posture Joint Lubrication Sequence",
      durationMinutes: 6,
      executiveRationale: "Sitting in meetings rounds shoulders forward and stiffens the thoracic spine. Moving joints without load activates synovial fluid and pre-warms the rotator cuff to protect shoulders from impingement during presses and pulldowns.",
      steps: [
        {
          name: "Systemic Core Temperature Elevation",
          durationOrReps: "3 Minutes",
          instructions: "Pedal easily on the Technogym Recline Bike at Level 3 (60-70 RPM). Brings blood flow to working muscles and raises core temperature by 1°C.",
          equipment: "Technogym Recline Bike (Cardio Area)",
          jointFocus: "Cardiovascular & Systemic"
        },
        {
          name: "Standing Arm Circles & Wall Slides",
          durationOrReps: "15 Reps each direction",
          instructions: "Stand tall. Make 15 small circles forward, then 15 large. Next, slide your forearms up against a wall or post to activate upper back stabilizers.",
          jointFocus: "Shoulders & Rotator Cuff"
        },
        {
          name: "Thoracic Spine & Chest Openers",
          durationOrReps: "10 Slow Rotations",
          instructions: "Place hands on hips. Gently rotate shoulders and ribcage left to right. Interlace fingers behind lower back and gently pull down to open the chest.",
          jointFocus: "Thoracic Spine & Pectorals"
        },
        {
          name: "Chest Press Acclimatization Feeler Set",
          durationOrReps: "1 Set of 12 Light Reps",
          instructions: "Sit at Chest Press with seat adjusted to mid-chest. Select the lowest peg (20-30% working weight). Perform 12 slow reps to test shoulder path with zero strain.",
          equipment: "Technogym Chest Press",
          jointFocus: "Neuromuscular Calibration"
        }
      ]
    },
    exercises: [
      {
        id: "sun-1",
        name: "Chest Press Machine (Neutral Grip)",
        equipment: "Technogym Chest Press",
        category: "strength",
        targetSets: 3,
        targetReps: "8 - 10 reps",
        tempo: "3s lower, 1s press",
        restSeconds: 90,
        rpe: "7 / 10 (Smooth effort)",
        quickWhy: "Strengthens your chest and arms safely with zero risk of dropping weights after a long day.",
        scienceCue: "Lowering the weight slowly over 3 seconds strengthens your tendons and protects your shoulder joints.",
        executiveNote: "Adjust seat so the handles align directly with the middle of your chest.",
        visualKey: "chest-press",
        formKeys: [
          "Keep feet planted firmly flat on the floor",
          "Shoulders and back glued against the backrest",
          "Exhale as you press forward, inhale as you return"
        ],
        avoidKeys: [
          "Do not flare your elbows out too wide (keep them at 45°)",
          "Do not shrug your shoulders up toward your neck"
        ],
        defaultSets: [
          { setNumber: 1, targetReps: "10 reps", completed: false },
          { setNumber: 2, targetReps: "8-10 reps", completed: false },
          { setNumber: 3, targetReps: "8-10 reps", completed: false }
        ]
      },
      {
        id: "sun-2",
        name: "Lat Pulldown Machine (Neutral Grip)",
        equipment: "Technogym Cable Lat Pulldown",
        category: "strength",
        targetSets: 3,
        targetReps: "10 reps",
        tempo: "1s pull, 2s stretch up",
        restSeconds: 75,
        rpe: "7 / 10",
        quickWhy: "Opens up your upper back and spine after hours of sitting in Saudi Technic executive meetings.",
        scienceCue: "Directly counteracts the rounded-shoulder and forward-head posture caused by laptops and smartphones.",
        executiveNote: "Lock your thighs under the padded rollers so you stay anchored.",
        visualKey: "lat-pulldown",
        formKeys: [
          "Grip the bar slightly wider than shoulder width",
          "Pull the bar smoothly down to your upper collarbone",
          "Think about driving your elbows straight down toward your ribs"
        ],
        avoidKeys: [
          "Do not swing your whole torso backwards to pull the bar",
          "Do not pull the bar behind your neck (always pull to the front)"
        ],
        defaultSets: [
          { setNumber: 1, targetReps: "10 reps", completed: false },
          { setNumber: 2, targetReps: "10 reps", completed: false },
          { setNumber: 3, targetReps: "10 reps", completed: false }
        ]
      },
      {
        id: "sun-3",
        name: "Chest-Supported Seated Cable Row",
        equipment: "Technogym Low Row Machine",
        category: "strength",
        targetSets: 3,
        targetReps: "10 - 12 reps",
        tempo: "1s pull, 1s squeeze, 2s return",
        restSeconds: 75,
        rpe: "7 / 10",
        quickWhy: "Strengthens the muscles between your shoulder blades so you stand naturally taller with zero lower back strain.",
        scienceCue: "Chest support completely eliminates lumbar strain while building upper back resilience.",
        executiveNote: "Adjust the chest pad so you reach handles with arms fully extended.",
        visualKey: "seated-row",
        formKeys: [
          "Keep your sternum pressed lightly against the chest pad",
          "Pull handles toward your belly button",
          "Squeeze your shoulder blades together at the peak for 1 full second"
        ],
        avoidKeys: [
          "Do not lean back off the pad when pulling",
          "Do not jerk the weight with momentum"
        ],
        defaultSets: [
          { setNumber: 1, targetReps: "12 reps", completed: false },
          { setNumber: 2, targetReps: "10-12 reps", completed: false },
          { setNumber: 3, targetReps: "10 reps", completed: false }
        ]
      },
      {
        id: "sun-4",
        name: "Standing Cable Face Pulls",
        equipment: "Cable Pulley with Rope",
        category: "mobility",
        targetSets: 3,
        targetReps: "15 reps",
        tempo: "Smooth 2s cadence",
        restSeconds: 60,
        rpe: "6 - 7 / 10",
        quickWhy: "Melts away neck stiffness and keeps the rotator cuff tendons in your shoulders healthy and pain-free.",
        scienceCue: "Dr. Peter Attia considers face pulls the essential longevity movement for upper body joint integrity.",
        executiveNote: "Set the cable pulley at eye level.",
        visualKey: "face-pull",
        formKeys: [
          "Hold the rope with your thumbs pointing backward",
          "Pull the center of the rope directly toward your forehead",
          "Separate the rope ends as they reach your ears"
        ],
        avoidKeys: [
          "Do not pull down toward your chest (pull up toward forehead)",
          "Do not use heavy weight—focus entirely on feeling the back of your shoulders"
        ],
        defaultSets: [
          { setNumber: 1, targetReps: "15 reps", completed: false },
          { setNumber: 2, targetReps: "15 reps", completed: false },
          { setNumber: 3, targetReps: "15 reps", completed: false }
        ]
      },
      {
        id: "sun-5",
        name: "Dumbbell Farmer's Carries",
        equipment: "2 Moderate Dumbbells (14 - 18 kg each)",
        category: "strength",
        targetSets: 3,
        targetReps: "40 paces (~50 seconds walk)",
        tempo: "Slow, tall walk",
        restSeconds: 90,
        rpe: "7 / 10",
        quickWhy: "Grip strength is the #1 physical indicator of long-term health and vitality in men over 50.",
        scienceCue: "Clinically proven to strengthen full-body posture, core stability, and cardiovascular endurance in one simple exercise.",
        executiveNote: "Pick a clear open lane on the Fitness Time+ floor.",
        visualKey: "farmer-walk",
        formKeys: [
          "Stand as tall as possible with your chest proud",
          "Squeeze the dumbbell handles firmly with your whole hand",
          "Walk with slow, controlled, steady steps without swaying"
        ],
        avoidKeys: [
          "Do not let your shoulders slump or hunch forward",
          "Do not look down at your feet—keep your eyes forward"
        ],
        defaultSets: [
          { setNumber: 1, targetReps: "40 paces", completed: false },
          { setNumber: 2, targetReps: "40 paces", completed: false },
          { setNumber: 3, targetReps: "40 paces", completed: false }
        ]
      },
      {
        id: "sun-6",
        name: "Incline Treadmill Zone 2 Walk",
        equipment: "Technogym Incline Treadmill",
        category: "cardio",
        targetSets: 1,
        targetReps: "12 minutes",
        tempo: "Incline 8%, Speed 3.8 - 4.2 km/h",
        restSeconds: 0,
        rpe: "5 / 10 (Easy, conversational)",
        quickWhy: "Burns visceral fat and improves cardiovascular fitness with zero impact on knees and ankles.",
        scienceCue: "Zone 2 aerobic exercise builds cellular energy without elevating stress hormones or causing soreness.",
        executiveNote: "Breathe only through your nose to ensure you stay in the optimal recovery zone.",
        visualKey: "incline-treadmill",
        formKeys: [
          "Set the incline to 8% and speed around 4.0 km/h",
          "Maintain an upright posture—do not lean heavily on the handrails",
          "Keep breathing smoothly through your nose"
        ],
        avoidKeys: [
          "Do not jog or run (walking at an incline protects cartilage)",
          "Do not walk so fast that you have to gasp through your mouth"
        ],
        defaultSets: [
          { setNumber: 1, targetReps: "12 min walk", completed: false }
        ]
      }
    ]
  },
  {
    day: "Monday",
    shortDay: "Mon",
    dayType: "workday",
    title: "Lower Body Joint Strength & Spine Relief",
    subtitle: "Builds strong leg muscles and protects knee cartilage with zero heavy weight on your spine.",
    estimatedMinutes: 40,
    focus: "Legs, Knees & Core Stability",
    intensity: "Moderate",
    cardioMinutes: 8,
    recovery: {
      title: "Hot Jacuzzi Hydrotherapy Soak",
      durationMinutes: 10,
      facility: "Fitness Time+ Hydro Jacuzzi • Jeddah",
      temperature: "38°C - 40°C",
      procedure: [
        "Submerge into the warm jacuzzi with water jets targeting your lower back.",
        "Take 3 slow deep breaths every minute.",
        "Finish with a quick 60-second cool water rinse on your legs."
      ],
      scienceBenefit: "Relieves lumbar spine compression and releases tight hip flexors from long office sitting."
    },
    warmup: {
      title: "Knee Cartilage Lubrication & Hip Mobility Protocol",
      durationMinutes: 6,
      executiveRationale: "CRITICAL AT AGE 60 & 110KG: Knee cartilage has no direct blood supply—it lubricates solely through gentle non-impact motion. Never sit at the Leg Press cold. Cycling for 4 minutes distributes protective synovial fluid across knee cartilage before supporting heavy weight.",
      steps: [
        {
          name: "Non-Impact Knee Synovial Flush",
          durationOrReps: "4 Minutes",
          instructions: "Pedal smoothly on the Technogym Recline Bike at Level 3 (65-75 RPM). The back-supported seat takes all 110kg off your spine while circular pedaling bathes knee cartilage in joint fluid.",
          equipment: "Technogym Recline Bike",
          jointFocus: "Knees & Patellofemoral Cartilage"
        },
        {
          name: "Standing Hip Swings & Ankle Mobilization",
          durationOrReps: "10 Swings per leg",
          instructions: "Hold a gym pillar or machine frame for balance. Swing your leg gently forward and back 10 times, then side-to-side 10 times. Rotate each ankle 10 circles.",
          jointFocus: "Hips & Ankle Dorsiflexion"
        },
        {
          name: "Bench Sit-to-Stand (Bodyweight Warm-up)",
          durationOrReps: "8 Slow Reps",
          instructions: "Sit down on a gym bench with feet flat, stand up smoothly driving through your heels, and sit down slowly over 3 seconds. Pre-activates glutes without external load.",
          equipment: "Gym Bench",
          jointFocus: "Glutes & Knee Tracking"
        },
        {
          name: "Leg Press Calibration Feeler Set",
          durationOrReps: "1 Set of 12 Empty / Light Reps",
          instructions: "Lie back on the 45° Leg Press with ZERO extra plates (or lowest machine pin). Place feet shoulder-width, toes turned 15° out. Do 12 slow reps checking that knees track over mid-toes without pinching.",
          equipment: "Technogym Leg Press",
          jointFocus: "Knee Alignment & Range Check"
        }
      ]
    },
    exercises: [
      {
        id: "mon-1",
        name: "45° Incline Leg Press Machine",
        equipment: "Technogym Leg Press",
        category: "strength",
        targetSets: 3,
        targetReps: "10 reps",
        tempo: "3s down, 1s press",
        restSeconds: 90,
        rpe: "7 / 10",
        quickWhy: "Builds leg power for walking, stairs, and longevity without placing 100kg of pressure onto your lower back.",
        scienceCue: "Safely develops quadriceps and glutes while keeping your spine securely supported against the backrest.",
        executiveNote: "Set feet shoulder-width apart in the center of the footplate.",
        visualKey: "leg-press",
        formKeys: [
          "Keep your lower back pressed firmly against the seat at all times",
          "Lower the sled smoothly until your knees bend to about 90 degrees",
          "Push through your whole foot and heels"
        ],
        avoidKeys: [
          "Never lock your knees out straight at the top (keep a soft bend)",
          "Do not let your knees cave inwards toward each other"
        ],
        defaultSets: [
          { setNumber: 1, targetReps: "10 reps (warmup)", completed: false },
          { setNumber: 2, targetReps: "10 reps", completed: false },
          { setNumber: 3, targetReps: "10 reps", completed: false }
        ]
      },
      {
        id: "mon-2",
        name: "Seated Hamstring Leg Curl",
        equipment: "Technogym Seated Leg Curl",
        category: "strength",
        targetSets: 3,
        targetReps: "10 - 12 reps",
        tempo: "2s down, 2s return",
        restSeconds: 75,
        rpe: "7 / 10",
        quickWhy: "Strengthens the back of your thighs to stabilize and protect your knees from wear and tear.",
        scienceCue: "Strong hamstrings balance out the knee joint and prevent cartilage degradation.",
        executiveNote: "Adjust the leg pad so it rests comfortably just behind your ankles.",
        visualKey: "leg-curl",
        formKeys: [
          "Anchor the thigh restraint pad comfortably down over your quads",
          "Curl your heels down and back under your seat smoothly",
          "Control the weight as it rises back up"
        ],
        avoidKeys: [
          "Do not allow the weights to slam down between repetitions",
          "Do not arch your lower back off the seat"
        ],
        defaultSets: [
          { setNumber: 1, targetReps: "12 reps", completed: false },
          { setNumber: 2, targetReps: "10 reps", completed: false },
          { setNumber: 3, targetReps: "10 reps", completed: false }
        ]
      },
      {
        id: "mon-3",
        name: "Standing or Seated Calf Raises",
        equipment: "Technogym Calf Machine",
        category: "strength",
        targetSets: 3,
        targetReps: "12 - 15 reps",
        tempo: "2s stretch, 1s raise up",
        restSeconds: 60,
        rpe: "7 / 10",
        quickWhy: "Calves pump blood from your legs back up to your heart, reducing blood pressure and ankle stiffness.",
        scienceCue: "The soleus calf muscle acts as the circulatory 'second heart' for adults who sit for long executive meetings.",
        executiveNote: "Focus on getting a deep stretch at the bottom.",
        visualKey: "calf-raise",
        formKeys: [
          "Place balls of feet securely on the platform edge",
          "Press all the way up onto your toes for a full 1-second squeeze",
          "Lower heels down below the step for a comfortable stretch"
        ],
        avoidKeys: [
          "Do not bounce quickly on your ankles",
          "Do not bend your knees during standing calf raises"
        ],
        defaultSets: [
          { setNumber: 1, targetReps: "15 reps", completed: false },
          { setNumber: 2, targetReps: "12 reps", completed: false },
          { setNumber: 3, targetReps: "12 reps", completed: false }
        ]
      },
      {
        id: "mon-4",
        name: "Cable Pallof Press (Core Stability)",
        equipment: "Cable Pulley with D-Handle",
        category: "strength",
        targetSets: 3,
        targetReps: "10 reps per side",
        tempo: "1s press, 2s hold, 1s return",
        restSeconds: 60,
        rpe: "6 - 7 / 10",
        quickWhy: "Bulletproofs your lower back by teaching your core to resist twisting and slouching.",
        scienceCue: "Replaces traditional sit-ups (which compress lumbar discs) with functional, safe core stabilization.",
        executiveNote: "Stand sideways to the cable machine with handle at chest height.",
        visualKey: "pallof-press",
        formKeys: [
          "Hold the handle with both hands at the center of your chest",
          "Press your hands straight out in front of you without twisting",
          "Hold arms straight for 2 seconds while resisting the pull of the cable"
        ],
        avoidKeys: [
          "Do not let the cable pull your torso toward the machine",
          "Do not hold your breath—keep breathing normally"
        ],
        defaultSets: [
          { setNumber: 1, targetReps: "10 reps / side", completed: false },
          { setNumber: 2, targetReps: "10 reps / side", completed: false },
          { setNumber: 3, targetReps: "10 reps / side", completed: false }
        ]
      },
      {
        id: "mon-5",
        name: "Assisted Dead Hang (Spine Decompression)",
        equipment: "Pull-up Bar (Feet resting lightly on step)",
        category: "mobility",
        targetSets: 3,
        targetReps: "30 - 45 seconds",
        tempo: "Passive relaxed breathing",
        restSeconds: 60,
        rpe: "5 / 10",
        quickWhy: "Lets gravity gently stretch and decompress the discs in your spine after a long day of executive work.",
        scienceCue: "Opens up space between the L4-L5 vertebrae and creates healthy room in shoulder joints.",
        executiveNote: "Keep your toes lightly touching the step below so you feel completely supported.",
        visualKey: "dead-hang",
        formKeys: [
          "Grip the bar slightly wider than your shoulders",
          "Let your body weight sink down naturally to gently stretch your torso",
          "Take slow, deep, relaxing breaths out through your mouth"
        ],
        avoidKeys: [
          "Do not swing back and forth",
          "Do not let go suddenly—step down gently onto the platform"
        ],
        defaultSets: [
          { setNumber: 1, targetReps: "30 seconds", completed: false },
          { setNumber: 2, targetReps: "35 seconds", completed: false },
          { setNumber: 3, targetReps: "40 seconds", completed: false }
        ]
      }
    ]
  },
  {
    day: "Tuesday",
    shortDay: "Tue",
    dayType: "workday",
    title: "Midweek Energy Boost & Hip Mobility",
    subtitle: "Zero fatigue session: Flushes out corporate tiredness, restores hip flexibility, and boosts metabolism.",
    estimatedMinutes: 35,
    focus: "Cardio Flush & Hip Mobility",
    intensity: "Low",
    cardioMinutes: 28,
    recovery: {
      title: "Eucalyptus Steam Bath & Airway Clear",
      durationMinutes: 12,
      facility: "Fitness Time+ Steam Room • Jeddah",
      temperature: "45°C (100% Humidity)",
      procedure: [
        "Take a quick warm shower.",
        "Sit in the steam room for 10-12 minutes breathing slowly through your nose.",
        "Splash cool water on your face and drink 400ml water."
      ],
      scienceBenefit: "Hydrates your respiratory system after air-conditioned offices and triggers deep nighttime sleep."
    },
    warmup: {
      title: "Spinal Decompression & Aerobic Ramp Protocol",
      durationMinutes: 5,
      executiveRationale: "Prepares your vascular system and lumbar spine for 30 minutes of steady-state aerobic conditioning without sudden spikes in blood pressure.",
      steps: [
        {
          name: "Treadmill Low-Speed Acclimatization Walk",
          durationOrReps: "3 Minutes",
          instructions: "Walk at a comfortable 2.8 - 3.2 km/h on a 0% incline. Let arms swing naturally and breathe rhythmically through your nose.",
          equipment: "Technogym Treadmill",
          jointFocus: "Cardiovascular & Ankle Flexibility"
        },
        {
          name: "Standing Pelvic Tilts & Cat-Cow Stretch",
          durationOrReps: "10 Slow Breaths",
          instructions: "Rest hands on knees. Arch back slightly while inhaling, then round back gently while exhaling. Decompresses lumbar vertebrae.",
          jointFocus: "Lumbar Spine & Core"
        },
        {
          name: "Deep Nasal Breathing Calibration",
          durationOrReps: "1 Minute",
          instructions: "Take 4 slow breaths in through the nose (4 seconds) and out through the mouth (6 seconds) to establish heart rate control before Zone 2.",
          jointFocus: "Autonomic Nervous System"
        }
      ]
    },
    exercises: [
      {
        id: "tue-1",
        name: "Low-Impact Zone 2 Cardio Flush",
        equipment: "Incline Treadmill or Stationary Bike",
        category: "cardio",
        targetSets: 1,
        targetReps: "28 minutes",
        tempo: "Steady pace (Heart Rate 100 - 112 bpm)",
        restSeconds: 0,
        rpe: "5 / 10 (Comfortable nasal breathing)",
        quickWhy: "Builds deep cellular energy and burns fat without making your body sore or raising stress.",
        scienceCue: "Peter Attia's cornerstone protocol for cardiovascular longevity and metabolic health.",
        executiveNote: "Listen to an audiobook, phone briefing, or podcast while walking.",
        visualKey: "incline-treadmill",
        formKeys: [
          "Maintain a steady, smooth pace for 28 minutes",
          "Breathe easily through your nose",
          "Keep your shoulders relaxed and down"
        ],
        avoidKeys: [
          "Do not push into a breathless sprint (this is an energy-restoring walk)",
          "Do not slouch forward"
        ],
        defaultSets: [
          { setNumber: 1, targetReps: "28 minutes", completed: false }
        ]
      },
      {
        id: "tue-2",
        name: "Hip Flexor & Pelvic Stretch",
        equipment: "Exercise Mat",
        category: "mobility",
        targetSets: 2,
        targetReps: "45 seconds per side",
        tempo: "Gentle stretch with calm breathing",
        restSeconds: 30,
        rpe: "4 / 10",
        quickWhy: "Releases tight hips caused by sitting in executive chairs and directly takes pressure off your lower back.",
        scienceCue: "Lengthens the psoas muscle to restore natural pelvic alignment.",
        executiveNote: "Place a folded towel under your knee for comfort.",
        visualKey: "foam-roll",
        formKeys: [
          "Kneel on one knee with your other foot flat on the floor in front",
          "Gently tuck your tailbone and shift hips slightly forward until you feel a gentle stretch",
          "Breathe deeply and hold for 45 seconds"
        ],
        avoidKeys: [
          "Do not arch your lower back aggressively",
          "Do not force a painful stretch"
        ],
        defaultSets: [
          { setNumber: 1, targetReps: "45s each side", completed: false },
          { setNumber: 2, targetReps: "45s each side", completed: false }
        ]
      }
    ]
  },
  {
    day: "Wednesday",
    shortDay: "Wed",
    dayType: "workday",
    title: "Upper Body Strength & Arm Vitality",
    subtitle: "Builds functional pressing and rowing power, healthy elbows, and unbreakable core stability.",
    estimatedMinutes: 42,
    focus: "Functional Strength & Core",
    intensity: "Moderate",
    cardioMinutes: 10,
    recovery: {
      title: "Dry Finnish Sauna + Cool Rinse",
      durationMinutes: 15,
      facility: "Fitness Time+ Dry Sauna • Jeddah",
      temperature: "85°C",
      procedure: [
        "12-15 minutes relaxing in the dry sauna.",
        "Take a 90-second cool shower immediately after.",
        "Drink 500ml of cold water with electrolytes."
      ],
      scienceBenefit: "Accelerates muscle recovery, lowers arterial blood pressure, and releases growth factors."
    },
    warmup: {
      title: "Posterior Chain, Hamstring & Knee Prep Protocol",
      durationMinutes: 6,
      executiveRationale: "At age 60, hamstrings and glutes stiffen from sitting. Warming them up prevents strain on the lower back and ensures the knee joint stays stable during leg curls and leg presses.",
      steps: [
        {
          name: "Knee & Quad Synovial Warm-Up",
          durationOrReps: "4 Minutes",
          instructions: "Easy pedaling on the Technogym Upright or Recline Bike (Level 3-4, 70 RPM). Warms up quadriceps tendons and the patellar ligament.",
          equipment: "Technogym Bike",
          jointFocus: "Knees & Patellar Tendon"
        },
        {
          name: "Standing Hip Hinges (Good Mornings with Hands on Hips)",
          durationOrReps: "10 Slow Reps",
          instructions: "Stand tall with hands on hips, soft bend in knees. Push hips back until feeling a gentle stretch in hamstrings, then stand upright by squeezing glutes.",
          jointFocus: "Hamstrings & Lower Back"
        },
        {
          name: "Seated Leg Curl Calibration Feeler Set",
          durationOrReps: "1 Set of 12 Light Reps",
          instructions: "Sit on Leg Curl machine. Adjust pad so it rests on lower calves. Use lightest weight pin and perform 12 smooth reps to warm the knee flexors.",
          equipment: "Technogym Seated Leg Curl",
          jointFocus: "Hamstrings & Knee Flexion"
        }
      ]
    },
    exercises: [
      {
        id: "wed-1",
        name: "Incline Dumbbell Press (30° Angle)",
        equipment: "Adjustable Bench + Dumbbells (12 - 16 kg)",
        category: "strength",
        targetSets: 3,
        targetReps: "8 - 10 reps",
        tempo: "3s lower, 1s press",
        restSeconds: 90,
        rpe: "7 / 10",
        quickWhy: "Strengthens upper chest and shoulders while allowing each arm to move freely and comfortably.",
        scienceCue: "The slight incline and neutral wrist angle removes joint pinch from your shoulders.",
        executiveNote: "Set bench to the first or second notch up from flat.",
        visualKey: "incline-dumbbell",
        formKeys: [
          "Hold dumbbells with palms turned slightly toward each other",
          "Lower weights slowly with elbows tucked at 45 degrees",
          "Press weights up smoothly without banging them together"
        ],
        avoidKeys: [
          "Do not flare your elbows straight out to the sides",
          "Do not drop the weights fast—control the 3-second descent"
        ],
        defaultSets: [
          { setNumber: 1, targetReps: "10 reps", completed: false },
          { setNumber: 2, targetReps: "8-10 reps", completed: false },
          { setNumber: 3, targetReps: "8-10 reps", completed: false }
        ]
      },
      {
        id: "wed-2",
        name: "Cable Triceps Rope Pushdown",
        equipment: "Cable Station with Rope",
        category: "strength",
        targetSets: 3,
        targetReps: "12 reps",
        tempo: "1s push, 2s return",
        restSeconds: 60,
        rpe: "7 / 10",
        quickWhy: "Strengthens the back of your arms and keeps your elbow joints pain-free and resilient.",
        scienceCue: "Strengthens tricep tendons to safeguard against elbow tendonitis.",
        executiveNote: "Keep your upper arms pinned right against the sides of your ribs.",
        visualKey: "triceps-pushdown",
        formKeys: [
          "Keep your upper arms completely still beside your body",
          "Push the rope straight down until your arms are fully extended",
          "Spread the rope handles slightly apart at the very bottom"
        ],
        avoidKeys: [
          "Do not let your elbows flare forward and back",
          "Do not use body momentum to push down"
        ],
        defaultSets: [
          { setNumber: 1, targetReps: "12 reps", completed: false },
          { setNumber: 2, targetReps: "12 reps", completed: false },
          { setNumber: 3, targetReps: "12 reps", completed: false }
        ]
      },
      {
        id: "wed-3",
        name: "Single-Arm Suitcase Carry",
        equipment: "One Moderate Dumbbell (14 - 18 kg)",
        category: "strength",
        targetSets: 3,
        targetReps: "30 paces per side",
        tempo: "Slow, upright walk",
        restSeconds: 75,
        rpe: "7 / 10",
        quickWhy: "Carrying a weight on one side forces your deep core muscles to stabilize your spine against leaning.",
        scienceCue: "Dr. Peter Attia's top functional drill for protecting against sudden back twists and slips.",
        executiveNote: "Hold one dumbbell in your right hand, walk 30 paces, then switch to left hand.",
        visualKey: "suitcase-carry",
        formKeys: [
          "Stand completely vertical—do not tilt toward or away from the dumbbell",
          "Lock your shoulders level and look straight ahead",
          "Take calm, steady steps"
        ],
        avoidKeys: [
          "Do not lean your torso to the side to compensate for the weight",
          "Do not rush your steps"
        ],
        defaultSets: [
          { setNumber: 1, targetReps: "30 paces / side", completed: false },
          { setNumber: 2, targetReps: "30 paces / side", completed: false },
          { setNumber: 3, targetReps: "30 paces / side", completed: false }
        ]
      }
    ]
  },
  {
    day: "Thursday",
    shortDay: "Thu",
    dayType: "workday",
    title: "Workweek Stress Discharge & Jacuzzi Reset",
    subtitle: "Clears away the 5-day corporate tension, leaving Saudi Technic feeling energized for the weekend.",
    estimatedMinutes: 38,
    focus: "Metabolic Flush & Stress Discharge",
    intensity: "Low",
    cardioMinutes: 22,
    recovery: {
      title: "Weekend Kickoff Jacuzzi & Lounge Reset",
      durationMinutes: 15,
      facility: "Fitness Time+ Hot Jacuzzi • Jeddah",
      temperature: "39°C",
      procedure: [
        "10 minutes in the hot jacuzzi with water jets relaxing your upper back and shoulders.",
        "Take a refreshing shower and put on comfortable clothes.",
        "Sit for 5 minutes in the quiet lounge to officially transition from work into weekend mode."
      ],
      scienceBenefit: "Lowers cortisol and adrenaline to guarantee a deep, restorative night of sleep heading into Friday."
    },
    warmup: {
      title: "Upper Back, Scapular & Lat Warm-Up Sequence",
      durationMinutes: 5,
      executiveRationale: "Prepares your middle back and grip tendons before heavy pulling. Prevents straining the upper trapezius or pinching the biceps tendon during rows and pulldowns.",
      steps: [
        {
          name: "Upper Body Cardio Elevation",
          durationOrReps: "3 Minutes",
          instructions: "Gentle brisk walk on 3% incline (3.0 km/h) or light rowing machine strokes (Level 2). Brings blood to your latissimus dorsi and rhomboids.",
          equipment: "Technogym Treadmill or Rower",
          jointFocus: "Cardio & Whole Body Warmth"
        },
        {
          name: "Scapular Squeeze & Shoulder Blade Retractions",
          durationOrReps: "12 Reps",
          instructions: "Hold arms out in front, squeeze shoulder blades back together for 2 seconds, then relax. Wakes up the postural muscles that keep shoulders back.",
          jointFocus: "Scapular Stabilizers & Rhomboids"
        },
        {
          name: "Pillar Lat Stretch",
          durationOrReps: "20 Seconds per side",
          instructions: "Hold onto a gym pole or machine upright. Lean back and let your arm gently elongate to stretch the side of your back.",
          jointFocus: "Latissimus Dorsi & Shoulder"
        },
        {
          name: "Cable Seated Row Feeler Set",
          durationOrReps: "1 Set of 12 Light Reps",
          instructions: "Set the weight to just 15-20kg. Focus on pulling handles to your belly button while sitting tall with chest out.",
          equipment: "Technogym Seated Cable Row",
          jointFocus: "Row Mechanics Calibration"
        }
      ]
    },
    exercises: [
      {
        id: "thu-1",
        name: "Stationary Bike or Elliptical Flush",
        equipment: "Technogym Excite Bike or Synchro Elliptical",
        category: "cardio",
        targetSets: 1,
        targetReps: "22 minutes",
        tempo: "Smooth conversational cadence",
        restSeconds: 0,
        rpe: "5 / 10",
        quickWhy: "Gently spins out leg stiffness and clears mental stress with zero joint impact.",
        scienceCue: "Smooth circular cadence circulates synovial fluid inside your knee and hip joints.",
        executiveNote: "Keep resistance comfortable and maintain steady nasal breathing.",
        visualKey: "incline-treadmill",
        formKeys: [
          "Adjust bike seat height so your leg has a slight knee bend at the bottom pedal",
          "Maintain a steady rhythm around 70-80 RPM",
          "Breathe easily through your nose"
        ],
        avoidKeys: [
          "Do not set the resistance so high that your knees ache",
          "Do not hunch over the handlebars"
        ],
        defaultSets: [
          { setNumber: 1, targetReps: "22 minutes", completed: false }
        ]
      },
      {
        id: "thu-2",
        name: "Full-Body Spinal Decompression Hang",
        equipment: "Pull-up Bar (Feet on floor)",
        category: "mobility",
        targetSets: 3,
        targetReps: "35 seconds",
        tempo: "Deep relaxing exhales",
        restSeconds: 45,
        rpe: "4 / 10",
        quickWhy: "Instantly elongates your spine after 5 days of executive sitting, preparing you for the jacuzzi.",
        scienceCue: "Releases tension in the lower back and shoulder capsules.",
        executiveNote: "Step up to the bar and relax completely.",
        visualKey: "dead-hang",
        formKeys: [
          "Grip bar with both hands and let your body hang gently",
          "Keep feet lightly on the step to regulate the stretch",
          "Exhale fully with a long sigh"
        ],
        avoidKeys: [
          "Do not hold your breath",
          "Do not jump down roughly"
        ],
        defaultSets: [
          { setNumber: 1, targetReps: "35 seconds", completed: false },
          { setNumber: 2, targetReps: "35 seconds", completed: false },
          { setNumber: 3, targetReps: "35 seconds", completed: false }
        ]
      }
    ]
  },
  {
    day: "Friday",
    shortDay: "Fri",
    dayType: "weekend",
    title: "Friday Aquatic Longevity & Hydro-Recovery Circuit",
    subtitle: "Friday Saudi Weekend: Zero-gravity pool swimming followed by the full sauna and cold contrast circuit.",
    estimatedMinutes: 50,
    focus: "Heated Pool & Contrast Hydrotherapy",
    intensity: "Recovery",
    cardioMinutes: 25,
    recovery: {
      title: "The Master Huberman Contrast Protocol",
      durationMinutes: 25,
      facility: "Fitness Time+ Sauna, Cold Jacuzzi & Hot Jacuzzi • Jeddah",
      temperature: "Sauna: 85°C | Cold: 15°C | Hot: 39°C",
      procedure: [
        "Round 1: 15 minutes in Dry Finnish Sauna (deep cleansing sweat).",
        "Round 2: 2 minutes in Cold Jacuzzi or cool shower (invigorates circulation).",
        "Round 3: 5 minutes in Hot Jacuzzi (full muscle relaxation).",
        "Round 4: 5 minutes in relaxation lounge rehydrating with water and electrolytes."
      ],
      scienceBenefit: "Dr. Andrew Huberman's gold standard protocol: massive boost in endorphins, reduction in joint inflammation, and deep systemic recovery."
    },
    warmup: {
      title: "Gentle Ankle, Knee & Hip Opening Sequence",
      durationMinutes: 4,
      executiveRationale: "Prepares ankles, hips, and calves for an easy 30-minute recovery walk around Jeddah Corniche or neighborhood gardens.",
      steps: [
        {
          name: "Ankle Rotations & Calf Pumps",
          durationOrReps: "10 Circles & 10 Pumps each side",
          instructions: "Rotate each foot in circles to loosen ankles, then do 10 gentle standing calf raises holding onto a wall.",
          jointFocus: "Ankles & Achilles Tendon"
        },
        {
          name: "Standing Quad & Hip Flexor Stretch",
          durationOrReps: "20 Seconds each side",
          instructions: "Hold a wall or chair for balance. Gently lift heel toward glute or step one foot back into a gentle lunge stretch.",
          jointFocus: "Hip Flexors & Quads"
        },
        {
          name: "Pre-Walk Hydration Check",
          durationOrReps: "1 Glass of Water",
          instructions: "Drink 300ml of room-temperature water before heading out into Jeddah afternoon sunshine.",
          jointFocus: "Cellular Hydration"
        }
      ]
    },
    exercises: [
      {
        id: "fri-1",
        name: "25m Heated Pool Swim / Water Walk",
        equipment: "Fitness Time+ Heated Indoor Pool",
        category: "cardio",
        targetSets: 1,
        targetReps: "20 - 25 minutes",
        tempo: "Gentle breaststroke or deep-water walking laps",
        restSeconds: 0,
        rpe: "5 / 10 (Zero gravity)",
        quickWhy: "Water takes 90% of your body weight off your knees and spine, giving you an unmatched full-body workout with zero joint wear.",
        scienceCue: "Hydrostatic water pressure promotes blood return and naturally decompresses every disc in your spine.",
        executiveNote: "The ultimate luxury of Friday morning at Fitness Time Plus Jeddah. Peaceful, calm, and deeply restoring.",
        visualKey: "pool-swim",
        formKeys: [
          "Swim gentle breaststroke laps or walk with high knees across the shallow lane",
          "Feel the buoyancy of the water supporting your joints",
          "Breathe rhythmically and smoothly"
        ],
        avoidKeys: [
          "Do not race or push for high speed",
          "Do not hold your breath underwater"
        ],
        defaultSets: [
          { setNumber: 1, targetReps: "25 min swim", completed: false }
        ]
      },
      {
        id: "fri-2",
        name: "Pool Wall Hip & Shoulder Mobilization",
        equipment: "Pool Edge",
        category: "mobility",
        targetSets: 2,
        targetReps: "2 minutes in warm water",
        tempo: "Gentle torso twists & leg swings",
        restSeconds: 30,
        rpe: "3 / 10",
        quickWhy: "The warm water relaxes tight connective tissue so your hips and shoulders move freely without any stiffness.",
        scienceCue: "Warm water vasodilation prepares your body perfectly before you enter the dry sauna.",
        executiveNote: "Hold onto the pool gutter or rail for balance.",
        visualKey: "pool-stretch",
        formKeys: [
          "Hold the pool edge with hands while floating your legs behind you gently",
          "Gently swing one leg forward and back in the water to open the hip",
          "Feel the warm water relaxing your lower back"
        ],
        avoidKeys: [
          "Do not kick violently against the water",
          "Avoid sharp or jerky movements"
        ],
        defaultSets: [
          { setNumber: 1, targetReps: "2 min mobility", completed: false }
        ]
      }
    ]
  },
  {
    day: "Saturday",
    shortDay: "Sat",
    dayType: "weekend",
    title: "Saturday Sunlight, Walking & Family Recharge",
    subtitle: "Saturday Saudi Weekend: Outdoor walk, natural morning sunlight to reset your sleep clock, and quality family time.",
    estimatedMinutes: 30,
    focus: "Outdoor Stroll & Mental Reset",
    intensity: "Recovery",
    cardioMinutes: 30,
    recovery: {
      title: "Circadian Sunlight & Evening Wind-Down",
      durationMinutes: 10,
      facility: "Jeddah Corniche / Waterfront or Home",
      procedure: [
        "Get 15 minutes of natural morning sunlight into your eyes (without sunglasses) within an hour of waking.",
        "Unplug from corporate emails by 7:30 PM.",
        "Take a warm evening shower 90 minutes before bed to guarantee deep sleep for Sunday kickoff."
      ],
      scienceBenefit: "Sets your internal biological clock so you wake up on Sunday with natural energy and focus for the workweek."
    },
    warmup: {
      title: "Spinal Decompression & Thermal Pre-Activation",
      durationMinutes: 4,
      executiveRationale: "Relaxes the central nervous system and primes cardiovascular dilation before entering the hot sauna and cold plunge circuit at Fitness Time+.",
      steps: [
        {
          name: "Gentle Mat Cat-Cow & Child's Pose",
          durationOrReps: "2 Minutes",
          instructions: "On an exercise mat, move gently between arching and rounding spine. Shift hips back toward heels into Child's Pose to gently lengthen the lower back.",
          jointFocus: "Spine & Sacroiliac Joint"
        },
        {
          name: "Shoulder & Chest Sweep",
          durationOrReps: "1 Minute",
          instructions: "Gentle standing arm swings across the chest to open blood vessels in the upper body.",
          jointFocus: "Pectorals & Rotator Cuff"
        },
        {
          name: "Electrolyte Pre-Load",
          durationOrReps: "500ml Water + Electrolytes",
          instructions: "Hydrate well before the thermal circuit to maintain blood volume and prevent lightheadedness in the sauna.",
          jointFocus: "Circulatory & Blood Volume"
        }
      ]
    },
    exercises: [
      {
        id: "sat-1",
        name: "Restorative Outdoor Walk (Jeddah Waterfront)",
        equipment: "Comfortable Walking Shoes",
        category: "cardio",
        targetSets: 1,
        targetReps: "30 - 40 minutes easy walk",
        tempo: "Pleasant conversational pace",
        restSeconds: 0,
        rpe: "3 - 4 / 10",
        scienceCue: "Moving your eyes across an open outdoor horizon naturally quiets the brain's stress centers and recharges your mental focus.",
        quickWhy: "Enjoy the sea breeze with family, recharge your brain, and leave the corporate work behind.",
        executiveNote: "Enjoy Jeddah's beautiful coastline or a local park.",
        visualKey: "incline-treadmill",
        formKeys: [
          "Walk at an easy, enjoyable pace",
          "Keep your head up and take in the open views",
          "Enjoy relaxed conversation with family"
        ],
        avoidKeys: [
          "Do not look down at your work phone while walking",
          "Do not rush"
        ],
        defaultSets: [
          { setNumber: 1, targetReps: "35 min walk", completed: false }
        ]
      }
    ]
  }
];
