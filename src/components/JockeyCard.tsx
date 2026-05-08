import { imageUrlFor, type JockeyProduct } from '../data/jockey';

const CHIP_STYLES: Record<string, string> = {
  Cotton: 'bg-stone-100 text-stone-700 ring-1 ring-stone-200',
  Microfiber: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200',
  Modal: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  Mesh: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  Bamboo: 'bg-lime-50 text-lime-800 ring-1 ring-lime-200',
  Spandex: 'bg-violet-50 text-violet-700 ring-1 ring-violet-200',
  Polyester: 'bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200',
  Lycra: 'bg-orange-50 text-orange-700 ring-1 ring-orange-200',
  Cooling: 'bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200',
  Activewear: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
  Performance: 'bg-amber-50 text-amber-800 ring-1 ring-amber-200',
  EverActive: 'bg-amber-50 text-amber-800 ring-1 ring-amber-200',
  'StayCool+': 'bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200',
  Heatwick: 'bg-red-50 text-red-700 ring-1 ring-red-200',
  'VentraCool Air': 'bg-sky-50 text-sky-700 ring-1 ring-sky-200',
  Seamfree: 'bg-pink-50 text-pink-700 ring-1 ring-pink-200',
  Sport: 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200',
  Sleep: 'bg-purple-50 text-purple-700 ring-1 ring-purple-200',
  Classic: 'bg-stone-100 text-stone-700 ring-1 ring-stone-200',
};

const DEFAULT_CHIP = 'bg-slate-100 text-slate-700 ring-1 ring-slate-200';

function chipClass(label: string): string {
  return CHIP_STYLES[label] ?? DEFAULT_CHIP;
}

interface Props {
  product: JockeyProduct;
}

export function JockeyCard({ product }: Props) {
  return (
    <article className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all overflow-hidden h-full flex flex-col">
      <div className="aspect-square overflow-hidden bg-slate-50">
        <img
          src={imageUrlFor(product)}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-medium text-slate-900 text-sm leading-snug line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        <p className="mt-2 text-base font-semibold text-slate-900 tabular-nums">
          {product.price}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.chips.map((c) => (
            <span
              key={c}
              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide ${chipClass(c)}`}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
