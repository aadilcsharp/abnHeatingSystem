import { User, users } from '../data/users';

// Function to add user and generate downloadable users.ts file
export const saveUserToFile = (newUser: Omit<User, 'id'>): User => {
  // Generate new ID
  const maxId = users.reduce((max, user) => Math.max(max, parseInt(user.id)), 0);
  const userWithId: User = {
    ...newUser,
    id: (maxId + 1).toString()
  };

  // Add to users array (this updates the in-memory array)
  users.push(userWithId);

  console.log(`✅ User added with ID: ${userWithId.id}`);
  console.log(`📊 Total users: ${users.length}`);

  // Generate and save updated file content
  generateAndSaveUsersFile();

  return userWithId;
};

// Function to generate the complete users.ts file content
export const generateUsersFileContent = (): string => {
  const fileHeader = `export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'employee' | 'customer';
  name: string;
  email: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
  phone?: string;
  address?: string;
}

export const users: User[] = [`;

  const usersContent = users.map(user => `  {
    id: "${user.id}",
    username: "${user.username}",
    password: "${user.password}", // In production, this should be hashed
    role: "${user.role}",
    name: "${user.name}",
    email: "${user.email}",
    isActive: ${user.isActive},
    createdAt: "${user.createdAt}",
    lastLogin: ${user.lastLogin ? `"${user.lastLogin}"` : 'undefined'}${user.phone ? `,
    phone: "${user.phone}"` : ''}${user.address ? `,
    address: "${user.address}"` : ''}
  }`).join(',\n');

  return `${fileHeader}
${usersContent}
];

// Helper functions for user management
export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const getUserByUsername = (username: string): User | undefined => {
  return users.find(user => user.username === username);
};

export const getUsersByRole = (role: User['role']): User[] => {
  return users.filter(user => user.role === role);
};

export const getActiveUsers = (): User[] => {
  return users.filter(user => user.isActive);
};
`;
};

// Function to generate and provide downloadable file
export const generateAndSaveUsersFile = (): void => {
  const content = generateUsersFileContent();
  
  // Save to localStorage for easy access
  localStorage.setItem('eshop-updated-users-file', content);
  
  console.log('\n🔄 USERS.TS FILE UPDATED!');
  console.log('═'.repeat(60));
  console.log('📁 The updated users.ts content is ready!');
  console.log('📋 You can:');
  console.log('   1. Call downloadUsersFile() to download the updated file');
  console.log('   2. Call copyUsersFileContent() to copy content to clipboard');
  console.log('   3. Replace your current users.ts with the downloaded content');
  console.log('═'.repeat(60));
  
  // Make download function available
  if (typeof window !== 'undefined') {
    (window as any).downloadUsersFile = () => {
      const blob = new Blob([content], { type: 'text/typescript' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'users.ts';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      console.log('📁 Downloaded users.ts file with all current users!');
    };
    
    (window as any).copyUsersFileContent = () => {
      navigator.clipboard.writeText(content).then(() => {
        console.log('📋 Users.ts content copied to clipboard!');
      }).catch(() => {
        console.log('Content ready to copy:', content);
      });
    };
  }
};

// Function to show current users status
export const showUsersStatus = (): void => {
  console.group('👥 USERS STATUS');
  console.log(`Total users: ${users.length}`);
  console.log(`Customers: ${users.filter(u => u.role === 'customer').length}`);
  console.log(`Admins: ${users.filter(u => u.role === 'admin').length}`);
  console.log(`Employees: ${users.filter(u => u.role === 'employee').length}`);
  console.log(`Active users: ${users.filter(u => u.isActive).length}`);
  console.groupEnd();
};

// Make functions globally available
if (typeof window !== 'undefined') {
  (window as any).saveUserToFile = saveUserToFile;
  (window as any).generateUsersFileContent = generateUsersFileContent;
  (window as any).showUsersStatus = showUsersStatus;
  (window as any).generateAndSaveUsersFile = generateAndSaveUsersFile;
}
