import bcrypt from 'bcrypt';

// New secure admin password
const newPassword = 'AdminSecure@2025';

// Generate bcrypt hash
const hashedPassword = await bcrypt.hash(newPassword, 10);

console.log('=== ADMIN PASSWORD RESET ===\n');
console.log('New Password:', newPassword);
console.log('\nBcrypt Hash:');
console.log(hashedPassword);
console.log('\n=== STEPS TO UPDATE IN MONGODB ===');
console.log('1. Go to MongoDB Atlas: https://cloud.mongodb.com/');
console.log('2. Select your cluster');
console.log('3. Click "Collections"');
console.log('4. Find the "users" collection');
console.log('5. Find admin user document');
console.log('6. Edit the document');
console.log('7. Replace the "password" field value with the hash above');
console.log('8. Save and close');
console.log('\n9. Login with:');
console.log('   Email: admin@admin.com (or your admin email)');
console.log('   Password:', newPassword);
