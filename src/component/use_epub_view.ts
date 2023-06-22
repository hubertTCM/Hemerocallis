import { useCallback, useEffect, useState } from 'react';

import { Book, Rendition } from 'epubjs';

export function useEpubView(container: HTMLDivElement, url: string) {
  const [rendition, setRendition] = useState<Rendition>();
  useEffect(() => {
    const book = new Book(url);
    const temp = book.renderTo(container, {
      flow: 'pagination',
      width: '900',
      height: '600',
    });
    temp.display();
    setRendition(temp);
    return () => book.destroy();
  }, [container, url]);

  const prev = useCallback(() => {
    if (rendition) {
      return rendition.prev();
    }
  }, [rendition]);

  const next = useCallback(() => {
    if (rendition) {
      return rendition.next();
    }
  }, [rendition]);
  return { prev, next };
}
