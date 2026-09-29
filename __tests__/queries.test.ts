import { buildFilteredProgramsQuery } from '../lib/sanity/queries';

describe('buildFilteredProgramsQuery', () => {
  it('should build a base query with no filters', () => {
    const { query, params } = buildFilteredProgramsQuery({}, '', 'recent_review');
    expect(query).toContain('*[_type == "internshipProgram" && publicationStatus == \'published\' && founderApproved == true]');
    expect(query).toContain('order(lastReviewed desc)');
    expect(params).toEqual({});
  });

  it('should include search query', () => {
    const { query, params } = buildFilteredProgramsQuery({}, 'developer', 'recent_review');
    expect(query).toContain('name match $search');
    expect(params.search).toBe('*developer*');
  });

  it('should include array filters', () => {
    const { query, params } = buildFilteredProgramsQuery({ domain: ['Engineering'] }, '', 'recent_review');
    expect(query).toContain('count((domain[])[@ in $domain]) > 0');
    expect(params.domain).toEqual(['Engineering']);
  });

  it('should format alphabetical sort correctly', () => {
    const { query } = buildFilteredProgramsQuery({}, '', 'alphabetical');
    expect(query).toContain('order(name asc)');
  });
});
