import React from 'react';

const Card = ({ title, description, icon, gradient }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:border-white/30 transition-all duration-300 hover:scale-105">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
      
      <div className="relative z-10">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default Card;
