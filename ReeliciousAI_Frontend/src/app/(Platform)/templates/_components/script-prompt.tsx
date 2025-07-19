"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles } from "lucide-react";

enum SourceEnum {
  FILE = "file",
  PROMPT = "prompt",
}

interface IScriptPrompt {
  prompt?: string;
  scriptFile?: File | null;
  scriptSource: string;
  setPrompt: (prompt: string) => void;
  setScriptFile: (file: File) => void;
  setScriptSource: (source: SourceEnum) => void;
}

export default function ScriptPrompt({
  prompt,
  scriptFile,
  scriptSource,
  setPrompt,
  setScriptFile,
  setScriptSource,
}: IScriptPrompt) {
  const handleScriptFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScriptFile(file);
    }
  };

  return (
    <Tabs
      defaultValue={scriptSource}
      onValueChange={(value) =>
        setScriptSource(
          value == SourceEnum.PROMPT ? SourceEnum.PROMPT : SourceEnum.FILE
        )
      }
      className="w-full"
    >
      <TabsList className="w-full">
        <TabsTrigger value="prompt">Prompt</TabsTrigger>
        <TabsTrigger value="file">File</TabsTrigger>
      </TabsList>
      <TabsContent value={SourceEnum.PROMPT}>
        <div className="bg-[#120E1B] border rounded-xs">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-[200px] p-3 rounded-md bg-background/50 backdrop-blur-sm text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            placeholder="Enter your content prompt here..."
          />
          <div className="p-1 flex justify-end items-center">
            <button className="flex p-1">
              Enhance <Sparkles className="ml-2" />
            </button>
          </div>
        </div>
      </TabsContent>
      <TabsContent value={SourceEnum.FILE}>
        <div className="space-y-3">
          <div className="flex items-center justify-center w-full hover:bg-[#1c0f24] transition-colors duration-200">
            <label
              htmlFor="script-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-background/50 hover:bg-background/80"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-muted-foreground"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF or CSV (MAX. 10MB)
                </p>
              </div>
            </label>
            <input
              id="script-upload"
              type="file"
              className="hidden"
              accept=".pdf,.csv"
              onChange={handleScriptFileUpload}
            />
          </div>
          {scriptFile && (
            <div className="text-sm text-muted-foreground">
              Selected file: {scriptFile.name}
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
