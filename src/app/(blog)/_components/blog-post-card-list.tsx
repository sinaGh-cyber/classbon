import React from "react";
import { CourseSummary } from "@/types/course-summery.interface";
import { BlogPostCard } from "./blog-post-card";
import { BlogPostSummery } from "@/types/blog-post-summery.interface";

type BlogPostCardListProps = {
  posts: BlogPostSummery[];
};

export const BlogPostCardList: React.FC<BlogPostCardListProps> = async ({
  posts,
}) => {
  return (
    <div className="flex flex-wrap justify-center xl:justify-start gap-6 mt-10">
      {posts?.map((post) => (
        <BlogPostCard key={`course-${post.slug}`} {...post} />
      ))}
    </div>
  );
};
