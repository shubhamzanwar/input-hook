import {renderHook} from '@testing-library/react-hooks';
import useInput from '../useInput';

describe('the useInput hook', () => {
    beforeAll(() => {
        jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve({
                defaultValue: 'test-default-value'
            })
        }))
    });

    afterEach(() => {
        global.fetch.mockClear();
    });

    it('should make the api call to fetch the default value and set it in the state', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useInput());
        await waitForNextUpdate();
        expect(fetch).toHaveBeenCalled();
        expect(result.current[0]).toEqual('test-default-value');
    })
});