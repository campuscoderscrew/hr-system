import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { cn } from "~/utils";

type ConfirmDeleteModalProps = {
  open: boolean;
  title: string;
  description: ReactNode;
  confirmWord?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

// Outer shell: the caller owns `open`. When it is false we render nothing,
// which unmounts the dialog below and throws away its typed text.
export default function ConfirmDeleteModal({
  open,
  ...dialogProps
}: ConfirmDeleteModalProps) {
  if (!open) return null;
  return <ConfirmDeleteDialog {...dialogProps} />;
}

// Inner dialog: only exists while open, so every open starts with fresh state.
function ConfirmDeleteDialog({
  title,
  description,
  confirmWord = "DELETE",
  onConfirm,
  onCancel,
}: Omit<ConfirmDeleteModalProps, "open">) {
  const [typed, setTyped] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const inputId = useId();

  // Exact match, case-sensitive; only surrounding whitespace is ignored.
  const matches = typed.trim() === confirmWord;

  useEffect(() => {
    const dialog = dialogRef.current;
    // The guard keeps React StrictMode's double-run of effects from
    // calling showModal() on a dialog that is already open.
    if (dialog && !dialog.open) dialog.showModal();
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (matches) onConfirm();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      // Escape: stop the browser closing the dialog itself and let the
      // caller decide, so `open` stays the single source of truth.
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
      // Backdrop: clicks on the ::backdrop target the <dialog> element itself.
      // Clicks inside the card hit a child, so they are ignored here.
      onClick={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
      className="m-auto w-full max-w-md rounded-3xl bg-white p-0 shadow-xl backdrop:bg-slate-900/50"
    >
      <form onSubmit={handleSubmit} className="space-y-6 p-8">
        <div className="space-y-2">
          <h2 id={titleId} className="text-2xl font-semibold text-slate-900">
            {title}
          </h2>
          <div className="text-sm text-slate-600">{description}</div>
        </div>

        <div>
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-slate-700"
          >
            Type <span className="font-mono font-semibold">{confirmWord}</span>{" "}
            to confirm
          </label>
          <input
            ref={inputRef}
            id={inputId}
            type="text"
            value={typed}
            onChange={(event) => setTyped(event.target.value)}
            autoComplete="off"
            spellCheck={false}
            className="mt-2 block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!matches}
            className={cn(
              "rounded-2xl px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-red-300",
              matches
                ? "bg-red-600 hover:bg-red-700"
                : "cursor-not-allowed bg-red-300",
            )}
          >
            Delete
          </button>
        </div>
      </form>
    </dialog>
  );
}