import React from 'react';
import ContentLoader from 'react-content-loader';

export default function Skeleton() {
  return (
    <ContentLoader
      speed={2}
      width={280}
      height={460}
      viewBox="0 0 280 460"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <circle cx="140" cy="140" r="130" />
      <rect x="25" y="280" rx="10" ry="10" width="230" height="25" />
      <rect x="15" y="320" rx="15" ry="15" width="250" height="85" />
      <rect x="10" y="428" rx="16" ry="16" width="92" height="27" />
      <rect x="130" y="415" rx="30" ry="30" width="150" height="45" />
    </ContentLoader>
  );
}
