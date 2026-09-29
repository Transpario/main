import { test, expect } from '@playwright/test';

test.describe('Explore Page', () => {
  test('should load explore page and display results', async ({ page }) => {
    await page.goto('/explore');
    
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Explore Internships/);

    // Expect the heading to be visible
    const heading = page.getByRole('heading', { name: 'EXPLORE INTERNSHIPS' });
    await expect(heading).toBeVisible();

    // The search input should be visible
    const searchInput = page.getByPlaceholder('Search internships by role, company...');
    await expect(searchInput).toBeVisible();
  });
});
