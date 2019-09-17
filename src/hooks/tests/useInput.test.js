import {renderHook} from '@testing-library/react-hooks';
import TestRenderer from 'react-test-renderer';
import useInput from '../useInput';

const {act} = TestRenderer;

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
    });

    it('should update the state when the setValue function is called', async () => {
        const { result, waitForNextUpdate } = renderHook(() => useInput());
        await waitForNextUpdate();
        expect(result.current[0]).toEqual('test-default-value');
        act(() => {
            result.current[1]('test-value-2');
        });
        expect(result.current[0]).toEqual('test-value-2');
    })
});