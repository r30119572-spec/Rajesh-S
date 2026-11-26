import {
  ClipboardCheck,
  Compass,
  Gauge,
  KeyRound,
  Layers,
  Megaphone,
  PenLine,
  Search,
  Share2,
  Target,
} from 'lucide-react';
import { SERVICES_LIST, type ServiceItem } from '../data/portfolioData';
import { TiltCard } from './TiltCard';

function getServiceIcon(key: ServiceItem['iconKey']) {
  switch (key) {
    case 'search':
      return Search;
    case 'share':
      return Share2;
    case 'pen':
      return PenLine;
    case 'gauge':
      return Gauge;
    case 'key':
      return KeyRound;
    case 'compass':
      return Compass;
    case 'target':
      return Target;
    case 'megaphone':
      return Megaphone;
    case 'layers':
      return Layers;
    case 'clipboard':
    default:
      return ClipboardCheck;
  }
}

export function ServicesSection() {
  return (
    <section id="services" className="relative bg-[#080808] py-20 sm:py-24">
      <div className="crimson-hairline mx-auto mb-20 h-px max-w-6xl opacity-40" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div>
          <p className="font-mono text-xs font-medium tracking-wider text-[#FF2525]">
            04. Capabilities
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What I Can Do
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#B8B8B8] sm:text-base">
            Focused digital marketing services built around structured SEO, creative content,
            campaign setup, and consistent brand growth.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES_LIST.map((service) => {
            const Icon = getServiceIcon(service.iconKey);
            return (
              <TiltCard key={service.number} className="p-6" intensity={5}>
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FF2525]/35 bg-[#FF2525]/10 text-[#FF2525]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="font-mono text-xs font-medium text-[#B8B8B8] tabular-nums">
                        {service.number}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-lg font-bold text-white">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#B8B8B8]">
                      {service.description}
                    </p>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
