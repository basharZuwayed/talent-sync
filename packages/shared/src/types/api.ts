export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  timestamp: string;
}

export interface SystemHealth {
  status: 'ok' | 'degraded' | 'down';
  service: string;
  version: string;
  uptimeSeconds: number;
  environment: string;
  timestamp: string;
}
