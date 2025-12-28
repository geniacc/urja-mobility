
import { categories } from './src/data/mockData.js';

console.log('Verifying mockData.js structure...');

const inverterBattery = categories.find(c => c.id === 'inverter-battery');
if (!inverterBattery) {
    console.error('Error: Inverter Battery category not found');
} else {
    console.log('Inverter Battery found.');
    inverterBattery.subcategories.forEach(sub => {
        console.log(`Subcategory: ${sub.title}`);
        sub.items.forEach(item => {
            if (item.image) {
                console.log(`  - ${item.title}: Image OK (${item.image})`);
            } else {
                console.warn(`  - ${item.title}: No image`);
            }
        });
    });
}

const inverter = categories.find(c => c.id === 'inverter');
if (!inverter) {
    console.error('Error: Inverter category not found');
} else {
    console.log('Inverter category found.');
}

console.log('Verification complete.');
