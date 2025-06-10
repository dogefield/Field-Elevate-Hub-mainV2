export class APIClient {
  baseURL: string;

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080') {
    this.baseURL = baseURL;
  }

  private getHeaders() {
    return {
      'Content-Type': 'application/json'
    } as Record<string, string>;
  }

  async callMCPHub(method: string, params: any = {}) {
    try {
      const response = await fetch(`${this.baseURL}/api/mcp/${method}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(params),
      });

      if (response.status === 404) {
        return {
          error: 'not_implemented',
          message: 'This feature is coming soon'
        };
      }

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    } catch (error) {
      console.error(`API call failed for ${method}:`, error);
      return {
        error: 'connection_failed',
        message: 'Unable to connect to backend service'
      };
    }
  }
}

export const api = new APIClient();
