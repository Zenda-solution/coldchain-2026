import { useState } from "react";
import { X } from "lucide-react";

interface CotizarModalProps {
  onClose: () => void;
}

export default function CotizarModal({ onClose }: CotizarModalProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    producto: "",
    mensaje: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hola, me interesa cotizar:\n\nNombre: ${formData.nombre}\nEmail: ${formData.email}\nTeléfono: ${formData.telefono}\nProducto: ${formData.producto}\nMensaje: ${formData.mensaje}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/5491100000000?text=${encoded}`, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-card p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-1 font-heading text-xl font-bold text-foreground">
          Solicitar Cotización
        </h2>
        <p className="mb-5 text-sm text-muted-foreground">
          Completá el formulario y te contactamos por WhatsApp.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="nombre"
            placeholder="Nombre completo"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
            className="rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <select
            name="producto"
            value={formData.producto}
            onChange={handleChange}
            className="rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Seleccionar categoría</option>
            <option value="Agricultura">Agricultura</option>
            <option value="Climatización">Climatización</option>
            <option value="Instrumentos">Instrumentos y Equipos de Medición</option>
            <option value="Logística">Logística y Transporte</option>
            <option value="Termohigrómetros">Termohigrómetros y Termógrafos</option>
          </select>
          <textarea
            name="mensaje"
            placeholder="Mensaje (opcional)"
            value={formData.mensaje}
            onChange={handleChange}
            rows={3}
            className="rounded-lg border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          />
          <button
            type="submit"
            className="rounded-full bg-cta px-6 py-2.5 text-sm font-semibold text-cta-foreground hover:opacity-90 transition-opacity"
          >
            Enviar por WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
