"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Eye,
  Mail,
  Briefcase,
  FolderOpen,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const stats = [
  {
    title: "Total Visitors",
    value: "12,543",
    change: "+12.5%",
    trend: "up",
    icon: Eye,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Active Projects",
    value: "24",
    change: "+3",
    trend: "up",
    icon: FolderOpen,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Services",
    value: "6",
    change: "0",
    trend: "neutral",
    icon: Briefcase,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "Messages",
    value: "18",
    change: "+5",
    trend: "up",
    icon: Mail,
    gradient: "from-green-500 to-emerald-500",
  },
];

const recentActivity = [
  {
    action: "New contact message received",
    time: "5 minutes ago",
    type: "message",
  },
  {
    action: "Portfolio item updated: E-Commerce Platform",
    time: "2 hours ago",
    type: "update",
  },
  {
    action: "New testimonial added",
    time: "Yesterday",
    type: "add",
  },
  {
    action: "Service description modified",
    time: "2 days ago",
    type: "update",
  },
  {
    action: "Site settings updated",
    time: "3 days ago",
    type: "settings",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-white">Dashboard</h1>
        <p className="text-gray-400">
          Welcome back! Here&apos;s an overview of your website.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-400">{stat.title}</p>
                  <p className="text-3xl font-heading font-bold text-white mt-1">
                    {stat.value}
                  </p>
                  <div
                    className={`flex items-center gap-1 mt-2 text-sm ${
                      stat.trend === "up"
                        ? "text-green-400"
                        : stat.trend === "down"
                        ? "text-red-400"
                        : "text-gray-400"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRight size={16} />
                    ) : stat.trend === "down" ? (
                      <ArrowDownRight size={16} />
                    ) : null}
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} bg-opacity-20`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Background gradient */}
              <div
                className={`absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full blur-2xl`}
              />
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <GlassCard>
            <h2 className="text-lg font-heading font-semibold text-white mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.type === "message"
                          ? "bg-green-500"
                          : activity.type === "update"
                          ? "bg-blue-500"
                          : activity.type === "add"
                          ? "bg-purple-500"
                          : "bg-gray-500"
                      }`}
                    />
                    <span className="text-gray-300">{activity.action}</span>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard>
            <h2 className="text-lg font-heading font-semibold text-white mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              {[
                { label: "Add New Project", href: "/admin/portfolio/new", icon: FolderOpen },
                { label: "Manage Services", href: "/admin/services", icon: Briefcase },
                { label: "View Messages", href: "/admin/messages", icon: Mail },
                { label: "Site Settings", href: "/admin/settings", icon: TrendingUp },
              ].map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all group"
                >
                  <action.icon size={18} className="text-primary" />
                  <span>{action.label}</span>
                  <ArrowUpRight
                    size={14}
                    className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              ))}
            </div>
          </GlassCard>

          {/* Website Status */}
          <GlassCard className="mt-4">
            <h2 className="text-lg font-heading font-semibold text-white mb-4">
              Website Status
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Status</span>
                <span className="flex items-center gap-2 text-green-400">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Last Updated</span>
                <span className="text-white">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Performance</span>
                <span className="text-green-400">98/100</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
