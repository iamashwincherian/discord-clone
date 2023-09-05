import { useEffect, useState } from "react";

export default function useFixMount() {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return !isMounted;
}
