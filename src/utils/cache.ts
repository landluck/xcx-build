/**
 * 本地内存缓存
 */

const cache: { [props: string]: null | { data: any; expire: number; start: number } } = {};

interface Cache {
  setValue(key: string, data: any, expire?: number): Cache;
  getValue<T>(key: string, defaultValue?: T): T | null;
  removeValue(key: string): Cache;
}

const Cache: Cache = {
  setValue(key: string, data: any, expire: number = 0): Cache {
    cache[key] = {
      data,
      expire,
      start: new Date().getTime(),
    };

    return this;
  },
  getValue<T>(key: string, defaultValue?: T): T | null {
    const value = cache[key];

    if (!value) {
      return defaultValue || null;
    }

    if (value.expire !== 0) {
      const now = new Date().getTime();

      if (now - value.start > value.expire) {
        cache[key] = null;
        return defaultValue || null;
      }
    }

    return value.data;
  },
  removeValue(key: string): Cache {
    cache[key] = null;
    return this;
  },
};

export default Cache;
