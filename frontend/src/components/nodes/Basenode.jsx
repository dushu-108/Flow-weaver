import React, { useEffect, useRef } from 'react';
import { Handle, Position, useUpdateNodeInternals } from '@xyflow/react';
import { X } from 'lucide-react';
import { useStore } from '../../store';
import gsap from 'gsap';

export const BaseNode = ({ id, label, description, icon, children, handles = [], style = {}, accentColor = '#22d3ee' }) => {
  const removeNode = useStore((state) => state.removeNode);
  const updateNodeInternals = useUpdateNodeInternals();
  const cardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { scale: 0.4, opacity: 0, y: 25 },
      { 
        scale: 1, 
        opacity: 1, 
        y: 0, 
        duration: 0.4, 
        ease: "back.out(1.4)",
        onUpdate: () => updateNodeInternals(id)
      }
    );
  }, [id, updateNodeInternals]);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      boxShadow: `0px 0px 22px 0px ${accentColor}30`,
      borderColor: accentColor,
      y: -3,
      duration: 0.25,
      onUpdate: () => updateNodeInternals(id)
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      boxShadow: "0px 15px 25px -5px rgba(0, 0, 0, 0.5)",
      borderColor: "rgba(255, 255, 255, 0.08)",
      y: 0,
      duration: 0.25,
      onUpdate: () => updateNodeInternals(id)
    });
  };

  return (
    <div 
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bg-[#131B2E]/80 backdrop-blur-md border border-white/10 rounded-xl w-[280px] flex flex-col font-sans shadow-2xl relative transition-colors duration-300" 
      style={style}
    >
      <div className="flex items-center justify-between px-3 py-2.5 bg-white/5 border-b border-white/5 rounded-t-xl text-white select-none">
        <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-gray-300">
          {icon && <span style={{ color: accentColor }}>{icon}</span>}
          <span>{label}</span>
        </div>
        <button 
          onClick={() => removeNode(id)}
          className="text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-full p-1 transition-colors"
        >
          <X size={14} />
        </button>
      </div>

      {description && (
        <div className="px-4 pt-3 pb-1 text-[11px] text-gray-400 leading-relaxed font-medium">
          {description}
        </div>
      )}

      <div className="p-4 flex flex-col gap-3 text-xs text-gray-200">
        {children}
      </div>
      
      {handles.map((h, i) => (
        <React.Fragment key={`${id}-handle-wrapper-${i}`}>
          <Handle
            type={h.type}
            position={h.position}
            id={h.id}
            style={{ backgroundColor: h.color || accentColor, ...h.style }}
            className={`!w-3 !h-3 !border-2 !border-[#0B0F19] shadow-md transition-transform hover:scale-125 ${h.className || ''}`}
          />
          
          {h.label && (
            <div 
              className={`absolute z-10 flex items-center select-none pointer-events-none ${
                h.position === Position.Left ? 'right-full mr-2' : 'left-full ml-2'
              }`}
              style={{ top: h.style?.top || '50%', transform: 'translateY(-50%)' }}
            >
              <span className="bg-[#0B0F19] border border-white/10 text-gray-300 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md shadow-lg whitespace-nowrap">
                {h.label}
              </span>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};