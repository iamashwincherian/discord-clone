import useFixMount from "./useFixMount";

export default function useOrigin() {
  const isNotMounted = useFixMount();
  if (isNotMounted) return "";

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  return origin;
}
