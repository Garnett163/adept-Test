import { ReactNode, HTMLProps } from 'react';
interface InfiniteScrollProps extends HTMLProps<HTMLDivElement> {
  onScrollEnd: () => void;
  children: ReactNode;
}

function InfiniteScroll({ children, onScrollEnd }: InfiniteScrollProps) {
  function handleScroll(evt: React.UIEvent<HTMLDivElement>) {
    const { scrollTop, clientHeight, scrollHeight } = evt.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      onScrollEnd();
    }
  }

  return (
    <div style={{ overflowY: 'auto', maxHeight: '400px' }} onScroll={handleScroll}>
      {children}
    </div>
  );
}

export default InfiniteScroll;
