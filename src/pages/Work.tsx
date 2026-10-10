import ContentBoard from '../components/ContentBoard';
import { WORK_DEFAULTS } from '../data/content';

export default function Work() {
  return (
    <ContentBoard
      storageKey="work"
      title="Our work"
      subtitle="Projects we have built, with screenshots, files and links."
      defaults={WORK_DEFAULTS}
    />
  );
}
