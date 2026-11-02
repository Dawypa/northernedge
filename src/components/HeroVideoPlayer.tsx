import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Video, Gauge } from 'lucide-react';
import { BUNDLED_MEDIA, HERO_HIGHLIGHT_CLIPS, HighlightClip } from '../data/clinicData';

export const HeroVideoPlayer: React.FC = () => {
  const [activeClipIndex, setActiveClipIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [slowMotion, setSlowMotion] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(28);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeClip: HighlightClip = HERO_HIGHLIGHT_CLIPS[activeClipIndex];

  const clipPosterMap: Record<string, string> = {
    'clip-turf': BUNDLED_MEDIA.heroTurfSvg,
    'clip-gym': BUNDLED_MEDIA.seniorStrengthSvg,
    'clip-resilience': BUNDLED_MEDIA.lowerLimbSvg,
  };

  useEffect(() => {
    if (!isPlaying) return;

    let animationFrameId: number;
    let lastTimestamp = performance.now();

    const renderLoop = (now: number) => {
      const dt = (now - lastTimestamp) / 1000;
      lastTimestamp = now;
      const speedFactor = slowMotion ? 0.35 : 1.0;

      setProgress((prev) => {
        const next = prev + dt * 9 * speedFactor;
        return next >= 100 ? 0 : next;
      });

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const w = canvas.width;
          const h = canvas.height;
          ctx.clearRect(0, 0, w, h);

          const phase = ((now * 0.0012 * speedFactor) % 1 + 1) % 1;

          // Subtle biomechanical tracking reticle and trajectory pulse
          if (activeClipIndex === 0) {
            // Turf parabolic ball flight & sprint gate laser
            const startX = w * 0.22;
            const startY = h * 0.78;
            const ctrlX = w * 0.48;
            const ctrlY = h * 0.18;
            const endX = w * 0.78;
            const endY = h * 0.46;

            const t = phase;
            const bx = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * ctrlX + t * t * endX;
            const by = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * ctrlY + t * t * endY;

            // Glowing football tracker
            ctx.beginPath();
            ctx.arc(bx, by, 9, 0, Math.PI * 2);
            ctx.fillStyle = '#FF5500';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(bx, by, 19, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255, 85, 0, 0.55)';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Sprint gate scan line
            const gateX = w * (0.18 + phase * 0.62);
            ctx.beginPath();
            ctx.moveTo(gateX, h * 0.58);
            ctx.lineTo(gateX, h * 0.88);
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.42)';
            ctx.lineWidth = 1.5;
            ctx.stroke();
          } else if (activeClipIndex === 1) {
            // Gym bar path vertical velocity tracker
            const barX = w * 0.68;
            const barY = h * (0.68 - Math.sin(phase * Math.PI) * 0.36);

            ctx.beginPath();
            ctx.moveTo(barX, h * 0.72);
            ctx.lineTo(barX, barY);
            ctx.strokeStyle = '#FF5500';
            ctx.lineWidth = 3;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(barX, barY, 10, 0, Math.PI * 2);
            ctx.fillStyle = '#38BDF8';
            ctx.fill();
          } else {
            // Lower-limb force waveform sweep
            ctx.beginPath();
            for (let x = 60; x < w - 60; x += 8) {
              const norm = (x - 60) / (w - 120);
              const wave = Math.sin((norm * 6 - phase * Math.PI * 2)) * 22;
              const y = h * 0.52 + wave;
              if (x === 60) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.strokeStyle = 'rgba(255, 85, 0, 0.65)';
            ctx.lineWidth = 2.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying, slowMotion, activeClipIndex]);

  return (
    <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#0D121B] flex flex-col justify-between h-full">
      {/* Video Viewport Area */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#080B10]">
        <img
          src={clipPosterMap[activeClip.id]}
          alt={activeClip.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover select-none"
        />
        <canvas
          ref={canvasRef}
          width={960}
          height={540}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Measured Contrast Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

        {/* Top Bar Inside Video Frame: Camera Reel Switcher */}
        <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 z-10">
          <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-950/85 border border-slate-800/90 backdrop-blur-sm">
            {HERO_HIGHLIGHT_CLIPS.map((clip, idx) => (
              <button
                key={clip.id}
                type="button"
                onClick={() => {
                  setActiveClipIndex(idx);
                  setProgress(15);
                }}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeClipIndex === idx
                    ? 'bg-[#FF5500] text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                0{idx + 1}. {idx === 0 ? 'Turf Sprint & Kick' : idx === 1 ? 'Gym 3RM Force' : 'Soleus & Limb Lab'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setSlowMotion((prev) => !prev)}
              className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                slowMotion
                  ? 'bg-blue-600/90 border-blue-400 text-white'
                  : 'bg-slate-950/85 border-slate-800 text-slate-300 hover:text-white'
              }`}
              title="Toggle 240fps Slow-Motion Biomechanics View"
            >
              <Gauge className="w-3.5 h-3.5" />
              {slowMotion ? '0.5x 240FPS' : '1.0x LIVE'}
            </button>
            <button
              type="button"
              onClick={() => setIsPlaying((prev) => !prev)}
              className="px-2.5 py-1 text-xs font-medium rounded bg-slate-950/85 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1"
              aria-label={isPlaying ? 'Pause highlight reel' : 'Play highlight reel'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>

        {/* Bottom Overlay Inside Video: Clip Caption & Live Metrics */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 mb-1">
            <Video className="w-3.5 h-3.5 text-[#FF5500]" />
            <span>{activeClip.location}</span>
            <span aria-hidden="true">·</span>
            <span>{activeClip.focus}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{activeClip.duration}</span>
          </div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-wide">
            {activeClip.title}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">{activeClip.telemetryNote}</p>

          {/* Scrubber Bar */}
          <div className="mt-3 w-full h-1 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FF5500] transition-transform duration-100 origin-left"
              style={{ transform: `scaleX(${Math.max(0.05, progress / 100)})` }}
            />
          </div>
        </div>
      </div>

      {/* Telemetry Readout Footer Bar */}
      <div className="grid grid-cols-3 divide-x divide-slate-800/80 border-t border-slate-800 bg-[#101622] px-2 py-3">
        {activeClip.metrics.map((m) => (
          <div key={m.label} className="px-3 text-center sm:text-left">
            <div className="text-[11px] text-slate-400 truncate">{m.label}</div>
            <div className="font-mono text-sm sm:text-base font-semibold text-white tabular-nums mt-0.5">
              {m.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
