import {
    getSchema,
    loading,
    defaultState
} from './reducers';

describe('loading', () => {
    it('should return loading: true and empty schema', () => {
        expect(loading()).toEqual({ loaded: false, schema: {}});
    });
});

describe('getSchema', () => {
    it('should return store, schema and loaded: true', () => {
        expect(getSchema({ test: 'test' }, { payload: 'schema' })).toEqual({ loaded: true, test: 'test', schema: 'schema' });
    });
});

describe('defaultState', () => {
    it('should be loaded: false', () => {
        expect(defaultState).toEqual({ loaded: false });
    });
});
