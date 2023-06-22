import React, { useEffect, useRef, useState } from 'react';

import { useEpubView } from './use_epub_view';

export type Props = {
  url: string;
};

const EpubViewer: React.FunctionComponent<Props> = ({ url }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref.current) {
      setContainer(ref.current);
    }
  }, [ref]);

  useEpubView(container, url);
  return <div ref={ref}></div>;
};

export { EpubViewer };
