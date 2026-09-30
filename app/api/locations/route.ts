import { NextResponse } from 'next/server';
import { City, Country } from 'country-state-city';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  const query = q.toLowerCase();
  const allCities = City.getAllCities();
  
  const results = [];
  
  // First pass: exact startsWith matches (faster and more relevant)
  for (const city of allCities) {
    if (city.name.toLowerCase().startsWith(query)) {
      results.push(city);
      if (results.length >= 8) break;
    }
  }
  
  // Second pass if we need more results: includes matches
  if (results.length < 8) {
    for (const city of allCities) {
      if (city.name.toLowerCase().includes(query) && !results.find(r => r.name === city.name && r.countryCode === city.countryCode)) {
        results.push(city);
        if (results.length >= 8) break;
      }
    }
  }

  // Format with full country names
  const formatted = results.map(city => {
    const country = Country.getCountryByCode(city.countryCode)?.name || city.countryCode;
    // We don't always need the state if we have the country, but it's good for US/Canada.
    // We'll format it simply as "City, StateCode, Country"
    return `${city.name}, ${city.stateCode}, ${country}`;
  });

  return NextResponse.json({ results: formatted });
}
