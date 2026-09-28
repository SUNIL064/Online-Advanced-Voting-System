import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

interface NodePoint {
  name: string;
  lat: number;
  lng: number;
  color: string;
  isDestination?: boolean;
}

export const InteractiveGlobeCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isLowBandwidth } = useApp();

  useEffect(() => {
    if (isLowBandwidth) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;

    // Diaspora nodes
    const nodes: NodePoint[] = [
      { name: 'India (Consensus Core)', lat: 20.5937, lng: 78.9629, color: '#F59E0B', isDestination: true },
      { name: 'North America (USA/CA)', lat: 37.7749, lng: -122.4194, color: '#60A5FA' },
      { name: 'Middle East (UAE/GCC)', lat: 25.2048, lng: 55.2708, color: '#34D399' },
      { name: 'Europe (UK/EU)', lat: 51.5074, lng: -0.1278, color: '#818CF8' },
      { name: 'Asia Pacific (SG/AU)', lat: 1.3521, lng: 103.8198, color: '#38BDF8' },
    ];

    // Animated packets
    interface Packet {
      fromIndex: number;
      progress: number;
      speed: number;
    }

    const packets: Packet[] = [
      { fromIndex: 1, progress: 0.1, speed: 0.008 },
      { fromIndex: 2, progress: 0.5, speed: 0.012 },
      { fromIndex: 3, progress: 0.8, speed: 0.009 },
      { fromIndex: 4, progress: 0.3, speed: 0.011 },
    ];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) * 0.38;

      ctx.clearRect(0, 0, width, height);

      // Background ambient globe glow
      const grad = ctx.createRadialGradient(centerX, centerY, radius * 0.2, centerX, centerY, radius * 1.3);
      grad.addColorStop(0, 'rgba(30, 58, 138, 0.35)');
      grad.addColorStop(0.6, 'rgba(15, 23, 42, 0.2)');
      grad.addColorStop(1, 'rgba(7, 10, 18, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Globe sphere outline
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating latitude / longitude rings
      rotation += 0.003;

      for (let i = -3; i <= 3; i++) {
        const yOffset = (i / 4) * radius;
        const rRing = Math.sqrt(Math.max(0, radius * radius - yOffset * yOffset));
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.12)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY + yOffset, rRing, rRing * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (let j = 0; j < 6; j++) {
        const angle = rotation + (j * Math.PI) / 3;
        const xDist = Math.sin(angle) * radius;
        ctx.strokeStyle = 'rgba(96, 165, 250, 0.15)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(centerX + xDist * 0.2, centerY, Math.abs(xDist), radius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Convert Lat/Lng with rotation to 2D projection on sphere
      const project = (lat: number, lng: number) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + (rotation * 180) / Math.PI) * (Math.PI / 180);
        const x = centerX + radius * Math.sin(phi) * Math.cos(theta);
        const y = centerY - radius * Math.cos(phi);
        const isVisible = Math.sin(phi) * Math.sin(theta) > -0.2;
        return { x, y, isVisible };
      };

      const destination = project(nodes[0].lat, nodes[0].lng);

      // Draw arcs & packets from diaspora to India
      nodes.forEach((node, idx) => {
        if (idx === 0) return;
        const pos = project(node.lat, node.lng);

        if (pos.isVisible || destination.isVisible) {
          // Curved connection arc
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(59, 130, 246, 0.25)';
          ctx.lineWidth = 1.2;
          ctx.setLineDash([4, 4]);
          ctx.moveTo(pos.x, pos.y);
          const controlX = (pos.x + destination.x) / 2;
          const controlY = (pos.y + destination.y) / 2 - 40;
          ctx.quadraticCurveTo(controlX, controlY, destination.x, destination.y);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });

      // Update & Draw Packets
      packets.forEach(packet => {
        const fromNode = nodes[packet.fromIndex];
        const fromPos = project(fromNode.lat, fromNode.lng);
        const toPos = destination;

        packet.progress += packet.speed;
        if (packet.progress > 1) packet.progress = 0;

        const t = packet.progress;
        const controlX = (fromPos.x + toPos.x) / 2;
        const controlY = (fromPos.y + toPos.y) / 2 - 40;

        // Quadratic Bezier interpolation
        const px = (1 - t) * (1 - t) * fromPos.x + 2 * (1 - t) * t * controlX + t * t * toPos.x;
        const py = (1 - t) * (1 - t) * fromPos.y + 2 * (1 - t) * t * controlY + t * t * toPos.y;

        // Draw glowing encrypted packet
        ctx.fillStyle = '#60A5FA';
        ctx.shadowColor = '#3B82F6';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw Nodes
      nodes.forEach(node => {
        const pos = project(node.lat, node.lng);
        if (!pos.isVisible) return;

        // Pulsing outer halo
        const pulse = (Math.sin(Date.now() / 300) + 1) * 3;
        ctx.fillStyle = node.color + '33';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, (node.isDestination ? 8 : 6) + pulse, 0, Math.PI * 2);
        ctx.fill();

        // Node center
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, node.isDestination ? 5 : 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Node label
        ctx.font = '10px Inter, sans-serif';
        ctx.fillStyle = '#CBD5E1';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, pos.x, pos.y - 12);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLowBandwidth]);

  if (isLowBandwidth) {
    return (
      <div className="w-full h-80 sm:h-96 rounded-2xl bg-navy-900/60 border border-electric-500/20 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-electric-500/20 border border-electric-400/40 flex items-center justify-center text-electric-400 mb-3 font-bold text-lg">
          VBB
        </div>
        <h4 className="text-sm font-semibold text-slate-200 mb-1">Global Encrypted Diaspora Network</h4>
        <p className="text-xs text-slate-400 max-w-sm">
          Low-bandwidth optimized mode active. Interactive WebGL canvas animations are simplified for high performance.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-80 sm:h-96 lg:h-[420px] flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      {/* Floating Trust Pills */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
        <div className="px-3 py-1 rounded-full bg-navy-900/80 border border-electric-500/30 text-slate-200 text-[11px] backdrop-blur-md flex items-center gap-1.5 shadow-glow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Consensus Mesh: <strong>Synchronized</strong></span>
        </div>
        <div className="px-3 py-1 rounded-full bg-navy-900/80 border border-saffron-500/30 text-slate-200 text-[11px] backdrop-blur-md flex items-center gap-1.5 shadow-glow-saffron/20">
          <span className="w-2 h-2 rounded-full bg-saffron-400"></span>
          <span>End-to-End Cryptographic Blind Ingestion</span>
        </div>
      </div>
    </div>
  );
};
