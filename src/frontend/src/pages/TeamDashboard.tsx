import { useState, useEffect } from 'react';
import TeamHeader from '../components/TeamHeader';
import TeamHomeSection from '../components/TeamHomeSection';
import TeamProfileView from '../components/TeamProfileView';
import HiringRequirementsView from '../components/HiringRequirementsView';
import TalentFinder from '../components/TalentFinder';
import { perfDiagnostics } from '../utils/perfDiagnostics';

export default function TeamDashboard() {
  const [currentView, setCurrentView] = useState<'home' | 'profile' | 'hiring' | 'talent'>('home');

  // Track first render
  useEffect(() => {
    perfDiagnostics.mark('team-dashboard-render');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <TeamHeader currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="pb-8">
        {currentView === 'home' && <TeamHomeSection onNavigate={setCurrentView} />}
        {currentView === 'profile' && <TeamProfileView />}
        {currentView === 'hiring' && <HiringRequirementsView />}
        {currentView === 'talent' && <TalentFinder />}
      </main>
    </div>
  );
}
