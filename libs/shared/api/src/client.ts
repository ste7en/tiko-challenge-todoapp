import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Method, paths, type ApiPath } from './paths';
import { CreateTodo, Register, Todo, TodoResponse, TokenObtainPair, TokenRefresh, TokenResponse, TokenVerify, User } from './types';

class APIClient {
  private static instance: APIClient;
  private baseUrl: string;
  private authorization: string | null = null;
  private tokenRefresher: (() => Promise<void>) | null = null;

  private constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public static getInstance(baseUrl: string): APIClient {
    if (!APIClient.instance) {
      APIClient.instance = new APIClient(baseUrl);
    }
    return APIClient.instance;
  }

  public setAuthorization(token: string | null): void {
    this.authorization = token;
    console.debug(`[ debug ] Authorization: ${token ? 'Bearer [redacted]' : 'null'}`);
  }

  private getAuthorization(): string | null {
    return this.authorization;
  }

  private getAuthorizationHeader(): Record<string, string> {
    const token = this.getAuthorization();
    if (!token) return {};
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  public setTokenRefresher(refresher: (() => Promise<void>) | null): void {
    this.tokenRefresher = refresher;
  }

  private urlBuilder(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  private async request<T = unknown>(method: Method, endpoint: ApiPath, data?: unknown, opts: AxiosRequestConfig = {}): Promise<T> {
    if (!endpoint.methods.includes(method)) {
      throw new Error(`${method} method not allowed for ${endpoint.path}`);
    }
    const url = this.urlBuilder(endpoint.path);
    const headers = {
      'Content-Type': 'application/json',
      ...opts.headers,
    };
    const config: AxiosRequestConfig = {
      method,
      url,
      headers,
      data,
      ...opts,
    };
    try {
      console.debug(`[ debug ] ${method} ${url}`)
      const response: AxiosResponse<T> = await axios(config);
      console.debug(`[ debug ] ${method} ${url} - ${response.status}`);
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error(`[ error ] ${method} ${url} - ${e.response?.status} - ${e.response?.data}`)
        if (e.response?.status === 401 && this.tokenRefresher) {
          console.error(`[ error ] ${e.config?.method} ${e.config?.url} - ${e.response.status} - refreshing token ...`);
          await this.tokenRefresher();
          console.debug('[ debug ] token refreshed, retrying ...')
          opts.headers = {...opts.headers, ...this.getAuthorizationHeader()}
          return await this.request<T>(method, endpoint, data, opts);
        }
      }
      throw e;
    }
  }

  public async get<T = unknown>(endpoint: ApiPath, opts: AxiosRequestConfig = {}): Promise<T> {
    return this.request<T>('GET', endpoint, undefined, opts);
  }

  public async post<T = unknown, U = unknown>(endpoint: ApiPath, body: U, opts: AxiosRequestConfig = {}): Promise<T> {
    return this.request<T>('POST', endpoint, body, opts);
  }

  public async put<T = unknown, U = unknown>(endpoint: ApiPath, body: U, opts: AxiosRequestConfig = {}): Promise<T> {
    return this.request<T>('PUT', endpoint, body, opts);
  }

  public async delete(endpoint: ApiPath, opts: AxiosRequestConfig = {}): Promise<void> {
    await this.request<void>('DELETE', endpoint, undefined, opts);
  }

  public async login(credentials: TokenObtainPair): Promise<TokenResponse> {
    return await this.post<TokenResponse, TokenObtainPair>(paths.login, credentials);
  }

  public async register(data: Register): Promise<User> {
    return await this.post<User, Register>(paths.register, data);
  }

  public async listTodos(): Promise<TodoResponse[]> {
    return await this.get<TodoResponse[]>(paths.todos, { headers: this.getAuthorizationHeader() });
  }

  public async createTodo(todo: CreateTodo): Promise<TodoResponse> {
    return await this.post<TodoResponse, CreateTodo>(paths.todos, todo, { headers: this.getAuthorizationHeader() });
  }

  public async getTodo(id: number): Promise<TodoResponse> {
    const endpoint: ApiPath = {
      ...paths.todo,
      path: paths.todo.path.replace(':id', id.toString()) as `/${string}`,
    }
    return await this.get<TodoResponse>(endpoint, { headers: this.getAuthorizationHeader() });
  }

  public async updateTodo(id: number, data: Omit<Todo, 'id'>): Promise<void> {
    const endpoint: ApiPath = {
      ...paths.todo,
      path: paths.todo.path.replace(':id', id.toString()) as `/${string}`,
    }
    await this.put<void>(endpoint, data, { headers: this.getAuthorizationHeader() });
  }

  public async deleteTodo(id: number): Promise<void> {
    const endpoint: ApiPath = {
      ...paths.todo,
      path: paths.todo.path.replace(':id', id.toString()) as `/${string}`,
    }
    await this.delete(endpoint, { headers: this.getAuthorizationHeader() });
  }

  public async refreshToken(refresh: string): Promise<TokenResponse> {
    return await this.post<TokenResponse, TokenRefresh>(paths.tokenRefresh, { refresh });
  }

  public async verifySession(token: string): Promise<void> {
    return await this.post<void, TokenVerify>(paths.tokenVerify, { token });
  }
}

export default APIClient;
