"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <>
      <div className="items-center w-full p-5">
        <h1 className="font-sans font-extrabold">Bem-vindo a LC</h1>
        <p className="font-sans">
          faça sua lista de chamada, basta escrever a baixo o nome dos
          integrantes
        </p>
        <div className="flex justify-center p-5 gap-5">
          <Input placeholder="Nome do integrante" />

          <Button>Enviar</Button>
        </div>
        <Input id="picture" type="file" />
      </div>

      <div className="p-5">
        <Button onClick={() => window.print()}>Salvar</Button>
      </div>
    </>
  );
}
