const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const ROAD_SAFETY_30_MCQS = [
  {
    questionText: "According to the Motor Vehicles Act, what standard certification mark must a two-wheeler helmet bear in India?",
    optionA: "ISO 9001",
    optionB: "ISI / BIS Mark (IS 4151)",
    optionC: "DOT / ECE only without Indian standards",
    optionD: "CE Marking only",
    correctOption: "B",
    category: "Helmet Compliance & Chin-strap",
    explanation: "Under the Motor Vehicles Amendment Act, all motorcycle helmets worn in India must be certified by the Bureau of Indian Standards (BIS) bearing the ISI mark (IS 4151)."
  },
  {
    questionText: "What is the proper chin-strap tightness test when wearing a protective motorcycle helmet?",
    optionA: "It should allow your entire hand to slide freely between chin and strap",
    optionB: "Only one to two fingers should fit snugly between your chin and the fastened strap",
    optionC: "The strap should be kept unbuckled for instant emergency removal",
    optionD: "The strap should be strapped behind the neck rather than under the chin",
    correctOption: "B",
    category: "Helmet Compliance & Chin-strap",
    explanation: "A snug two-finger clearance ensures the helmet will not fly off during impact or rotational slide."
  },
  {
    questionText: "Why is a full-face helmet statistically superior to an open-face (half-shell) helmet?",
    optionA: "It is lighter in overall weight",
    optionB: "Over 34% of crash impact forces target the chin and facial zone, which open-face helmets leave exposed",
    optionC: "It is legally mandated only during rain",
    optionD: "It eliminates the need for mirror checks",
    correctOption: "B",
    category: "Helmet Compliance & Chin-strap",
    explanation: "Accident impact studies demonstrate that the chin bar protects the lower jaw and face where more than a third of crash impacts occur."
  },
  {
    questionText: "When an airbag deploys in a motor vehicle, at what approximate speed does it expand?",
    optionA: "50 km/h",
    optionB: "120 km/h",
    optionC: "Over 250 - 300 km/h in under 30 milliseconds",
    optionD: "Airbags inflate slowly over 5 seconds",
    correctOption: "C",
    category: "Seatbelt Discipline & Airbag Safety",
    explanation: "Airbags deploy pyrotechnically at speeds of 250-320 km/h. If passengers are not restrained by a seatbelt, direct collision with the expanding bag can cause fatal head or cervical trauma."
  },
  {
    questionText: "Under the 'Three-Point Seatbelt Discipline', where should the lap belt portion rest on the human body?",
    optionA: "Directly across the soft abdomen and stomach",
    optionB: "Low across the strong pelvic bones and hips",
    optionC: "Loosely under one thigh",
    optionD: "Around the ribcage",
    correctOption: "B",
    category: "Seatbelt Discipline & Airbag Safety",
    explanation: "The lap belt must rest snugly across the rigid pelvic bones to transfer crash forces safely to the skeletal structure."
  },
  {
    questionText: "What is the primary danger of placing an infant or toddler in a front passenger seat with an active airbag?",
    optionA: "The child may accidentally honk the horn",
    optionB: "The sudden airbag blast can strike the child restraint system with lethal force",
    optionC: "The child will block the side rearview mirror",
    optionD: "Airbag gas emits toxic odor harmful to children",
    correctOption: "B",
    category: "Seatbelt Discipline & Airbag Safety",
    explanation: "Child car seats placed in front of active airbags can be violently struck during deployment, which can cause severe or fatal injuries."
  },
  {
    questionText: "When approaching a steady Amber (Yellow) traffic signal, what is your legal and safe obligation?",
    optionA: "Accelerate rapidly to beat the red light",
    optionB: "Stop before the stop line, unless you are too close to stop safely without causing a rear-end collision",
    optionC: "Honk repeatedly and proceed without slowing down",
    optionD: "Turn off your engine immediately in the lane",
    correctOption: "B",
    category: "Speed Limit & Traffic Signals",
    explanation: "Amber indicates caution that red is imminent; drivers must safely bring their vehicle to a stop unless doing so suddenly would trigger a rear collision."
  },
  {
    questionText: "What is the standard prescribed maximum speed limit in designated School Zones across most Indian cities?",
    optionA: "20 - 25 km/h",
    optionB: "50 km/h",
    optionC: "65 km/h",
    optionD: "40 km/h with continuous horn",
    correctOption: "A",
    category: "Speed Limit & Traffic Signals",
    explanation: "School and hospital pedestrian safety zones impose strict 20-25 km/h speed restrictions to safeguard vulnerable children."
  },
  {
    questionText: "How does doubling your vehicle speed (e.g. from 40 km/h to 80 km/h) affect your braking distance?",
    optionA: "Braking distance doubles (2x)",
    optionB: "Braking distance triples (3x)",
    optionC: "Braking distance quadruples (4x) due to kinetic energy proportionality (v²)",
    optionD: "Braking distance remains identical if brakes are ABS",
    correctOption: "C",
    category: "Speed Limit & Traffic Signals",
    explanation: "Kinetic energy equals 1/2 mv². Doubling your speed quadruples the kinetic energy your brakes must dissipate, causing braking distance to increase fourfold."
  },
  {
    questionText: "What does a flashing red traffic signal signify at an intersection?",
    optionA: "The road is under construction; turn around",
    optionB: "Treat it like a 'Stop' sign: come to a complete stop, yield to cross-traffic, and proceed only when clear",
    optionC: "Maintain speed because other lanes have solid red",
    optionD: "Emergency vehicles only are permitted",
    correctOption: "B",
    category: "Speed Limit & Traffic Signals",
    explanation: "A flashing red signal mandates a complete halt at the stop line before proceeding when safe."
  },
  {
    questionText: "Using a mobile phone with a hands-free Bluetooth headset while riding or driving:",
    optionA: "Completely eliminates collision risks",
    optionB: "Is recommended by road safety engineers",
    optionC: "Still causes severe cognitive distraction and delays hazard reaction times by up to 40%",
    optionD: "Increases peripheral vision by heightening brain activity",
    correctOption: "C",
    category: "Distracted Driving & Anti-Mobile",
    explanation: "Cognitive distraction occurs in the brain during conversation regardless of whether hands touch the handset, creating 'inattentional blindness'."
  },
  {
    questionText: "At a highway speed of 60 km/h, looking down at a mobile text message for just 3 seconds means traveling blind for approximately:",
    optionA: "10 meters",
    optionB: "50 meters (half the length of a football pitch)",
    optionC: "5 meters",
    optionD: "100 meters",
    correctOption: "B",
    category: "Distracted Driving & Anti-Mobile",
    explanation: "At 60 km/h, a vehicle covers 16.6 meters every second. In 3 seconds of texting, the vehicle covers ~50 meters without driver observation."
  },
  {
    questionText: "What is 'rubbernecking' in the context of vehicular traffic safety?",
    optionA: "Checking blind spots using motorcycle mirrors",
    optionB: "Slowing down to stare at an accident on the opposite lane, causing secondary traffic crashes",
    optionC: "Driving with worn-out rubber tires",
    optionD: "Wearing an oversized helmet that strains the neck",
    correctOption: "B",
    category: "Distracted Driving & Anti-Mobile",
    explanation: "Rubbernecking refers to drivers looking away at side incidents, causing severe rear-end collisions and traffic jams."
  },
  {
    questionText: "When a pedestrian has stepped onto an unsignalized Zebra (Pedestrian) Crossing, who possesses legal Right-of-Way?",
    optionA: "The motor vehicle, because stopping disrupts traffic flow",
    optionB: "The pedestrian; drivers must yield and stop before the crossing line",
    optionC: "Whoever arrives at the midpoint first",
    optionD: "Two-wheelers only have priority over pedestrians",
    correctOption: "B",
    category: "Pedestrian Crossing & Zebra Lines",
    explanation: "Under Indian Motor Vehicles Rules and international conventions, pedestrians on zebra crossings have unequivocal right-of-way."
  },
  {
    questionText: "What is the recommended minimum following distance behind another vehicle in dry daylight conditions?",
    optionA: "1-second rule",
    optionB: "3-second rule (or 1 car length per 10 km/h)",
    optionC: "50 centimeters bumper-to-bumper",
    optionD: "10 seconds regardless of speed",
    correctOption: "B",
    category: "Pedestrian Crossing & Zebra Lines",
    explanation: "The 3-second rule gives sufficient perception and mechanical braking distance to prevent sudden rear-end collisions."
  },
  {
    questionText: "What is the legal Blood Alcohol Concentration (BAC) threshold for driving under Section 185 of the Motor Vehicles Act in India?",
    optionA: "0.08% (80 mg per 100 ml)",
    optionB: "Exceeding 30 mg per 100 ml of blood detected by breath analyzer",
    optionC: "100 mg per 100 ml of blood",
    optionD: "Any amount is legal if the driver can walk straight",
    correctOption: "B",
    category: "Sober Driving & Anti-DUI",
    explanation: "Section 185 penalizes drivers with Blood Alcohol Content exceeding 30 mg per 100 ml with imprisonment and hefty fines."
  },
  {
    questionText: "How does alcohol consumption primarily impair a driver's ability?",
    optionA: "It improves confidence and night vision",
    optionB: "It impairs depth perception, slows neurological reaction time, and produces tunnel vision",
    optionC: "It only affects speech, not motor driving skills",
    optionD: "It cools down the vehicle cabin temperature",
    correctOption: "B",
    category: "Sober Driving & Anti-DUI",
    explanation: "Alcohol is a central nervous system depressant that degrades motor coordination, depth judgement, and peripheral reflexes."
  },
  {
    questionText: "What is the safest, most responsible action if you attend a social gathering and consume alcohol?",
    optionA: "Drive via dark back alleys to avoid police checks",
    optionB: "Appoint a designated sober driver, call a cab service, or use public transit",
    optionC: "Drink strong black coffee and immediately ride home",
    optionD: "Drive slowly at 10 km/h with hazard lights on",
    correctOption: "B",
    category: "Sober Driving & Anti-DUI",
    explanation: "Only designated sober drivers or rideshare services guarantee safe transit; coffee and cold showers do not eliminate bloodstream alcohol."
  },
  {
    questionText: "For a two-wheeler rider, what is the 'Dutch Reach' technique used by car drivers to protect cyclists and motorcyclists?",
    optionA: "Checking tyre pressure using a gauge",
    optionB: "Opening car doors with the far hand to force a shoulder check for passing two-wheelers",
    optionC: "Overtaking from the extreme left lane",
    optionD: "Shifting gears without using clutch",
    correctOption: "B",
    category: "Two-Wheeler Dynamics & Awareness",
    explanation: "The Dutch Reach prevents 'dooring' crashes by making motorists turn their torso and spot oncoming cyclists/motorcyclists."
  },
  {
    questionText: "When braking on a motorcycle or scooter without CBS/ABS on a dry road, how should braking effort be distributed?",
    optionA: "100% rear brake only to prevent flipping",
    optionB: "Approximately 70% front brake and 30% rear brake applied smoothly in tandem",
    optionC: "100% front brake aggressively clamped",
    optionD: "Foot on road with engine kill switch activated",
    correctOption: "B",
    category: "Two-Wheeler Dynamics & Awareness",
    explanation: "Weight transfers forward during deceleration, allowing the front tire to provide roughly 70% of total stopping traction."
  },
  {
    questionText: "What is 'hydroplaning' (or aquaplaning) on a rainy roadway?",
    optionA: "Cleaning the vehicle underbody using rainwater",
    optionB: "Tires losing contact with the road surface by riding on a film of standing water, causing complete loss of steering and braking",
    optionC: "A specialized water-cooling technique for high-speed engines",
    optionD: "Driving through a puddle to cool hot brake discs",
    correctOption: "B",
    category: "Two-Wheeler Dynamics & Awareness",
    explanation: "At speed, water cannot be evacuated fast enough by tyre grooves, creating a liquid wedge that lifts tyres off the pavement."
  },
  {
    questionText: "Why is wearing high-visibility reflective clothing or a reflective safety harness crucial for two-wheeler riders at dawn, dusk, and night?",
    optionA: "To comply with airport runway regulations",
    optionB: "It multiplies rider recognition distance for other motorists from 30 meters up to 150+ meters",
    optionC: "It keeps the rider warm in winter",
    optionD: "It prevents rain from penetrating the jacket",
    correctOption: "B",
    category: "Helmet Compliance & Chin-strap",
    explanation: "Reflective materials bounce headlight beams directly back to other motorists, giving drivers 5x more time to react."
  },
  {
    questionText: "What does an inverted triangular road sign indicate?",
    optionA: "Hospital ahead",
    optionB: "Give Way / Yield",
    optionC: "One-way entry prohibited",
    optionD: "No parking zone",
    correctOption: "B",
    category: "Speed Limit & Traffic Signals",
    explanation: "An equilateral triangle pointing downwards is the globally standardized regulatory sign for 'Give Way' (Yield)."
  },
  {
    questionText: "When is overtaking strictly prohibited under Indian traffic regulations?",
    optionA: "On narrow bridges, pedestrian crossings, sharp bends, and blind crests of hills",
    optionB: "On four-lane divided highways",
    optionC: "During daylight hours",
    optionD: "When the vehicle ahead is moving slower than 30 km/h",
    correctOption: "A",
    category: "Two-Wheeler Dynamics & Awareness",
    explanation: "Blind bends, hill crests, bridges, and zebra crossings eliminate sightlines and put oncoming vehicles and pedestrians at extreme peril."
  },
  {
    questionText: "What should you do immediately if you witness a road accident with injured persons?",
    optionA: "Record video for social media without rendering aid",
    optionB: "Flee the scene to avoid police interrogation",
    optionC: "Call emergency helpline 112 / 108, provide First Aid if trained, and protect victims without fear under the Good Samaritan Law",
    optionD: "Move the injured person roughly by pulling their limbs",
    correctOption: "C",
    category: "Pedestrian Crossing & Zebra Lines",
    explanation: "The Supreme Court of India's Good Samaritan guidelines protect citizens from police harassment and civil/criminal liability when assisting crash victims."
  },
  {
    questionText: "What is the purpose of rumble strips installed before sharp turns, toll plazas, and accident-prone intersections?",
    optionA: "To damage the suspension of overspeeding vehicles",
    optionB: "To transmit tactile vibrations and audible warnings to awaken inattentive or drowsy drivers to slow down",
    optionC: "To clean tyre treads from mud",
    optionD: "To drain rainwater from the highway median",
    correctOption: "B",
    category: "Speed Limit & Traffic Signals",
    explanation: "Rumble strips create vibration and acoustic rumbling inside the cabin, warning drivers of imminent hazardous sections."
  },
  {
    questionText: "What is the 'Golden Hour' in trauma management and emergency road accident response?",
    optionA: "The sunset period when road lights turn on",
    optionB: "The first 60 minutes following severe traumatic injury, where prompt medical care provides the highest probability of saving life",
    optionC: "The hour between 12 AM and 1 AM when roads are quiet",
    optionD: "The time allotted to inspect vehicle tyres before highway trips",
    correctOption: "B",
    category: "Sober Driving & Anti-DUI",
    explanation: "Medical intervention within the first 60 minutes dramatically reduces mortality from internal hemorrhaging and brain shock."
  },
  {
    questionText: "Under what condition is carrying more than one pillion rider on a two-wheeler legal in India?",
    optionA: "If all riders are school students carrying school bags",
    optionB: "If travelling less than 2 kilometers inside a residential colony",
    optionC: "Never: triple riding is strictly illegal and dangerous under Section 128 of the Motor Vehicles Act",
    optionD: "If the rider in the middle is under 15 years old",
    correctOption: "C",
    category: "Two-Wheeler Dynamics & Awareness",
    explanation: "Section 128 explicitly mandates that no driver of a two-wheeled motorcycle shall carry more than one person in addition to themselves."
  },
  {
    questionText: "Why is regular inspection of tyre tread depth and tyre pressure critical for two-wheeler stability?",
    optionA: "Low pressure improves fuel efficiency by 20%",
    optionB: "Worn tread drastically degrades water dispersion, while improper pressure causes wobble, rim damage, and sudden blowouts",
    optionC: "Tyre tread is purely decorative and has no mechanical function",
    optionD: "Overinflating tyres by 50% gives better grip on loose sand",
    correctOption: "B",
    category: "Two-Wheeler Dynamics & Awareness",
    explanation: "Tyre tread channels water away to prevent skidding; correct PSI ensures optimum contact patch and handling stability."
  },
  {
    questionText: "What is the primary motto and guiding objective of Mahal Welfare Services' 3F Road Safety Campaign?",
    optionA: "Fast, Furious & Fearless",
    optionB: "Focused, Fast & Fulfilling",
    optionC: "Focus on Discipline, Fight Against Negligence, Foster Safe Families",
    optionD: "Fleet, Fuel & Financial Savings",
    correctOption: "C",
    category: "3F Road Safety Core Principles",
    explanation: "Mahal Welfare Services' 3F Campaign stands for: Focus on Discipline, Fight Against Negligence, and Foster Safe Families through grassroots education and zero-fatality commitment."
  }
];

