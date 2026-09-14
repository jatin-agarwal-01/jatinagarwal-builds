import { Award, ExternalLink } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

type CertificationCardProps = {
  title: string;
  issuer: string;
  file: string;
  featured?: boolean;
};

export default function CertificationCard({ title, issuer, file, featured = false }: CertificationCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.a
      href={file}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={reduce ? undefined : { y: -6 }}
      className={`group flex h-full flex-col justify-between rounded-2xl border p-6 transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
        featured
          ? 'border-emerald-300/35 bg-[radial-gradient(circle_at_top_right,rgba(110,231,183,0.16),transparent_34%),rgba(255,255,255,0.05)] md:col-span-2'
          : 'border-white/10 bg-white/[0.035] hover:border-white/25'
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-black/25 text-emerald-200">
            <Award className="h-6 w-6" />
          </div>
          <ExternalLink className="h-4 w-4 text-white/30 transition duration-300 group-hover:text-white" />
        </div>
        <h3 className={`${featured ? 'mt-8 text-3xl md:text-4xl' : 'mt-6 text-xl'} font-bold leading-tight text-[#f5f5f5]`}>
          {title}
        </h3>
      </div>
      <p className="mt-5 text-sm text-[#a5a5a5]">{issuer}</p>
    </motion.a>
  );
}
