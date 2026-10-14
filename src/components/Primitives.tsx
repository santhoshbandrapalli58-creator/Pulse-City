import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Wordmark({ small = false }: { small?: boolean }) { return <span className={`wordmark ${small ? 'wordmark-small' : ''}`}><i className="pulse-dot" aria-hidden="true" />PULSE<span className="slash">/</span>CITY</span>; }
export function PulseDot({ label }: { label?: string }) { return <span className="live-indicator"><i className="pulse-dot" aria-hidden="true" />{label}</span>; }
export function Rule({ className = '' }: { className?: string }) { return <motion.div className={`rule ${className}`} initial={{ scaleX: 0, transformOrigin: 'left' }} animate={{ scaleX: 1 }} transition={{ duration: .8, ease: 'easeOut' }} />; }
export function SectionHeader({ n, title, detail, action }: { n: string; title: string; detail?: string; action?: string }) { return <div className="section-head"><span className="eyebrow">{n} / {title}</span><div className="section-head-right">{detail && <span className="muted small-copy">{detail}</span>}{action && <button className="text-action">{action}<ArrowUpRight size={14} /></button>}</div></div>; }
export function Metric({ label, value, unit, change, accent = false }: { label: string; value: number | string; unit?: string; change?: string; accent?: boolean }) {
  const [n, setN] = useState(0); const numeric = typeof value === 'number';
  useEffect(() => { if (!numeric) return; let start: number | null = null; let frame = 0; const end = Number(value); const run = (t: number) => { if (start === null) start = t; const p = Math.min((t - start) / 800, 1); setN(Math.round(end * (1 - Math.pow(1 - p, 3)))); if (p < 1) frame = requestAnimationFrame(run); }; frame = requestAnimationFrame(run); return () => cancelAnimationFrame(frame); }, [value, numeric]);
  return <div className="metric"><div className="eyebrow muted">{label}</div><div className={`metric-value ${accent ? 'signal-text' : ''}`}>{numeric ? n : value}<span>{unit}</span></div>{change && <div className="metric-change">{change}</div>}</div>;
}
export function Button({ children, onClick, variant = 'dark', className = '', type = 'button', disabled = false }: { children: React.ReactNode; onClick?: () => void; variant?: 'dark' | 'light' | 'red' | 'outline'; className?: string; type?: 'button' | 'submit'; disabled?: boolean }) { return <button type={type} disabled={disabled} onClick={onClick} className={`button button-${variant} ${className}`}>{children}<ChevronRight size={15} /></button>; }