async function main() {
  console.log("🚀 Starting database seeding for Mahal Welfare Services 3F Platform...");

  // 1. Seed Super Admin
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin3F@2026";
  const passwordHash = await bcrypt.hash(adminPassword, 10);
  const admin = await prisma.admin.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@mahalwelfare.org" },
    update: { passwordHash },
    create: {
      name: "Super Admin (Mahal Welfare Services)",
      email: process.env.ADMIN_EMAIL || "admin@mahalwelfare.org",
      passwordHash,
    },
  });
  console.log(`✅ Super Admin created: ${admin.email}`);

  // 2. Seed Schools
  const schoolsData = [
    {
      schoolName: "St. Xavier's Senior Secondary School",
      schoolCode: "XAV-DEL-101",
      teacherName: "Prof. Rajesh Sharma",
      phone: "+91 98765 43210",
      email: "rajesh.sharma@stxaviers.edu.in",
    },
    {
      schoolName: "Delhi Public Global Academy",
      schoolCode: "DPG-MUM-204",
      teacherName: "Mrs. Sunita Deshmukh",
      phone: "+91 98123 45678",
      email: "sunita.d@dpglobal.ac.in",
    },
    {
      schoolName: "Kendriya Vidyalaya Command Sector",
      schoolCode: "KVC-BLR-305",
      teacherName: "Col. (Retd) Arvind Nair",
      phone: "+91 97456 78901",
      email: "arvind.nair@kvcommand.edu.in",
    },
  ];

  const schools = [];
  for (const s of schoolsData) {
    const school = await prisma.schoolCoordinator.upsert({
      where: { schoolCode: s.schoolCode },
      update: s,
      create: s,
    });
    schools.push(school);
  }
  console.log(`✅ Seeded ${schools.length} School Coordinators`);

  // 3. Seed Exam Slots
  const now = new Date();
  const videoEnd = new Date(now.getTime() + 10 * 60 * 1000); // 10 mins from now
  const examEnd = new Date(now.getTime() + 90 * 60 * 1000); // 90 mins from now

  const slotA = await prisma.examSlot.upsert({
    where: { id: "slot-morning-3f-batch-01" },
    update: {
      isActive: true,
      videoEndTime: videoEnd,
      examEndTime: examEnd,
    },
    create: {
      id: "slot-morning-3f-batch-01",
      slotName: "3F Youth Road Safety Certification - Primary Morning Batch",
      youtubeUrl: "https://www.youtube.com/embed/Z0o2Bw8U_50", // Road safety helmet & speed awareness video
      videoStartTime: new Date(now.getTime() - 20 * 60 * 1000),
      videoEndTime: videoEnd,
      examStartTime: videoEnd,
      examEndTime: examEnd,
      examDurationMin: 20,
      isActive: true,
    },
  });

  const slotB = await prisma.examSlot.upsert({
    where: { id: "slot-express-instant-exam" },
    update: {
      isActive: true,
      videoEndTime: new Date(now.getTime() - 1000), // Already ended so user can immediately take the exam
    },
    create: {
      id: "slot-express-instant-exam",
      slotName: "3F Fast-Track Digital Examination (Immediate Exam Access)",
      youtubeUrl: "https://www.youtube.com/embed/Z0o2Bw8U_50",
      videoStartTime: new Date(now.getTime() - 30 * 60 * 1000),
      videoEndTime: new Date(now.getTime() - 1000), // Finished
      examStartTime: new Date(now.getTime() - 500),
      examEndTime: new Date(now.getTime() + 120 * 60 * 1000),
      examDurationMin: 20,
      isActive: true,
    },
  });

  console.log(`✅ Seeded 2 Exam Slots (${slotA.slotName}, ${slotB.slotName})`);

  // 4. Seed 30 Questions
  let questionsCount = 0;
  for (const q of ROAD_SAFETY_30_MCQS) {
    const existing = await prisma.question.findFirst({
      where: { questionText: q.questionText },
    });
    if (!existing) {
      await prisma.question.create({ data: q });
      questionsCount++;
    }
  }
  console.log(`✅ Seeded ${questionsCount} 3F Road Safety MCQs (Total available: 30)`);

  // 5. Seed sample demo students & top leaderboard scores so initial experience is rich
  const sampleStudents = [
    {
      name: "Aarav Mehra",
      phone: "+91 98200 11223",
      address: "B-42 Civil Lines, North Delhi",
      email: "aarav.m@gmail.com",
      standard: "Class 11",
      section: "A",
      ridingExperience: "Regular Rider (Geared 150cc Motorcycle, 2 years, commutes to tuition daily)",
      schoolId: schools[0].id,
      slotId: slotA.id,
      sessionToken: "demo-aarav-mehra-token-001",
      score: 29,
      timeTakenSec: 480, // 8 mins
    },
    {
      name: "Pooja Subramanian",
      phone: "+91 97100 22334",
      address: "Flat 1204, Orchid Heights, Powai, Mumbai",
      email: "pooja.subra@yahoo.com",
      standard: "Class 12",
      section: "B",
      ridingExperience: "Learner (Scooterist / Activa 6G, holds learner permit, practicing defensive braking)",
      schoolId: schools[1].id,
      slotId: slotA.id,
      sessionToken: "demo-pooja-subra-token-002",
      score: 30,
      timeTakenSec: 512, // 8m 32s
    },
    {
      name: "Karanjit Singh",
      phone: "+91 99300 33445",
      address: "House 18, Defense Colony, Bangalore",
      email: "karan.singh@outlook.com",
      standard: "Class 11",
      section: "C",
      ridingExperience: "Regular Rider (Sports Bike, high awareness of ABS & certified riding gear)",
      schoolId: schools[2].id,
      slotId: slotA.id,
      sessionToken: "demo-karan-singh-token-003",
      score: 28,
      timeTakenSec: 420,
    },
    {
      name: "Ananya Deshpande",
      phone: "+91 98400 44556",
      address: "7th Cross, Malleshwaram, Bangalore",
      email: "ananya.d@gmail.com",
      standard: "Class 10",
      section: "A",
      ridingExperience: "None (Bicycle commuter, aspiring two-wheeler rider)",
      schoolId: schools[2].id,
      slotId: slotA.id,
      sessionToken: "demo-ananya-d-token-004",
      score: 27,
      timeTakenSec: 610,
    },
    {
      name: "Rohan Varma",
      phone: "+91 98111 55667",
      address: "D-9 Rohini Sector 14, Delhi",
      email: "rohan.varma@gmail.com",
      standard: "Class 12",
      section: "Science A",
      ridingExperience: "Regular Rider (Electric Scooter Ather 450X, 1.5 years)",
      schoolId: schools[0].id,
      slotId: slotA.id,
      sessionToken: "demo-rohan-varma-token-005",
      score: 30,
      timeTakenSec: 450, // Tie-break winner! 7m 30s
    },
  ];

  for (const s of sampleStudents) {
    const student = await prisma.student.upsert({
      where: { sessionToken: s.sessionToken },
      update: {},
      create: {
        name: s.name,
        phone: s.phone,
        address: s.address,
        email: s.email,
        standard: s.standard,
        section: s.section,
        ridingExperience: s.ridingExperience,
        schoolId: s.schoolId,
        slotId: s.slotId,
        sessionToken: s.sessionToken,
      },
    });

    const existingAttempt = await prisma.examAttempt.findFirst({
      where: { studentId: student.id, slotId: slotA.id },
    });

    if (!existingAttempt) {
      await prisma.examAttempt.create({
        data: {
          studentId: student.id,
          slotId: slotA.id,
          score: s.score,
          totalQuestions: 30,
          timeTakenSec: s.timeTakenSec,
        },
      });
    }
  }

  console.log(`✅ Seeded ${sampleStudents.length} demo students with Leaderboard attempts.`);
  console.log("🏁 Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
