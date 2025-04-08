import { toHaveTotalPrice } from '@/components/Form/utils/customerMatchers';
import '@testing-library/jest-dom'

expect.extend({
 toHaveTotalPrice,
});