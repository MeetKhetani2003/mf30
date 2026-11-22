import React from "react";
import StudentRegistrationFlow from "@/components/student/StudentRegistrationFlow";

export const metadata = {
  title: "Student Registration & Video Orientation | Mission 3F Road Safety",
  description:
    "Complete the mandatory road safety training video, register your student profile, and select your monthly examination slot (10th, 20th, 30th). Top 10 scorers win an official Mission 3F ISI Safety Helmet.",
};

export default function StudentsPage() {
  return <StudentRegistrationFlow />;
}
