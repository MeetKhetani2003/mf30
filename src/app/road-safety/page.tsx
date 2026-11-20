import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Bike,
  Activity,
  AlertTriangle,
  Users,
  Target,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Road Safety Awareness | 6 Core Pillars | Mission 3F",
  description:
    "Comprehensive road safety curriculum: helmet compliance, seatbelt discipline, speed control, pedestrian yielding, anti-distracted driving, and sober driving.",
};

const MODULES = [
  {
    id: "helmet",
    number: "01",
    title: "Helmet Safety & Chin-Strap Discipline",
    tagline: "Protect the Brain, Fasten the Strap",
    icon: Bike,
    color: "brand-orange",
    summary:
      "A motorcycle helmet is the single most effective piece of life-saving equipment for two-wheeler riders and pillions.",
    points: [
      "Mandatory ISI / BIS Certification: Under the Motor Vehicles Act, all helmets must carry the IS 4151 mark. Non-certified plastic shells crack on primary tarmac contact.",
      "Two-Finger Tightness Rule: A helmet strap must be adjusted so that only 1 to 2 fingers can fit snugly between the chin and strap. An unbuckled helmet will fly off before secondary head collision.",
      "Full-Face vs. Open-Face: Crash trauma studies indicate that over 34% of impact forces strike the chin and lower facial region, which half-helmets leave completely unprotected.",
    ],
    dos: [
      "Fasten the buckle before turning on ignition.",
      "Replace any helmet subjected to a hard drop or impact.",
      "Ensure the clear visor is scratch-free for night riding.",
    ],
    donts: [
      "Never rest helmet loosely on forehead or handlebars.",
      "Never use construction hard-hats or bicycle helmets on motorcycles.",
    ],
  },
  {
    id: "seatbelt",
    number: "02",
    title: "Seatbelt Discipline & Airbag Safety",
    tagline: "3-Point Restraint Keeps You in the Cabin",
    icon: Shield,
    color: "amber-600",
    summary:
      "Seatbelts distribute the violent deceleration forces of a collision across the strong skeletal pelvic and rib bones.",
    points: [
      "Three-Point Geometry: The lap portion must cross low across the pelvis (not the soft abdomen), while the diagonal strap crosses the center of the chest.",
      "Airbags Deploy at 300 km/h: Supplemental Restraint Systems (SRS) airbags deploy pyrotechnically in under 30 milliseconds. An unbelted occupant hurtling forward strikes the expanding bag with lethal impact force.",
      "Rear Passenger Mandate: Rear passengers without seatbelts become human projectiles, fatally crushing front-row passengers during sudden deceleration.",
    ],
    dos: [
      "Click your seatbelt the moment you sit in any vehicle seat.",
      "Ensure pregnant passengers place the lap belt beneath the abdomen.",
    ],
    donts: [
      "Never place child car seats in front of active airbags.",
      "Never use seatbelt defeat clips or dummy buckles.",
    ],
  },
  {
    id: "speed",
    number: "03",
    title: "Speed Control & Signal Observance",
    tagline: "Kinetic Energy Quadruples as Speed Doubles",
    icon: Activity,
    color: "emerald-600",
    summary:
      "Vehicular stopping distance is governed by the laws of physics: doubling your speed quadruples the kinetic energy brakes must dissipate.",
    points: [
      "School Zone Limits (20-25 km/h): Pedestrian survival rates are over 90% if struck at 20 km/h, but plummet below 15% if struck at 50 km/h or above.",
      "The Amber Light Rule: Amber indicates that red is imminent; drivers must safely bring their vehicle to a halt at the stop line unless stopping abruptly would cause a rear-end collision.",
      "Flashing Red Signals: A flashing red signal must be treated exactly like a complete Stop Sign before proceeding when cross-traffic is clear.",
    ],
    dos: [
      "Scan 10 to 15 seconds ahead for hazards and intersections.",
      "Maintain a 3-second minimum following distance in dry daylight.",
    ],
    donts: [
      "Never accelerate on amber to beat red lights.",
      "Never overtake on narrow bridges, blind curves, or pedestrian crossings.",
    ],
  },
  {
    id: "distraction",
    number: "04",
    title: "Anti-Distracted Driving & Anti-Mobile",
    tagline: "Eyes on the Road, Mind on the Drive",
    icon: AlertTriangle,
    color: "red-600",
    summary:
      "Cognitive distraction creates inattentional blindness, delaying braking and swerving reflexes by up to 40%.",
    points: [
      "3 Seconds = 50 Meters Blind: At 60 km/h, looking down at a mobile text message for just 3 seconds means hurtling blind for half the length of an entire football field.",
      "The Hands-Free Myth: Cognitive research confirms that talking on Bluetooth headsets or speakerphones impairs hazard perception identically to handheld calls.",
      "Rubbernecking Danger: Slowing down or craning necks to stare at roadside incidents on opposite lanes triggers secondary rear-end collisions.",
    ],
    dos: [
      "Set your navigation route and playlist before rolling.",
      "Pull over completely to a safe shoulder if a call is critical.",
    ],
    donts: [
      "Never text, check social media, or record videos while operating a vehicle.",
      "Never ride with dual noise-cancelling in-ear headphones.",
    ],
  },
  {
    id: "pedestrian",
    number: "05",
    title: "Pedestrian Crossing & Zebra Line Yield",
    tagline: "Vulnerable Road Users Have Absolute Priority",
    icon: Users,
    color: "blue-600",
    summary:
      "Pedestrians, school children, and the elderly have unequivocal right-of-way on all designated pedestrian crossings.",
    points: [
      "Zebra Crossing Priority: Motorists must decelerate and come to a complete halt before the stop line whenever a pedestrian steps onto a crossing.",
      "Pelican & School Crossings: Respect crossing guards, lollipop patrols, and automated pedestrian signals outside school gates and public transit hubs.",
      "Good Samaritan Protection: Under Indian law and Supreme Court guidelines, citizens rendering First Aid to road accident victims are fully protected from police harassment.",
    ],
    dos: [
      "Yield courteously to pedestrians without aggressive honking.",
      "Slow down when visibility is restricted near bus stands.",
    ],
    donts: [
      "Never park on top of a zebra crossing or stop line.",
      "Never overtake a vehicle that has stopped to let pedestrians cross.",
    ],
  },
  {
    id: "sober",
    number: "06",
    title: "Sober Driving & Anti-DUI Advocacy",
    tagline: "Alcohol Impairs Reflexes; Zero Tolerance Saves Lives",
    icon: Target,
    color: "purple-600",
    summary:
      "Alcohol is a central nervous system depressant that destroys depth perception, peripheral vision, and reaction time.",
    points: [
      "Section 185 MV Act: Driving with Blood Alcohol Content (BAC) exceeding 30 mg per 100 ml of blood detected by breath analyzer invites heavy fines and mandatory imprisonment.",
      "The Golden Hour: In severe traumatic road accidents, prompt medical attention within the first 60 minutes is the single greatest determinant of survival.",
      "Designated Driver Plan: Always appoint a designated sober driver, book a verified cab rideshare, or use public transit when social gatherings involve alcohol.",
    ],
    dos: [
      "Have a clear sober transit plan before leaving home.",
      "Intervene and prevent friends from driving under the influence.",
    ],
    donts: [
      "Never assume strong coffee or cold showers eliminate bloodstream alcohol.",
      "Never accept a ride from a driver who has consumed alcohol.",
    ],
  },
];

