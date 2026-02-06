"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Clock, Trash2, Eye, X, Reply, CheckCircle, Loader2 } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { useMessages } from "@/hooks/useMessages";
import toast, { Toaster } from "react-hot-toast";

export default function MessagesPage() {
  const { messages, loading, markAsRead, markAsUnread, deleteMessage, refetch } = useMessages();
  const [selectedMessage, setSelectedMessage] = useState<typeof messages[0] | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const filteredMessages = messages.filter((msg) => {
    if (filter === "unread") return !msg.read;
    if (filter === "read") return msg.read;
    return true;
  });

  const unreadCount = messages.filter((m) => !m.read).length;

  const openMessage = async (message: typeof messages[0]) => {
    setSelectedMessage(message);
    if (!message.read) {
      await markAsRead(message.id);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      await deleteMessage(id);
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  const handleMarkAsUnread = async (id: string) => {
    await markAsUnread(id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Messages</h1>
          <p className="text-gray-400">
            Contact form submissions ({unreadCount} unread)
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {[
          { id: "all", label: "All Messages" },
          { id: "unread", label: `Unread (${unreadCount})` },
          { id: "read", label: "Read" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as typeof filter)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === f.id
                ? "bg-primary/20 text-primary border border-primary/30"
                : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-transparent"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-2 space-y-2">
          {loading ? (
            <div className="text-center py-12 text-gray-500">
              <Loader2 className="w-8 h-8 mx-auto mb-3 animate-spin text-primary" />
              <p>Loading messages...</p>
            </div>
          ) : (
            filteredMessages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => openMessage(message)}
                className={`w-full text-left p-4 rounded-xl transition-all ${
                  selectedMessage?.id === message.id
                    ? "bg-primary/20 border border-primary/30"
                    : "bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05]"
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Status indicator */}
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    message.read ? "bg-gray-600" : "bg-primary"
                  }`} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`font-medium truncate ${
                        message.read ? "text-gray-400" : "text-white"
                      }`}>
                        {message.name}
                      </span>
                      <span className="text-xs text-gray-500 flex-shrink-0">
                        {formatDate(message.createdAt)}
                      </span>
                    </div>
                    <p className={`text-sm truncate ${
                      message.read ? "text-gray-500" : "text-gray-300"
                    }`}>
                      {message.subject}
                    </p>
                    <p className="text-xs text-gray-600 truncate mt-1">
                      {message.message}
                    </p>
                  </div>
                </div>
              </button>
            </motion.div>
          ))
          )}

          {!loading && filteredMessages.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Mail className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No messages found</p>
            </div>
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {selectedMessage ? (
              <motion.div
                key={selectedMessage.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <GlassCard>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6 pb-4 border-b border-white/10">
                    <div>
                      <h2 className="text-xl font-heading font-semibold text-white">
                        {selectedMessage.subject}
                      </h2>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Mail size={14} />
                          {selectedMessage.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {formatDate(selectedMessage.createdAt)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedMessage(null)}
                      className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Sender */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                      {selectedMessage.name[0]}
                    </div>
                    <div>
                      <p className="font-medium text-white">{selectedMessage.name}</p>
                      <p className="text-sm text-gray-500">{selectedMessage.email}</p>
                    </div>
                  </div>

                  {/* Message Body */}
                  <div className="bg-white/5 rounded-xl p-4 mb-6">
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <Button
                      variant="primary"
                      leftIcon={<Reply size={18} />}
                      onClick={() => window.open(`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`)}
                    >
                      Reply
                    </Button>
                    <Button
                      variant="secondary"
                      leftIcon={<Eye size={18} />}
                      onClick={() => handleMarkAsUnread(selectedMessage.id)}
                    >
                      Mark Unread
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-red-400 hover:bg-red-500/10"
                      leftIcon={<Trash2 size={18} />}
                      onClick={() => handleDeleteMessage(selectedMessage.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex items-center justify-center"
              >
                <div className="text-center text-gray-500">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 opacity-30" />
                  <p className="text-lg">Select a message to view</p>
                  <p className="text-sm">Click on a message from the list</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
