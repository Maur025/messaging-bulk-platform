import { Hash, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useSocketStore } from "../../common/context/useSocketStore";
import { Input } from "../../components/ui/input";

import QRCode from "react-qr-code";
import { fetchApi } from "../../common/utils/fetch-api";
import { useToolbarContextStore } from "./context/useToolbarContextStore";

const AuthWhatsapp = () => {
  const { socket } = useSocketStore();
  const { setContext, clearContext } = useToolbarContextStore();

  const [qrCode, setQrCode] = useState<string>("");

  const whatsappAuthQRHandler = (payload: any) => {
    console.log(payload);
    setQrCode(payload.qr);
  };

  const onRequestQR = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const dataInForm = Object.fromEntries(formData.entries());

    if (!dataInForm.channelName || !dataInForm.phoneNumber) {
      console.error("Channel name and phone number are required");

      return;
    }

    await fetchApi({
      resource: `whatsapp/auth`,
      method: "POST",
      body: { channelName: dataInForm.channelName, phoneNumber: dataInForm.phoneNumber },
    });
  };

  useEffect(() => {
    setContext({
      title: "",
      subTitle: "",
      showSecondaryButton: false,
      showMainButton: false,
    });

    return () => {
      clearContext();
    };
  }, [setContext, clearContext]);

  useEffect(() => {
    if (!socket) return;

    socket.on("whatsapp-auth-qr", whatsappAuthQRHandler);

    return () => {
      socket.off("whatsapp-auth-qr", whatsappAuthQRHandler);
    };
  }, [socket]);

  return (
    <div className="mx-auto grid w-full max-w-360 flex-1 grid-cols-1 gap-0 xl:grid-cols-[minmax(0,1fr)_380px]">
      <section
        className="min-w-0 border-b border-border xl:border-b-0 xl:border-r"
        aria-label="compose-heading"
      >
        <div className="border-b border-border px-5 py-6 sm:px-8">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-[0.16em] text-primary">
                Paso 01 / 02
              </p>

              <h1 className="text-2xl font-semibold tracking-tight">Registra el canal</h1>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-primary"></span>

              <span className="size-1.5 rounded-full bg-muted"></span>
            </div>
          </div>

          <p className="max-w-lg text-sm leading-6 text-muted-foreground">
            Registra el canal y solicita tu código QR para iniciar sesión en Whatsapp. Una vez que
            escanees el código QR, podrás enviar mensajes a través de la plataforma.
          </p>
        </div>

        <div className="flex flex-col gap-7 px-5 py-6 sm:px-8">
          <form onSubmit={onRequestQR}>
            <fieldset>
              <legend className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <Hash className="size-3.5" />
                Canal Whatsapp
              </legend>

              <div className="flex gap-3 justify-between">
                <Input
                  type="number"
                  placeholder="Numero de teléfono"
                  className="flex-1"
                  name="phoneNumber"
                />

                <Input
                  type="text"
                  placeholder="Nombre del canal"
                  className="flex-1"
                  name="channelName"
                />

                <button
                  type="submit"
                  className="rounded-md py-1 px-3  text-primary-foreground bg-primary hover:bg-primary/70 cursor-pointer flex items-center gap-2 text-sm"
                  aria-label="solicitar qr"
                >
                  <Send className="size-3" />
                  Solicitar QR
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </section>

      <section className="flex justify-center">
        <div className="m-3 p-3">
          {qrCode && <QRCode size={350} value={qrCode} level="M" className="bg-white p-3" />}
        </div>
      </section>
    </div>
  );
};

export default AuthWhatsapp;
