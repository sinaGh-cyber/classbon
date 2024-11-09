import React from 'react';
import { CourseSummary } from '@/types/course-summery.interface';

import { CourseCard, CourseCardProps } from './course-card';
import { API_URL } from '@/configs/global';

async function getNewestCourses(count: number): Promise<CourseSummary[]> {
	const res = await fetch(`${API_URL}/courses/newest/${count}`, {
		next: { revalidate: 24 * 60 * 60 },
		cache: 'no-store',
	});
	await new Promise((resolve) => {
		setTimeout(resolve, 5000);
	});
	return res.json();
}

type CourseCardListProps = {
	courses: CourseSummary[];
};

export const CourseCardList: React.FC<CourseCardListProps> = async ({
	courses,
}) => {
	const newestCoursesData = await getNewestCourses(4);

	return (
		<div className="flex flex-wrap justify-center xl:justify-start gap-6 mt-10">
			{newestCoursesData.map((course) => (
				<CourseCard key={`course-${course.slug}`} {...course} />
			))}
		</div>
	);
};
