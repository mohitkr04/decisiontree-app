import { Toast } from './Toast';

export function Toaster() {
  return (
    <div className="fixed top-0 right-0 p-4 w-full md:max-w-[420px] z-50 flex flex-col gap-2">
      <Toast />
    </div>
  );
} 