import { useCallback, useEffect, useState } from 'react';

import { Book, Rendition } from 'epubjs';

export function useEpubView(container: HTMLDivElement | null, url: string) {
  const [rendition, setRendition] = useState<Rendition>();
  useEffect(() => {
    if (!container) {
      return;
    }
    const book = new Book(url);
    const temp = book.renderTo(container, {
      flow: 'pagination',
      width: '900',
      height: '600',
    });
    temp.display();

    async function updateRendition() {
      await book.ready;
      setRendition(temp);
    }
    void updateRendition();

    return () => book.destroy();
  }, [container, url]);

  useEffect(() => {
    function keyListener(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') {
        rendition?.prev();
      }
      if (e.key === 'ArrowRight') {
        rendition?.next();
      }
    }
    rendition?.on('keyup', keyListener);
    document.addEventListener('keyup', keyListener, false);
    return () => {
      rendition?.off('keyup', keyListener);
      document.removeEventListener('keyup', keyListener, false);
    };
  }, [rendition]);

  const prev = useCallback(() => {
    return rendition?.prev();
  }, [rendition]);

  const next = useCallback(() => {
    return rendition?.next();
  }, [rendition]);

  return { prev, next };
}
