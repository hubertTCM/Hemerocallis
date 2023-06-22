import React, { useEffect, useRef, useState } from 'react';

import { Book } from 'epubjs';

export type Props = {
  url: string;
};

const EpubViewer: React.FunctionComponent<Props> = ({ url }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const temp = new Book(url);
    const rendition = temp.renderTo(ref.current, {
      flow: 'pagination',
      width: '900',
      height: '600',
    });
    rendition.display();
    setBook(temp);
    return () => temp.destroy();
  }, [url, ref]);
  return <div ref={ref}></div>;
};

export { EpubViewer };
