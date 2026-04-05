'use client';
import { motion } from 'framer-motion';
import { Algorithm, ALGORITHM_INFO } from '@/types';
import { useSimStore } from '@/store/useSimStore';
import ExplainBox from './ExplainBox';

const ALGO_ICONS: Record<Algorithm, string> = {
  fcfs: '📋',
  sjf: '⚡',
  priority: '🎯',
  rr: '🔄',
  srtf: '⚡',
  'preemptive-priority': '🎯',
};

const ALGO_COLORS: Record<Algorithm, string> = {
  fcfs: '#00E5FF',
  sjf: '#00FF88',
  priority: '#FFB800',
  rr: '#BB88FF',
  srtf: '#FF8844',
  'preemptive-priority': '#FF4466',
};

export default function AlgorithmSelector() {
  const { selectedAlgorithm, selectAlgorithm, goToStep } = useSimStore();

  const algorithms: Algorithm[] = ['fcfs', 'sjf', 'priority', 'rr', 'srtf', 'preemptive-priority'];

  const handleAlgorithmSelect = (algo: Algorithm) => {
    selectAlgorithm(algo);
    // Navigate to process creation after selection
    setTimeout(() => goToStep('create'), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      className="max-w-2xl mx-auto px-4 py-8"
    >
      {/* Header */}
      <motion.div className="mb-8" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-orbitron font-bold"
            style={{ background: 'rgba(187,136,255,0.15)', border: '1px solid rgba(187,136,255,0.3)', color: '#BB88FF' }}>
            1
          </div>
          <h2 className="font-orbitron text-xl font-bold text-white">Scheduling Algorithm</h2>
        </div>
        <p className="text-slate-400 text-sm ml-11">Choose how the OS decides which process runs next</p>
        <ExplainBox text='The scheduler is the "brain" of the OS. It decides which process gets CPU time and when. Different algorithms have different trade-offs.' />
      </motion.div>

      {/* Algorithm cards */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {algorithms.map((algo, i) => {
          const info = ALGORITHM_INFO[algo];
          const color = ALGO_COLORS[algo];
          const isSelected = selectedAlgorithm === algo;

          return (
            <motion.button
              key={algo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleAlgorithmSelect(algo)}
              className="relative p-4 rounded-xl text-left cursor-pointer overflow-hidden"
              style={{
                background: isSelected ? `linear-gradient(135deg, ${color}15, ${color}05)` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isSelected ? color + '66' : 'rgba(255,255,255,0.07)'}`,
                boxShadow: isSelected ? `0 0 20px ${color}22` : 'none',
              }}
            >
              {isSelected && (
                <motion.div
                  className="absolute inset-0 opacity-5"
                  style={{ background: `radial-gradient(circle at 30% 50%, ${color}, transparent 70%)` }}
                  animate={{ opacity: [0.05, 0.1, 0.05] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}

              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{ALGO_ICONS[algo]}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="font-orbitron font-black text-sm"
                      style={{ color: isSelected ? color : '#94a3b8' }}
                    >
                      {info.name}
                    </span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: color, boxShadow: `0 0 6px ${color}` }}
                      />
                    )}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 leading-relaxed">
                    {info.explanation}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-end items-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-mono text-slate-500"
        >
          Select an algorithm to continue
        </motion.div>
      </div>
    </motion.div>
  );
}
