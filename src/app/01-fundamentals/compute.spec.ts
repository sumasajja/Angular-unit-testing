import {compute} from './compute';
describe('compute', ()=>{
it('should return 0 if input is negative', ()=>{

const value=compute(-1);
expect(value).toBe(0);

});

describe('compute', ()=>{
it('should increment the input', ()=>{

const value=compute(1);
expect(value).toBe(2);

});


});