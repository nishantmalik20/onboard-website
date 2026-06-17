import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  KanbanSquare, Megaphone, Mail, Target, MessagesSquare, Bot, ImagePlus, ArrowRight,
} from 'lucide-react';
import { useAuth } from '../AuthProvider.jsx';
import { useData } from '../lib/useData.js';

// `adminOnly` tools are management/marketing surfaces only the admin works in.
// Employees only ever see the tools they actually use (the Task Manager).
const FEATURES = [
  { key: 'tasks', title: 'Task Manager', desc: 'Assign and track every job across the pipeline — from opportunity to close-out.', icon: KanbanSquare, to: '/admin/tasks', live: true },
  { key: 'social', title: 'Social Media Manager', desc: 'Upload media, build reels & posters, and publish across every platform.', icon: Megaphone, live: false, adminOnly: true },
  { key: 'email', title: 'Email Campaigns', desc: 'Draft, review, and send campaigns to your Brevo contact list.', icon: Mail, live: false, adminOnly: true },
  { key: 'ads', title: 'Meta Ads', desc: 'Plan and manage Facebook & Instagram ad campaigns.', icon: Target, live: false, adminOnly: true },
  { key: 'inbox', title: 'Unified Inbox', desc: 'Every conversation across every platform, on one page.', icon: MessagesSquare, live: false, adminOnly: true },
  { key: 'chatbot', title: 'Website Chatbot', desc: 'Live chat to your phone — answers product, service & promo questions.', icon: Bot, live: false, adminOnly: true },
  { key: 'proof', title: 'Sign Proof Template', desc: 'Auto-generate day & night views and assemble a client proof.', icon: ImagePlus, live: false, adminOnly: true },
];

export function DashboardPage() {
  const { user, isAdmin } = useAuth();
  const data = useData();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const [tasks, columns] = await Promise.all([data.listTasks(), data.listColumns()]);
      if (!active) return;
      const byCol = Object.fromEntries(columns.map((c) => [c.id, 0]));
      tasks.forEach((t) => { byCol[t.columnId] = (byCol[t.columnId] || 0) + 1; });
      setStats({
        total: tasks.length,
        highlights: columns.slice(0, 4).map((c) => ({ name: c.name, count: byCol[c.id] || 0 })),
      });
    })();
    return () => { active = false; };
  }, [data, user]);

  return (
    <div className="max-w-6xl">
      {/* Greeting */}
      <div className="mb-7">
        <p className="font-data text-xs uppercase tracking-widest text-dark/45">Welcome back</p>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-dark tracking-tight mt-1">
          Hi {user?.name?.split(' ')[0]} <span className="font-drama text-accent">— here's your day.</span>
        </h2>
      </div>

      {/* Pipeline snapshot */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-9">
          <div className="rounded-[1.25rem] border border-primary bg-white px-5 py-4">
            <p className="font-data text-[10px] uppercase tracking-widest text-dark/45">{isAdmin ? 'All jobs' : 'My jobs'}</p>
            <p className="font-heading text-3xl font-bold text-accent mt-1">{stats.total}</p>
          </div>
          {stats.highlights.map((h) => (
            <div key={h.name} className="rounded-[1.25rem] border border-primary bg-white px-5 py-4">
              <p className="font-data text-[10px] uppercase tracking-widest text-dark/45 truncate">{h.name}</p>
              <p className="font-heading text-3xl font-bold text-dark mt-1">{h.count}</p>
            </div>
          ))}
        </div>
      )}

      {/* Feature grid — employees only see the tools they actually use */}
      <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-dark/50 mb-4">Tools</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURES.filter((feature) => !feature.adminOnly || isAdmin).map((feature) => {
          const Icon = feature.icon;
          const { live } = feature;
          const inner = (
            <>
              <div className="flex items-center justify-between mb-4">
                <span className={['inline-flex items-center justify-center w-12 h-12 rounded-2xl', live ? 'bg-accent text-white' : 'bg-primary/60 text-dark/40'].join(' ')}>
                  <Icon size={22} strokeWidth={2.1} />
                </span>
                {live ? (
                  <span className="font-data text-[10px] uppercase tracking-widest text-accent inline-flex items-center gap-1">Open <ArrowRight size={12} /></span>
                ) : (
                  <span className="font-data text-[10px] uppercase tracking-widest text-dark/35 px-2.5 py-1 rounded-full border border-primary">Coming soon</span>
                )}
              </div>
              <h4 className="font-heading text-lg font-bold text-dark tracking-tight">{feature.title}</h4>
              <p className="font-heading text-sm text-dark/55 mt-1.5 leading-relaxed">{feature.desc}</p>
            </>
          );

          const base = 'block rounded-[2rem] border p-6 transition-all';
          return live ? (
            <Link key={feature.key} to={feature.to} className={`${base} border-primary bg-white hover:border-accent/40 hover:shadow-lg hover:-translate-y-0.5`}>
              {inner}
            </Link>
          ) : (
            <div key={feature.key} className={`${base} border-primary/70 bg-white/50 cursor-default select-none`} aria-disabled="true">
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
