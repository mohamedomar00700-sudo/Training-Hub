
import React, { useState } from 'react';
import Header from './components/Header';
import Activities from './components/Activities';
import Toolbox from './components/Toolbox';
import Sidebar from './components/Sidebar';
import SessionPlanner from './components/SessionPlanner';
import QuizGenerator from './components/QuizGenerator';
import Dashboard from './components/Dashboard';
import Modules from './components/Modules';
import Trainees from './components/Trainees';
import Schedule from './components/Schedule';
import Reports from './components/Reports';
import { useMockData } from './hooks/useMockData';

type View = 'dashboard' | 'activities' | 'toolbox' | 'planner' | 'quizGenerator' | 'modules' | 'trainees' | 'schedule' | 'reports';

const App: React.FC = () => {
  const {
    activities,
    tools,
    modules,
    trainees,
    sessions,
    stats,
    addModule,
    updateModule,
  } = useMockData();
  
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [initialToolId, setInitialToolId] = useState<string | null>(null);

  const handleSelectTool = (toolId: string) => {
    setInitialToolId(toolId);
    setActiveView('toolbox');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard stats={stats} sessions={sessions} />;
      case 'activities':
        return <Activities activities={activities} tools={tools} onSelectTool={handleSelectTool} />;
      case 'toolbox':
        return <Toolbox tools={tools} activities={activities} initialToolId={initialToolId} onToolOpened={() => setInitialToolId(null)} />;
      case 'planner':
        return <SessionPlanner activities={activities} tools={tools} />;
      case 'quizGenerator':
        return <QuizGenerator />;
      case 'modules':
        return <Modules modules={modules} onAddModule={addModule} onUpdateModule={updateModule} />;
      case 'trainees':
        return <Trainees trainees={trainees} />;
      case 'schedule':
        return <Schedule sessions={sessions} />;
      case 'reports':
        return <Reports trainees={trainees} modules={modules} />;
      default:
        return <Dashboard stats={stats} sessions={sessions} />;
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen text-slate-800">
      <Header />
      <div className="flex">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
