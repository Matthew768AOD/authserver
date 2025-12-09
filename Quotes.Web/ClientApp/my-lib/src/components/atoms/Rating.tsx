// ...existing code...
import React from "react";

export type RatingProps = {
  count?: number;
  Icon?: React.ComponentType<{
    filled?: boolean;
    className?: string;
    "aria-hidden"?: boolean;
  }>;
};

const StarFallback: React.FC<{ filled?: boolean; className?: string }> = ({
  filled,
  className,
}) => (
  <span className={className} aria-hidden>
    {filled ? "★" : "☆"}
  </span>
);

export const Rating: React.FC<RatingProps> = ({ count = 0, Icon }) => {
  const IconComp = Icon ?? StarFallback;

  const stars = Array.from({ length: 5 }, (_, i) => (
    <IconComp
      key={i}
      filled={i < count}
      className={`star ${i < count ? "star--filled" : "star--empty"}`}
      aria-hidden
    />
  ));

  return (
    <div role="img" aria-label={`Hodnocení ${count} z 5`} className="rating">
      {stars}
    </div>
  );
};