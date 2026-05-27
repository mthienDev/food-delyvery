/**
 * Mobile viewport frame — constrains UI to 390px (iPhone 14 Pro width).
 * All screens render inside this wrapper for consistent mobile appearance.
 */
export default function MobileFrame({ children }) {
  return (
    <div className="w-full max-w-150 min-h-svh mx-auto bg-white relative shadow-2xl **:no-scrollbar">
      {children}
    </div>
  );
}
