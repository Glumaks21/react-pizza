import React from 'react';

interface InfoBlockProps {
  title: string;
  description: string[];
}

const InfoBlock = ({ title, description }: InfoBlockProps) => {
  return (
    <div>
      <h2>{title}</h2>
      {description.map((d, i) => (
        <p key={i}>{d}</p>
      ))}
    </div>
  );
};

export default InfoBlock;
