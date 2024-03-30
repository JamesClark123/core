const consoleErrorSpy = jest.spyOn(console, 'error');

export const mockConsoleError = () => consoleErrorSpy.mockImplementation();

export const restoreConsoleError = () => consoleErrorSpy.mockRestore();

afterEach(() => {
  restoreConsoleError();
});

global.mockConsoleError = mockConsoleError;
global.restoreConsoleError = restoreConsoleError;
