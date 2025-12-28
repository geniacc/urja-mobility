
import { categories } from './src/data/mockData.js';

console.log('Verifying category structure...');

const solarApp = categories.find(c => c.id === 'solar-app');
if (solarApp) {
    console.log('Solar App Subcategories:', solarApp.subcategories.map(s => s.title));
    // Expected: Solar Street Light & Robots Battery, Home, Small Office, Industrial Power Cube, Industrial BESS
} else {
    console.error('Solar App category missing');
}

const inverterBattery = categories.find(c => c.id === 'inverter-battery');
if (inverterBattery) {
    console.log('Inverter Battery Subcategories:', inverterBattery.subcategories.map(s => s.title));
    // Expected: Standard Series (or whatever I put there)
} else {
    console.error('Inverter Battery category missing');
}

console.log('Verification done.');
