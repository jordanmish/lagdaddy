import { useEffect } from 'react';

type StructuredDataProps = {
  id: string;
  data: Record<string, unknown>;
};

const StructuredData = ({ id, data }: StructuredDataProps) => {
  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    let script = document.getElementById(id) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = id;
      document.head.appendChild(script);
    }

    script.text = JSON.stringify(data);

    return () => {
      if (script?.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [data, id]);

  return null;
};

export default StructuredData;
