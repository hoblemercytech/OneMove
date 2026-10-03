import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQ({ items, title = 'Frequently asked questions', id = 'faq' }) {
  const [open, setOpen] = useState(0);
  if (!items || !items.length) return null;
  return (
    <section className="section" aria-labelledby={`${id}-title`}>
      <div className="container container--narrow">
        <h2 id={`${id}-title`} className="h2">{title}</h2>
        <div className="faq">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div className="faq__item" key={item.q}>
                <h3 className="faq__q">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${id}-panel-${i}`}
                    id={`${id}-btn-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{item.q}</span>
                    <ChevronDown className={`faq__chev${isOpen ? ' is-open' : ''}`} size={20} aria-hidden="true" />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`${id}-panel-${i}`}
                      role="region"
                      aria-labelledby={`${id}-btn-${i}`}
                      className="faq__a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
