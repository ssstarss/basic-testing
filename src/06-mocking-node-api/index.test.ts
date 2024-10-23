// Uncomment the code below and write your tests
import path from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs, { promises } from 'fs';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockedSetTimeout = jest.spyOn(global, 'setTimeout');
    const mockedCallback = jest.fn();
    const timer = 1000;
    doStuffByTimeout(mockedCallback, timer);
    expect(mockedSetTimeout).toHaveBeenCalledWith(mockedCallback, timer);
    jest.advanceTimersByTime(timer);
    expect(mockedCallback).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const mockedCallback = jest.fn();
    const timer = 1000;
    doStuffByTimeout(mockedCallback, timer);
    jest.advanceTimersByTime(timer);
    expect(mockedCallback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockedSetInterval = jest.spyOn(global, 'setInterval');
    const timer = 1000;
    const mockedCallback = jest.fn();
    doStuffByInterval(mockedCallback, timer);
    expect(mockedSetInterval).toHaveBeenCalledWith(mockedCallback, timer);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const timer = 1000;
    const mockedCallback = jest.fn();
    doStuffByInterval(mockedCallback, timer);
    jest.advanceTimersByTime(10000);
    expect(mockedCallback).toHaveBeenCalledTimes(10);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const filePath = 'test path';
    const mockedJoin = jest.spyOn(path, 'join');
    await readFileAsynchronously(filePath);
    expect(mockedJoin).toHaveBeenCalledWith(__dirname, filePath);
  });

  test('should return null if file does not exist', async () => {
    const mockedExistsSync = jest.spyOn(fs, 'existsSync');
    mockedExistsSync.mockReturnValue(false);
    const result = await readFileAsynchronously('test path');
    expect(mockedExistsSync).toHaveBeenCalledTimes(1);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const mockedContent = 'Some file content';
    const mockedExistsSync = jest.spyOn(fs, 'existsSync');
    const mockedReadFile = jest.spyOn(promises, 'readFile');
    mockedExistsSync.mockReturnValue(true);
    mockedReadFile.mockResolvedValue(Buffer.from(mockedContent));
    const result = await readFileAsynchronously('test.txt');
    expect(mockedExistsSync).toHaveBeenCalledTimes(1);
    expect(mockedReadFile).toHaveBeenCalledTimes(1);
    expect(result).toBe(mockedContent);
  });
});
