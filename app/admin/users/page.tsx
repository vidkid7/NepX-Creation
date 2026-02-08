"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Shield, ShieldCheck, X, Save, Loader2 } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useUsers } from "@/hooks/useUsers";
import toast, { Toaster } from "react-hot-toast";

export default function UsersPage() {
  const { users, loading, createUser, updateUser, deleteUser } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "EDITOR" as "ADMIN" | "EDITOR",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setFormData({
      name: user.name || "",
      email: user.email,
      password: "",
      role: user.role,
    });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "EDITOR",
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!editingUser && !formData.password) {
      toast.error("Password is required for new users");
      return;
    }

    setIsSaving(true);
    try {
      if (editingUser) {
        const updateData: any = {
          name: formData.name,
          email: formData.email,
          role: formData.role,
        };
        if (formData.password) {
          updateData.password = formData.password;
        }
        await updateUser(editingUser.id, updateData);
      } else {
        await createUser(formData);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete user "${name}"?`)) {
      try {
        await deleteUser(id);
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Users</h1>
          <p className="text-gray-400">Manage admin users and permissions</p>
        </div>
        <Button onClick={handleAdd} leftIcon={<Plus size={18} />} disabled={loading}>
          Add User
        </Button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      )}

      {/* Users Table */}
      {!loading && (
        <GlassCard>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">User</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Role</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-gray-400">Created</th>
                  <th className="text-right py-4 px-4 text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-white/5 last:border-0"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold flex-shrink-0">
                            {(user.name || user.email)[0].toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-white truncate">{user.name || "N/A"}</p>
                            <p className="text-sm text-gray-500 truncate">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === "ADMIN"
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}>
                          {user.role === "ADMIN" ? (
                            <ShieldCheck size={12} />
                          ) : (
                            <Shield size={12} />
                          )}
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-400">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(user)}
                            className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id, user.name || user.email)}
                            className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                            disabled={users.length === 1}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md"
            >
              <GlassCard>
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-heading font-semibold text-white">
                    {editingUser ? "Edit User" : "Add New User"}
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Form */}
                <div className="space-y-4">
                  <Input
                    label="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                  />
                  <Input
                    label={editingUser ? "New Password (leave blank to keep)" : "Password"}
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                  />

                  {/* Role */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Role</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setFormData({ ...formData, role: "ADMIN" })}
                        className={`p-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                          formData.role === "ADMIN"
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                        }`}
                      >
                        <ShieldCheck size={16} />
                        Admin
                      </button>
                      <button
                        onClick={() => setFormData({ ...formData, role: "EDITOR" })}
                        className={`p-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
                          formData.role === "EDITOR"
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                            : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                        }`}
                      >
                        <Shield size={16} />
                        Editor
                      </button>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
                  <Button variant="secondary" onClick={() => setIsModalOpen(false)} disabled={isSaving}>
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSave} 
                    leftIcon={isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : (editingUser ? "Update User" : "Create User")}
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
