import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, UserCheck, UserX, Save, X } from 'lucide-react';
import { User } from '../data/users';
import { dataService } from '../data/dataService';
import { useAuth } from '../context/AuthContext';

function ManageUsers() {
  const { state } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [formData, setFormData] = useState<Partial<User>>({
    username: '',
    password: '',
    role: 'employee',
    name: '',
    email: '',
    isActive: true
  });

  // Load users on component mount
  useEffect(() => {
    setUsersList(dataService.getUsers());
  }, []);

  // Redirect if not authenticated or not admin
  if (!state.isAuthenticated || state.user?.role !== 'admin') {
    return (
      <div className="access-denied">
        <h2>Access Denied</h2>
        <p>You need admin privileges to access this page.</p>
      </div>
    );
  }

  const filteredUsers = usersList.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const resetForm = () => {
    setFormData({
      username: '',
      password: '',
      role: 'employee',
      name: '',
      email: '',
      isActive: true
    });
    setEditingUser(null);
  };

  const handleInputChange = (field: keyof User, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.username || !formData.email || (!editingUser && !formData.password)) {
      alert('Please fill in all required fields');
      return;
    }

    // Check if username already exists (when adding new user or changing username)
    const existingUser = usersList.find(u => 
      u.username === formData.username && (!editingUser || u.id !== editingUser.id)
    );
    if (existingUser) {
      alert('Username already exists. Please choose a different username.');
      return;
    }

    const newUser: User = {
      id: editingUser ? editingUser.id : Date.now().toString(),
      username: formData.username || '',
      password: formData.password || (editingUser?.password || ''),
      role: formData.role as 'admin' | 'employee' || 'employee',
      name: formData.name || '',
      email: formData.email || '',
      isActive: formData.isActive ?? true,
      createdAt: editingUser ? editingUser.createdAt : new Date().toISOString().split('T')[0],
      lastLogin: editingUser?.lastLogin
    };

    if (editingUser) {
      // Update existing user using data service
      dataService.updateUser(newUser);
      alert('User updated successfully!');
    } else {
      // Add new user using data service
      dataService.addUser(newUser);
      alert('User added successfully!');
    }

    // Refresh the users list
    setUsersList(dataService.getUsers());
    setShowAddForm(false);
    resetForm();
  };

  const handleDeleteUser = (userId: string) => {
    if (userId === state.user?.id) {
      alert("You cannot delete your own account.");
      return;
    }

    if (window.confirm('Are you sure you want to delete this user?')) {
      dataService.deleteUser(userId);
      setUsersList(dataService.getUsers());
      alert('User deleted successfully!');
    }
  };

  const handleEditUser = (user: User) => {
    setFormData({
      username: user.username,
      password: '', // Don't pre-fill password for security
      role: user.role,
      name: user.name,
      email: user.email,
      isActive: user.isActive
    });
    setEditingUser(user);
    setShowAddForm(true);
  };

  const handleToggleUserStatus = (userId: string, currentStatus: boolean) => {
    if (userId === state.user?.id) {
      alert("You cannot deactivate your own account.");
      return;
    }

    dataService.toggleUserStatus(userId);
    setUsersList(dataService.getUsers());
    alert(`User ${currentStatus ? 'deactivated' : 'activated'} successfully!`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="manage-users">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Manage Users</h1>
          <button
            className="btn btn-primary"
            onClick={() => setShowAddForm(true)}
          >
            <Plus size={20} />
            Add New User
          </button>
        </div>

        <div className="users-controls">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-box">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>
        </div>

        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td className="user-name">
                    <strong>{user.name}</strong>
                  </td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge ${user.role}`}>
                      {user.role.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                      {user.isActive ? (
                        <>
                          <UserCheck size={14} />
                          Active
                        </>
                      ) : (
                        <>
                          <UserX size={14} />
                          Inactive
                        </>
                      )}
                    </span>
                  </td>
                  <td>{formatDate(user.createdAt)}</td>
                  <td>{user.lastLogin ? formatDate(user.lastLogin) : 'Never'}</td>
                  <td className="user-actions">
                    <button
                      className="btn-icon btn-edit"
                      onClick={() => handleEditUser(user)}
                      title="Edit User"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className={`btn-icon ${user.isActive ? 'btn-deactivate' : 'btn-activate'}`}
                      onClick={() => handleToggleUserStatus(user.id, user.isActive)}
                      title={user.isActive ? 'Deactivate User' : 'Activate User'}
                    >
                      {user.isActive ? <UserX size={16} /> : <UserCheck size={16} />}
                    </button>
                    <button
                      className="btn-icon btn-delete"
                      onClick={() => handleDeleteUser(user.id)}
                      title="Delete User"
                      disabled={user.id === state.user?.id} // Can't delete yourself
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="no-users">
            <p>No users found matching your criteria.</p>
          </div>
        )}

        {(showAddForm || editingUser) && (
          <div className="modal-overlay">
            <div className="modal user-form-modal">
              <div className="modal-header">
                <h3>{editingUser ? 'Edit User' : 'Add New User'}</h3>
                <button
                  className="modal-close"
                  onClick={() => {
                    setShowAddForm(false);
                    resetForm();
                  }}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="modal-content">
                <form onSubmit={handleSubmit} className="user-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name || ''}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="username">Username *</label>
                      <input
                        type="text"
                        id="username"
                        value={formData.username || ''}
                        onChange={(e) => handleInputChange('username', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email || ''}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="role">Role *</label>
                      <select
                        id="role"
                        value={formData.role || 'employee'}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                        required
                      >
                        <option value="employee">Employee</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">
                      {editingUser ? 'New Password (leave blank to keep current)' : 'Password *'}
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={formData.password || ''}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required={!editingUser}
                      placeholder={editingUser ? 'Leave blank to keep current password' : 'Enter password'}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="isActive">
                      <input
                        type="checkbox"
                        id="isActive"
                        checked={formData.isActive ?? true}
                        onChange={(e) => handleInputChange('isActive', e.target.checked)}
                      />
                      Active User
                    </label>
                  </div>

                  <div className="modal-actions">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setShowAddForm(false);
                        resetForm();
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      <Save size={16} />
                      {editingUser ? 'Update User' : 'Add User'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageUsers;
