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
    <div className="w-full max-w-2xl mx-auto p-5 space-y-6 min-h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-sans mb-2">Bem-vindo a LC</h1>
        <p className="text-muted-foreground font-sans">
          Faça sua lista de chamada, basta escrever abaixo o nome dos
          integrantes
        </p>
      </div>
      <form onSubmit={handleAdd} className="flex gap-4 items-end">
        <Input
          placeholder="Nome do integrante"
          value={tarefa}
          onChange={(e) => setTarefa(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">Enviar</Button>
      </form>

      <ul className="list-none space-y-2 p-0 overflow-auto max-h-[calc(100vh-300px) ">
        {tarefas.map((t, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-2 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-all"
          >
            <span className="font-medium">{t}</span>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="ml-4 px-3 py-1.5 bg-destructive text-destructive-foreground text-sm font-medium rounded-md hover:bg-destructive/90 transition-colors"
            >
              x
            </button>
          </li>
        ))}
      </ul>

      {preview && (
        <div className="p-6 border rounded-lg">
          <img
            src={preview}
            alt="Preview"
            className="max-w-md max-h-80 mx-auto object-contain rounded"
          />
        </div>
      )}

      <div className="flex flex-col justify-center sm:flex-row gap-4">
        <Input
          id="picture"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <Button
          onClick={() => window.print()}
          variant="outline"
          className="flex-1 sm:flex-none bg-green-600"
        >
          Salvar
        </Button>
      </div>
    </div>
  );
}
