import Image from "next/image";
import { FeatureProps } from "./feature.types";

export const Feature: React.FC<FeatureProps> = ({
  feature: { icon, title, description },
}) => {
  return (
    <article className="flex flex-1 flex-col items-center lg:items-start gsp-4">
      <Image src={icon} height={52} width={52} alt={title} />
      <h4 className="font-bold text-lg">
        {" "}
        {title}{" "}
      </h4>
      <p className="max-w-md text-lg text-center lg:text-center" > {description} </p>
    </article>
  );
};
