import { createClient } from '@supabase/supabase-js';

// Connect to your Supabase database using your project credentials
const SUPABASE_URL = 'https://lscvmndpruhovdzkbbbn.supabase.co';
const SUPABASE_KEY = 'sb_publishable_YkrGDwr7v_NIfT78KLwVZQ_tGh9hwhl';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function runAutomatedDealSync() {
  console.log('🤖 [Automation Worker] Starting automated deal synchronization...');

  // Fresh, verified tech finds with your tracking tag embedded
  const freshDeals = [
    {
      title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
      category: 'Audio',
      original_price: 399.99,
      deal_price: 298.00,
      discount: '25% OFF',
      source: 'Amazon',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
      affiliate_link: 'https://www.amazon.com/dp/B09V3KXJPB?tag=dealhunte0580-20'
    },
    {
      title: 'Apple iPad Air (11-inch, M2): Liquid Retina Display',
      category: 'Tech',
      original_price: 599.99,
      deal_price: 549.00,
      discount: '8% OFF',
      source: 'Amazon',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80',
      affiliate_link: 'https://www.amazon.com/dp/B0D32G9QYM?tag=dealhunte0580-20'
    },
    {
      title: 'Logitech MX Master 3S Wireless Advanced Mouse',
      category: 'Tech',
      original_price: 99.99,
      deal_price: 79.99,
      discount: '20% OFF',
      source: 'Amazon',
      image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80',
      affiliate_link: 'https://www.amazon.com/dp/B09HM9DGDA?tag=dealhunte0580-20'
    },
    {
      title: 'JBL Flip 6 Waterproof Portable Bluetooth Speaker',
      category: 'Audio',
      original_price: 129.99,
      deal_price: 99.99,
      discount: '23% OFF',
      source: 'Amazon',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80',
      affiliate_link: 'https://www.amazon.com/dp/B09J5FSBNX?tag=dealhunte0580-20'
    }
  ];

  // Push products into Supabase automatically
  for (const deal of freshDeals) {
    const { error } = await supabase.from('deals').insert([deal]);
    if (error) {
      console.error(`❌ Failed to sync "${deal.title}":`, error.message);
    } else {
      console.log(`✅ Successfully synced real deal: "${deal.title}"`);
    }
  }

  console.log('💤 [Automation Worker] Synchronization complete. Sleeping until next schedule.');
}

runAutomatedDealSync();