
import React, { useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface QuantumVisualizerProps {
  className?: string;
}

const QuantumVisualizer: React.FC<QuantumVisualizerProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle system
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      connections: number[];
      hue: number;
      alpha: number;
    }[] = [];
    
    const createParticles = () => {
      const particleCount = Math.min(50, Math.floor(canvas.width * canvas.height / 10000));
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          connections: [],
          hue: Math.random() > 0.5 ? 180 : 260, // Cyan or purple
          alpha: Math.random() * 0.5 + 0.25
        });
      }
    };
    
    createParticles();
    
    // Animation
    let animationFrameId: number;
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        
        // Draw particle
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${p.alpha})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 100%, 70%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Find connections
        p.connections = [];
        for (let j = 0; j < particles.length; j++) {
          if (i === j) continue;
          
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            p.connections.push(j);
            
            // Draw connection
            ctx.beginPath();
            ctx.strokeStyle = `hsla(${(p.hue + p2.hue) / 2}, 100%, 70%, ${0.05 + (1 - distance / 100) * 0.2})`;
            ctx.lineWidth = (1 - distance / 100) * 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <Card className={cn("quantum-panel overflow-hidden min-h-[200px]", className)}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'transparent' }}
      />
    </Card>
  );
};

export default QuantumVisualizer;
