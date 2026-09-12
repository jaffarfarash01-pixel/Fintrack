/**
 * tips.js
 * Static saving tips data and render function.
 */

const TIPS_DATA = [
  {
    icon: '🍱',
    title: 'Cook Your Own Meals',
    text: 'Preparing food at home vs eating out daily can save ₹3,000–₹6,000/month. Batch-cook on weekends to save both time and money.',
  },
  {
    icon: '🚌',
    title: 'Use Public Transport',
    text: 'A monthly bus or metro pass is far cheaper than daily ride-sharing. Even cycling short distances cuts costs significantly.',
  },
  {
    icon: '📚',
    title: 'Buy Second-Hand Books',
    text: 'Use OLX, Facebook Marketplace, or connect with seniors at your college to get textbooks at 30–50% of MRP.',
  },
  {
    icon: '💳',
    title: 'Audit Subscriptions Monthly',
    text: 'Check all active subscriptions every month. Sharing OTT accounts with friends can cut individual costs to almost zero.',
  },
  {
    icon: '🎯',
    title: 'Follow the 50/30/20 Rule',
    text: 'Allocate 50% of income to needs, 30% to wants, and save at least 20% of your monthly allowance or stipend.',
  },
  
  {
    icon: '🛒',
    title: 'Shop With a List',
    text: 'Always make a shopping list before visiting a store or website. Impulse buying is the silent killer of student budgets.',
  },
  {
    icon: '🏷️',
    title: 'Use Student Discounts',
    text: 'Your student ID unlocks discounts on software, transport, food, and events. Always ask — most brands offer 10–50% off.',
  },
  {
    icon: '🤝',
    title: 'Split Fixed Costs',
    text: 'Share rent, Wi-Fi, and groceries with roommates or hostel friends. Splitting just three fixed costs can save ₹1,500/month.',
  },
];

function renderTips() {
  document.getElementById('tipsList').innerHTML = TIPS_DATA.map(t => `
    <div class="tip-card">
      <div class="tip-icon">${t.icon}</div>
      <div>
        <div class="tip-title">${t.title}</div>
        <div class="tip-text">${t.text}</div>
      </div>
    </div>
  `).join('');
}
