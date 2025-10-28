
import React from 'react';
import { Icons } from './Icons';
import { useLocalization } from '../contexts/LocalizationContext';

type View = 'dashboard' | 'activities' | 'toolbox' | 'planner' | 'quizGenerator' | 'modules' | 'trainees' | 'schedule' | 'reports';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
    const { t, language } = useLocalization();

    const mainNavItems = [
        { id: 'dashboard', label: t('dashboardTitle'), icon: Icons.layoutGrid },
        { id: 'activities', label: t('activitiesLibrary'), icon: Icons.book },
        { id: 'toolbox', label: t('trainersToolbox'), icon: Icons.box },
    ];
    
    const aiToolsNavItems = [
        { id: 'planner', label: t('sessionPlanner'), icon: Icons.planner },
        { id: 'quizGenerator', label: t('quizGenerator'), icon: Icons.fileText },
    ];

    const managementNavItems = [
        { id: 'modules', label: t('modulesTitle'), icon: Icons.box },
        { id: 'trainees', label: t('traineesTitle'), icon: Icons.presentation },
        { id: 'schedule', label: t('scheduleTitle'), icon: Icons.calendar },
        { id: 'reports', label: t('reportsTitle'), icon: Icons.barChart },
    ];

    const NavButton: React.FC<{item: {id: string, label: string, icon: React.FC<{className?:string}>}}> = ({ item }) => {
        const baseItemClass = "flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors w-full";
        const activeItemClass = "bg-sky-100 text-sky-700";
        const inactiveItemClass = "text-slate-600 hover:bg-slate-200 hover:text-slate-900";

        return (
             <button
                key={item.id}
                onClick={() => setActiveView(item.id as View)}
                className={`${baseItemClass} ${activeView === item.id ? activeItemClass : inactiveItemClass}`}
                aria-current={activeView === item.id ? 'page' : undefined}
            >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
            </button>
        )
    }

    return (
        <aside className={`w-64 bg-white p-4 shadow-md ${language === 'ar' ? 'border-l' : 'border-r'} border-slate-200 flex flex-col gap-6`}>
            <nav className="space-y-2">
                {mainNavItems.map(item => <NavButton key={item.id} item={item} />)}
            </nav>
            <hr/>
             <nav className="space-y-2">
                <h3 className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">AI Tools</h3>
                {aiToolsNavItems.map(item => <NavButton key={item.id} item={item} />)}
            </nav>
            <hr/>
             <nav className="space-y-2">
                <h3 className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Management</h3>
                {managementNavItems.map(item => <NavButton key={item.id} item={item} />)}
            </nav>
        </aside>
    );
};

export default Sidebar;