export default function RoadSafetyCurriculumPage() {
  return (
    <div className="bg-brand-soft-white py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 space-y-16">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-brand-cream border border-brand-orange/30 text-xs text-brand-orange font-bold uppercase tracking-wider">
            Comprehensive Curriculum
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-brand-charcoal">
            Road Safety Education Modules
          </h1>
          <p className="text-sm sm:text-base text-brand-gray leading-relaxed">
            Detailed guidance on India&apos;s Motor Vehicles Act, defensive driving techniques, two-wheeler physics, and evidence-based survival strategies.
          </p>
        </div>

        {/* The 6 Modules */}
        <div className="space-y-12">
          {MODULES.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                id={m.id}
                className="card-premium p-8 sm:p-10 space-y-6 scroll-mt-28"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-brand-cream border border-brand-orange/30 flex items-center justify-center text-brand-orange flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                        Module {m.number}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-brand-charcoal">
                        {m.title}
                      </h2>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-brand-gray italic">
                    {m.tagline}
                  </span>
                </div>

                <p className="text-sm text-brand-charcoal leading-relaxed font-medium">
                  {m.summary}
                </p>

                {/* Core Learning Points */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-charcoal">
                    Key Scientific &amp; Legal Principles
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-brand-gray leading-relaxed">
                    {m.points.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Do's and Don'ts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                    <strong className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Recommended Practices (DO)
                    </strong>
                    <ul className="space-y-1 text-xs text-emerald-950">
                      {m.dos.map((d, i) => (
                        <li key={i}>• {d}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-red-50/60 border border-red-200 space-y-2">
                    <strong className="text-xs font-bold uppercase tracking-wider text-red-800 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      Dangerous Hazards (DON&apos;T)
                    </strong>
                    <ul className="space-y-1 text-xs text-red-950">
                      {m.donts.map((d, i) => (
                        <li key={i}>• {d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ready to Test Knowledge Banner */}
        <div className="card-premium p-8 text-center space-y-4 bg-brand-cream border-brand-orange/30">
          <h3 className="text-2xl font-bold text-brand-charcoal">
            Ready to Certify Your Knowledge?
          </h3>
          <p className="text-xs sm:text-sm text-brand-gray max-w-md mx-auto">
            Take the timed 30-MCQ digital road safety examination mapped to these six modules.
          </p>
          <Link
            href="/register/XAV-DEL-101"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-orange text-white text-xs sm:text-sm font-semibold hover:bg-brand-orange-hover shadow-sm"
          >
            <span>Register for Student Exam</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
