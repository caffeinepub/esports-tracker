import { UserType } from '../backend';
import PlayerProfileSetup from '../components/PlayerProfileSetup';
import TeamProfileSetup from '../components/TeamProfileSetup';

interface ProfileSetupPageProps {
  userType: UserType;
}

export default function ProfileSetupPage({ userType }: ProfileSetupPageProps) {
  // Show appropriate profile setup based on role
  if (userType === UserType.player) {
    return <PlayerProfileSetup />;
  } else if (userType === UserType.team) {
    return <TeamProfileSetup />;
  }

  return null;
}
