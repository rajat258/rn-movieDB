interface ScaleType {
  (size: number, factor?: number): number;
}
interface GlobalMetricsType {
  isAndroid: boolean;
  isIos: boolean;
}

export type {ScaleType, GlobalMetricsType};
