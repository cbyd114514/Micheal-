/**
 * workshop-store.js — 数字工坊图纸持久化存储与管理模块
 */

const STORAGE_KEY = 'pindou_workshop_patterns';

export class WorkshopStore {
  /**
   * 获取用户上传保存在数字工坊的所有图纸
   * @returns {Array<Object>}
   */
  static getWorkshopPatterns() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.warn('Failed to load workshop patterns from localStorage:', e);
      return [];
    }
  }

  /**
   * 保存新图纸到数字工坊
   * @param {Object} pattern 标准图纸对象
   * @returns {boolean}
   */
  static saveWorkshopPattern(pattern) {
    if (!pattern || !pattern.id || !pattern.matrix) return false;
    try {
      const list = this.getWorkshopPatterns();
      // 检查是否已存在同 ID，存在则更新，否则置顶插入
      const existingIdx = list.findIndex(p => p.id === pattern.id);
      if (existingIdx >= 0) {
        list[existingIdx] = pattern;
      } else {
        list.unshift(pattern);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('workshop-patterns-changed', { detail: { count: list.length } }));
      return true;
    } catch (e) {
      console.error('Failed to save pattern to workshop storage:', e);
      return false;
    }
  }

  /**
   * 从工坊删除图纸
   * @param {string} id 图纸ID
   * @returns {boolean}
   */
  static deleteWorkshopPattern(id) {
    try {
      const list = this.getWorkshopPatterns();
      const filtered = list.filter(p => p.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      window.dispatchEvent(new CustomEvent('workshop-patterns-changed', { detail: { count: filtered.length } }));
      return true;
    } catch (e) {
      console.error('Failed to delete pattern from workshop storage:', e);
      return false;
    }
  }

  /**
   * 联合查询图纸（先查用户工坊，再查官方精选）
   * @param {string} id
   * @param {Array} officialPatterns
   * @returns {Object|null}
   */
  static getPatternById(id, officialPatterns = []) {
    if (!id) return null;
    const userPatterns = this.getWorkshopPatterns();
    const foundUser = userPatterns.find(p => p.id === id);
    if (foundUser) return foundUser;
    return officialPatterns.find(p => p.id === id) || null;
  }

  /**
   * 获取合并后的全部图纸列表
   * 用户工坊图纸高优先级排在前方
   * @param {Array} officialPatterns
   * @returns {Array}
   */
  static getAllCombinedPatterns(officialPatterns = []) {
    const userPatterns = this.getWorkshopPatterns();
    return [...userPatterns, ...officialPatterns];
  }
}
