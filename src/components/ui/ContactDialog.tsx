"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X, Mail, Phone } from "lucide-react";
import { t, getObj, type Locale } from "@/lib/i18n";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale: Locale;
  dict: Record<string, unknown>;
}

export default function ContactDialog({
  open,
  onOpenChange,
  locale,
  dict,
}: ContactDialogProps) {
  const footer = getObj(dict, "footer");
  const email = t(footer, "contactMail");
  const phone = t(footer, "contactPhone");

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-in fade-in-0 duration-200" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200 focus:outline-none">
          <div className="flex items-center justify-between mb-5">
            <Dialog.Title className="text-lg font-semibold text-foreground">
              {t(footer, "contact")}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                className="rounded-lg p-1.5 hover:bg-muted transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </Dialog.Close>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            {t(dict, "contactDesc")}
          </p>

          <div className="flex flex-col gap-3 mb-6">
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 rounded-xl border border-border/50 px-4 py-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/5">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">
                {email}
              </span>
            </a>
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-3 rounded-xl border border-border/50 px-4 py-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/5">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">
                {phone}
              </span>
            </a>
          </div>

          <div className="rounded-xl overflow-hidden border border-border/50">
            <iframe
              title={locale === "mn" ? "Байршил" : "Location"}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2674.0612090546742!2d106.92264929999999!3d47.9158531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d969247924be0d7%3A0x8ac1e053237462f2!2sMongolian%20National%20University%20of%20Medical%20Sciences!5e0!3m2!1sen!2smn!4v1773157437295!5m2!1sen!2smn"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
