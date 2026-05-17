"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { defaultPortfolioContent, type PortfolioContent } from "@/lib/portfolio-content";

type PortfolioContextValue = {
  data: PortfolioContent;
  isLoading: boolean;
  refresh: () => Promise<void>;
};

const PortfolioDataContext = createContext<PortfolioContextValue>({
  data: defaultPortfolioContent,
  isLoading: true,
  refresh: async () => {},
});

export function PortfolioDataProvider({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData?: PortfolioContent;
}) {
  const [data, setData] = useState<PortfolioContent>(initialData ?? defaultPortfolioContent);
  const [isLoading, setIsLoading] = useState(!initialData);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/content", { cache: "no-store" });
      const json = (await res.json()) as { content?: PortfolioContent };
      if (json.content) setData(json.content);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!initialData) {
      void refresh();
    }
  }, [initialData, refresh]);

  const value = useMemo(
    () => ({
      data,
      isLoading,
      refresh,
    }),
    [data, isLoading, refresh],
  );

  return <PortfolioDataContext.Provider value={value}>{children}</PortfolioDataContext.Provider>;
}

export function usePortfolioData() {
  return useContext(PortfolioDataContext);
}
