import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function resolveRefs(json) {
  const idMap = new Map();
  const queue = [];

  // Collect objects with $id and add them to a Map
  function collectIds(obj) {
    queue.push(obj);
    while (queue.length > 0) {
      const current = queue.shift();
      if (typeof current === "object" && current !== null) {
        if (current.$id) idMap.set(current.$id, current);
        Object.values(current).forEach((value) => {
          if (typeof value === "object" && value !== null) {
            queue.push(value);
          }
        });
      }
    }
  }

  // Replace $ref with actual objects using a queue to avoid recursion
  function replaceRefs(obj) {
    const refQueue = [{ parent: null, key: null, value: obj }];

    while (refQueue.length > 0) {
      const { parent, key, value } = refQueue.shift();

      if (Array.isArray(value)) {
        value.forEach((item, index) =>
          refQueue.push({ parent: value, key: index, value: item })
        );
      } else if (typeof value === "object" && value !== null) {
        if (value.$ref) {
          const resolved = idMap.get(value.$ref);
          if (!resolved)
            throw new Error(`Reference with $id=${value.$ref} not found`);
          if (parent) parent[key] = resolved; // Replace the $ref
        } else {
          Object.entries(value).forEach(([childKey, childValue]) => {
            refQueue.push({ parent: value, key: childKey, value: childValue });
          });
        }
      }
    }
    return obj;
  }

  collectIds(json); // Collect all $id references
  return replaceRefs(json); // Resolve all $ref references iteratively
}
