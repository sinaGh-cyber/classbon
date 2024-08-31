import React from "react";
import { CourseSummary } from "@/types/course-summery.interface";


import { CourseCard, CourseCardProps } from "./course-card";


type CourseCardListProps = {
  courses: CourseSummary[];
}

export const CourseCardList: React.FC<CourseCardListProps> = async ({courses}) => {
  return (
    <div className="flex flex-wrap justify-center xl:justify-start gap-6 mt-10">
      {courses.map((course) => (
        <CourseCard key={`course-${course.slug}`} {...course} />
      ))}
    </div>
  );
};