"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useCallback } from "react";

export default function Home() {
  const [preview, setPreview] = useState<string | null>(null);
  const [tarefa, setTarefa] = useState("");
  const [tarefas, setTarefas] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleAdd = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (tarefa.trim()) {
        setTarefas((prev) => [...prev, tarefa]);
        setTarefa("");
      }
    },
    [tarefa],
  );

  const handleRemove = useCallback((index: number) => {
    setTarefas((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <div className="min-h-screen w-full px-4 py-6 flex justify-center">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold font-sans mb-2">
            Bem-vindo a LC
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground font-sans">
            Faça sua lista de chamada, basta escrever abaixo o nome dos
            integrantes
          </p>
        </div>

        {/* FORM - coluna no mobile, linha no desktop */}
        <form
          onSubmit={handleAdd}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-end"
        >
          <Input
            placeholder="Nome do integrante"
            value={tarefa}
            onChange={(e) => setTarefa(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" className="w-full sm:w-auto">
            Enviar
          </Button>
        </form>

        {/* LISTA */}
        <ul className="list-none space-y-2 p-0 overflow-auto max-h-[50vh]">
          {tarefas.map((t, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-all text-sm sm:text-base"
            >
              <span className="font-medium break-words pr-2">{t}</span>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="ml-4 px-3 py-1.5 bg-destructive text-destructive-foreground text-xs sm:text-sm font-medium rounded-md hover:bg-destructive/90 transition-colors"
              >
                x
              </button>
            </li>
          ))}
        </ul>

        {/* PREVIEW DA IMAGEM */}
        {preview && (
          <div className="p-4 sm:p-6 border rounded-lg">
            <img
              src={preview}
              alt="Preview"
              className="w-full max-h-80 object-contain rounded"
            />
          </div>
        )}

        {/* INPUT DE ARQUIVO + BOTÃO */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Input
            id="picture"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
          <Button
            onClick={() => window.print()}
            variant="outline"
            className="w-full sm:w-auto bg-green-600 text-white hover:bg-green-700"
          >
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
}
