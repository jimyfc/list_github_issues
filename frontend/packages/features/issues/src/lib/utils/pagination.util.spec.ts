import { parseLinkHeader } from './pagination.util';

describe('parseLinkHeader', () => {
  it('debería retornar false si no hay header', () => {
    const header = '';
    
    const result = parseLinkHeader(header);
    
    expect(result).toBeFalsy();
  });

  it('debería retornar true si no hay link "last"', () => {
    const header = '<https://api.github.com/repos/user/repo/issues?page=2>; rel="next"';
    
    const result = parseLinkHeader(header);
    
    expect(result).toBeTruthy();
  });

  it('debería retornar false si hay link "last"', () => {
    const header = '<https://api.github.com/repos/user/repo/issues?page=2>; rel="next", ' +
                  '<https://api.github.com/repos/user/repo/issues?page=5>; rel="last"';
    
    const result = parseLinkHeader(header);
    
    expect(result).toBeFalsy();
  });
});