import React from 'react';
import Card from './Card';

const ExampleCards = () => {
  const features = [
    {
      title: 'Tauri',
      description: 'Build smaller, faster, and more secure desktop applications',
      icon: '🦀',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'React',
      description: 'A JavaScript library for building user interfaces',
      icon: '⚛️',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'Vite',
      description: 'Next generation frontend tooling',
      icon: '⚡',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Tailwind',
      description: 'Rapidly build modern websites without leaving your HTML',
      icon: '🎨',
      gradient: 'from-pink-500 to-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
      {features.map((feature, index) => (
        <Card
          key={index}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
          gradient={feature.gradient}
        />
      ))}
    </div>
  );
};

export default ExampleCards;
