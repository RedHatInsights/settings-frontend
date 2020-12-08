import { getSchema, loading, defaultState, getConfig } from './reducers';

describe('loading', () => {
  it('should return loading: true and empty schema', () => {
    expect(loading()).toEqual({ loaded: false, schema: [] });
  });
});

describe('getConfig', () => {
  it('should return appsConfig loaded', () => {
    expect(getConfig({ test: 'test' }, { payload: 'test' })).toEqual({
      configLoaded: true,
      test: 'test',
      appsConfig: 'test',
    });
  });
});

describe('getSchema', () => {
  it('should return store, schema and loaded: true', () => {
    expect(getSchema({ test: 'test' }, { payload: 'schema' })).toEqual({
      loaded: true,
      test: 'test',
      schema: 'schema',
    });
  });
});

describe('defaultState', () => {
  it('should be loaded: false', () => {
    expect(defaultState).toEqual({ loaded: false, configLoaded: false });
  });
});
