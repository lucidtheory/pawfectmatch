import {
    TypedUseSelectorHook,
    useSelector,
    useDispatch,
} from 'react-redux';
import { RootState, AppDispatch } from '../index';


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
