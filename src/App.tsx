import {
  Bold,
  Hash,
  ImagePlus,
  Info,
  Link2,
  MessageCircle,
  MoreHorizontal,
  Paperclip,
  Plus,
  Search,
  Send,
  Settings2,
  Users,
  Video,
  X,
} from "lucide-react";
import { useState } from "react";
import "./App.css";

const recipients = [
  {
    initials: "MM",
    name: "Mauro Moya",
    phone: "59169775083",
    country: "BO",
    color: "bg-primary", // bg-accent - bg-secondary - bg-muted
  },
];

function App() {
  const [channelTypeSelected, setChannelTypeSelected] = useState("WhatsApp");

  const [message, setMessage] = useState<string>("");

  return (
    <>
      <div className="mx-auto grid w-full max-w-360 flex-1 grid-cols-1 gap-0 xl:grid-cols-[minmax(0,1fr)_380px]">
        <section
          className="min-w-0 border-b border-border xl:border-b-0 xl:border-r"
          aria-label="compose-heading"
        >
          <div className="border-b border-border px-5 py-6 sm:px-8">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-[0.16em] text-primary">
                  Paso 01 / 03
                </p>

                <h1 className="text-2xl font-semibold tracking-tight">Construye tu mensaje</h1>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-primary"></span>

                <span className="size-1.5 rounded-full bg-muted"></span>

                <span className="size-1.5 rounded-full bg-muted"></span>
              </div>
            </div>

            <p className="max-w-lg text-sm leading-6 text-muted-foreground">
              Crea tu mensaje, elige el canal, agrega contenido y define quien lo recibirá
            </p>
          </div>

          <div className="flex flex-col gap-7 px-5 py-6 sm:px-8">
            <fieldset>
              <legend className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <Hash className="size-3.5" />
                Canal de envío
              </legend>

              <div className="flex gap-2">
                {["WhatsApp"].map((channelType) => (
                  <button
                    key={channelType}
                    type="button"
                    className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm transition-colors ${channelTypeSelected === channelType ? "border-primary bg-primary/10 font-medium text-primary" : "border-border text-muted-foreground hover:bg-muted"}`}
                    onClick={() => setChannelTypeSelected(channelType)}
                  >
                    <span
                      className={`size-2 rounded-full ${channelType === "WhatsApp" ? "bg-primary" : "bg-secondary"}`}
                    />
                    {channelType}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Audience */}
            <section aria-labelledby="audience-heading">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  <Users className="size-3.5" />
                  Audiencia
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] tracking-normal text-foreground">
                    0 contactos
                  </span>
                </h2>

                <button
                  type="button"
                  className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  <Plus className="size-3.5" />
                  Agregar
                </button>
              </div>
              {/* Recipients list */}
              <div className="rounded-xl border border-border">
                <div className="flex items-center gap-2 border-b border-border px-3 py-2">
                  <Search className="size-4 text-muted-foreground" />

                  <input
                    type="text"
                    aria-label="Buscar contactos"
                    placeholder="Buscar por nombre o número"
                    className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />

                  <button
                    className="rounded-md p-1 text-muted-foreground hover:bg-muted"
                    aria-label="Filtrar contactos"
                  >
                    <Settings2 className="size-3.5" />
                  </button>
                </div>

                <ul className="divide-y divide-border">
                  {recipients.map((person) => (
                    <li key={person.phone} className="flex items-center gap-3 px-3 py-3">
                      <div
                        className={`flex size-8 items-center justify-center rounded-full text-[10px] font-semibold ${person.color} text-primary-foreground`}
                      >
                        {person.initials}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{person.name}</p>

                        <p className="text-xs text-muted-foreground">{person.phone}</p>
                      </div>

                      <span className="rounded bg-muted px-1.5 py-1 font-mono text-[10px] text-muted-foreground">
                        + {person.country === "BO" ? "591" : "1"}
                      </span>

                      <button
                        type="button"
                        className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                        aria-label={`Quitar a ${person.phone}`}
                      >
                        <X className="size-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 border-t border-border py-2.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
                >
                  <Plus className="size-3.5" />
                  Añadir número manualmente
                </button>
              </div>
              <p className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <Info className="size-3" />
                El código de país se detecta automáticamente por contacto.
              </p>
            </section>

            {/* Message */}
            <section aria-labelledby="message-heading">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  <MessageCircle className="size-3.5" />
                  Contenido
                </h2>
                <span className="font-mono text-[11px] text-muted-foreground"></span>
                {message.length} / 1,024
              </div>

              <div className="overflow-hidden rounded-xl border border-border focus-within:border-primary/60">
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Escribe tu mensaje aquí..."
                  className="min-h-32 w-full resize-none bg-transparent p-4 text-sm leading-6 outline-none placeholder:text-muted-foreground"
                />
                <div className="flex items-center justify-between border-t border-border bg-muted/30 px-3 py-2">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
                      aria-label="Adjuntar imagen"
                    >
                      <ImagePlus className="size-4" />
                    </button>

                    <button
                      type="button"
                      className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
                      aria-label="Adjuntar video"
                    >
                      <Video className="size-4" />
                    </button>

                    <button
                      type="button"
                      className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
                      aria-label="Adjuntar archivo"
                    >
                      <Paperclip className="size-4" />
                    </button>

                    <span className="ml-2 hidden text-[11px] text-muted-foreground sm:inline">
                      JPG, PNG, MP4 hasta 16 MB
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
                      aria-label="Formato de texto"
                    >
                      <Bold className="size-4" />
                    </button>

                    <button
                      type="button"
                      className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
                      aria-label="Insertar enlace"
                    >
                      <Link2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* {sent && (
                    <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-xs text-primary">
                      <ShieldCheck className="size-4" /> Mensaje listo para revisión.
                    </div>
                  )} */}
          </div>
        </section>

        <aside className="flex min-h-140 flex-col bg-muted/20" aria-labelledby="preview-heading">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 id="preview-heading" className="text-sm font-semibold">
                Vista previa
              </h2>
              <p className="text-xs text-muted-foreground">Así verá tu audiencia el mensaje</p>
            </div>
            <button
              className="rounded-md p-2 text-muted-foreground hover:bg-muted"
              aria-label="Más opciones"
            >
              <MoreHorizontal className="size-4" />
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center p-6">
            <div className="w-full max-w-72.5 overflow-hidden rounded-[22px] border border-border bg-background shadow-2xl">
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Users className="size-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold">Audiencia seleccionada</p>
                  <p className="text-[10px] text-muted-foreground">4 destinatarios</p>
                </div>
                <span className="size-2 rounded-full bg-primary" />
              </div>
              <div className="flex min-h-70 flex-col justify-end gap-3 bg-muted/20 p-4">
                <div className="self-center rounded bg-muted px-2 py-1 text-[9px] text-muted-foreground">
                  HOY, 10:42
                </div>
                <div className="max-w-[88%] self-end rounded-2xl rounded-br-sm bg-primary px-3 py-2.5 text-xs leading-5 text-primary-foreground">
                  <p>{message || "Hola equipo, tenemos novedades para ustedes."}</p>
                  <div className="mt-1 text-right text-[9px] opacity-70">10:42 ✓✓</div>
                </div>
                <div className="max-w-[82%] self-start rounded-2xl rounded-bl-sm border border-border bg-card px-3 py-2.5 text-xs leading-5">
                  <p className="text-muted-foreground">
                    La vista previa se actualiza mientras escribes.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 border-t border-border p-2.5">
                <div className="flex-1 rounded-full bg-muted px-3 py-2 text-[10px] text-muted-foreground">
                  Escribe un mensaje...
                </div>
                <div className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Send className="size-3" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-border p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-medium">Resumen de envío</span>
              <button className="text-[11px] text-primary hover:underline">Editar</button>
            </div>
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Canal</span>
                <span className="font-medium">{channelTypeSelected}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Destinatarios</span>
                <span className="font-medium">4 contactos</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Tipo</span>
                <span className="font-medium">Difusión</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default App;
