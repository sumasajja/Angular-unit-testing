import { getCurrencies } from './getCurrencies';
describe('getCurrencies',()=>{
it('should return the supported currencies', ()=>{
const results= getCurrencies();
expect(results).toContain('USD');

});

});