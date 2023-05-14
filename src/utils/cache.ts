enum CacheType {
  Local,
  Secction
}

// 对本地存储的进行封装
class Cached {
  storage: Storage

  constructor(type: CacheType) {
    this.storage = type === CacheType.Local ? localStorage : sessionStorage
  }

  // 保存数据到本地存储
  setCache(key: string, value: any) {
    if (value) {
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  // 从本地存储拿到数据
  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }

  // 删除本地存储数据
  removeCache(key: string) {
    this.storage.removeItem(key)
  }

  // 清空本地存储数据
  clearCache() {
    this.storage.clear()
  }
}

const localCached = new Cached(CacheType.Local)
const sessionCached = new Cached(CacheType.Secction)

export { localCached, sessionCached }
