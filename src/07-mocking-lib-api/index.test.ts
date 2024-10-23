// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';
jest.mock('axios', () => ({
  create: jest.fn(),
}));
describe('throttledGetDataFromApi', () => {
  let mockGet: jest.Mock;
  beforeEach(() => {
    jest.useFakeTimers();
    mockGet = jest.fn().mockResolvedValue({ data: 'response' });
    (axios.create as jest.Mock).mockReturnValue({
      get: mockGet,
    });
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });
  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/test');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi('/test');
    jest.advanceTimersByTime(5000);
    expect(mockGet).toHaveBeenCalledWith('/test');
  });

  test('should return response data', async () => {
    const data = await throttledGetDataFromApi('/test');
    expect(data).toBe('response');
  });
});
