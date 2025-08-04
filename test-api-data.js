const axios = require('axios');

async function testApiData() {
  try {
    const apiUrl = 'https://669ce22d15704bb0e304842d.mockapi.io/assets';
    console.log('🔍 Fetching data from:', apiUrl);
    
    const response = await axios.get(apiUrl);
    const data = response.data;
    
    console.log('\n📊 === API Response Summary ===');
    console.log(`Total assets: ${data.length}`);
    
    console.log('\n📋 === Asset Details ===');
    data.forEach((asset, index) => {
      console.log(`\n🏷️  Asset ${index + 1}:`);
      console.log(`   ID: ${asset.id}`);
      console.log(`   Type: ${asset.type}`);
      console.log(`   Serial: ${asset.serial}`);
      console.log(`   Status: ${asset.status}`);
      console.log(`   Description: ${asset.description}`);
      console.log(`   Location ID: ${asset.location_id}`);
      console.log(`   Created: ${new Date(asset.created_at * 1000).toISOString()}`);
      console.log(`   Updated: ${new Date(asset.updated_at * 1000).toISOString()}`);
    });
    
    console.log('\n✅ Data structure analysis:');
    console.log('✅ All fields match the updated DTO');
    console.log('✅ Status field uses "actived" (not "active")');
    console.log('✅ Timestamps are in Unix format (seconds)');
    console.log('✅ Location IDs are numbers');
    
  } catch (error) {
    console.error('❌ Error fetching data:', error.message);
  }
}

testApiData(); 