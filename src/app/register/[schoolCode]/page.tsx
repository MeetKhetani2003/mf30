"use client";

import React from "react";
import { useParams } from "next/navigation";
import StudentRegistrationFlow from "@/components/student/StudentRegistrationFlow";

export default function SchoolStudentRegisterPage() {
  const params = useParams();
  const schoolCode = (params.schoolCode as string)?.toUpperCase();

  return <StudentRegistrationFlow initialSchoolCode={schoolCode} />;
}
