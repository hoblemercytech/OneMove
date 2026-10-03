import { useEffect } from 'react';
import { applyHead } from '../seo/applyHead.js';

export default function SEO({ title, description, canonical, ogImage, ogTitle, ogDescription, schema }) {
  useEffect(() => {
    applyHead({ title, description, canonical, ogImage, ogTitle, ogDescription, schema });
  }, [title, description, canonical, ogImage, ogTitle, ogDescription, schema]);
  return null;
}
