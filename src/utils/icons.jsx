import { MapPin, Route, Store, Boxes } from 'lucide-react';

const MAP = { MapPin, Route, Store, Boxes };
export function ServiceIcon({ name, size = 22, ...rest }) {
  const Icon = MAP[name] || Boxes;
  return <Icon size={size} aria-hidden="true" {...rest} />;
}
