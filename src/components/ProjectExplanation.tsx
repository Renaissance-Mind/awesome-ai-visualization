import rawProfiles from "../data/project-profiles.generated.json";

const profiles = rawProfiles as Record<string, { explanation: string; useCases: string[] }>;

export default function ProjectExplanation({ name }: { name: string }) {
  const profile = profiles[name];
  if (!profile) return null;
  return <><p>{profile.explanation}</p><h3>适合用来做什么</h3>
    <ul>{profile.useCases.map(useCase => <li key={useCase}>{useCase}</li>)}</ul>
  </>;
}
