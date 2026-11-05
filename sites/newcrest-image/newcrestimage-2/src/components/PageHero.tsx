type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  image: string;
};

export function PageHero({ eyebrow, title, intro, image }: PageHeroProps) {
  return (
    <section className="relative h-[60vh] min-h-[460px] flex items-end overflow-hidden">
      <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/40 to-navy/10" />
      <div className="container-ni relative pb-16 md:pb-24 text-sand">
        <p className="eyebrow text-gold mb-6">{eyebrow}</p>
        <h1 className="text-5xl md:text-7xl max-w-4xl">{title}</h1>
        {intro && <p className="mt-8 max-w-xl text-sand/85 leading-relaxed text-lg">{intro}</p>}
      </div>
    </section>
  );
}
