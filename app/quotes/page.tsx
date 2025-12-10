"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter, Eye, Edit, Trash2, Mail, Download, Plus, LogOut, TrendingUp, BarChart3, PieChart, Copy, FileDown, User } from "lucide-react";
import { getQuotes, deleteQuote, updateQuote, type Quote } from "@/lib/firebase-quotes";
import Link from "next/link";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

export default function QuotesPage() {
  const router = useRouter();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sendingEmailId, setSendingEmailId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(true);

  useEffect(() => {
    // Check authentication via API
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check");
        const data = await response.json();
        
        if (data.authenticated) {
          setIsAuthenticated(true);
          loadQuotes();
        } else {
          router.push("/quote-builder");
        }
      } catch (error) {
        console.error("Auth check error:", error);
        router.push("/quote-builder");
      }
    };
    
    if (typeof window !== "undefined") {
      checkAuth();
    }
  }, [router]);

  const loadQuotes = async () => {
    try {
      setIsLoading(true);
      const allQuotes = await getQuotes();
      setQuotes(allQuotes);
      setFilteredQuotes(allQuotes);
    } catch (error) {
      console.error("Error loading quotes:", error);
      alert("Failed to load quotes. Please check your Firebase configuration.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let filtered = quotes;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (quote) =>
          quote.quoteNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quote.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quote.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((quote) => quote.status === statusFilter);
    }

    setFilteredQuotes(filtered);
  }, [searchTerm, statusFilter, quotes]);

  const handleDelete = async (quoteId: string) => {
    if (!confirm("Are you sure you want to delete this quote?")) return;

    try {
      await deleteQuote(quoteId);
      setQuotes(quotes.filter((q) => q.id !== quoteId));
    } catch (error) {
      console.error("Error deleting quote:", error);
      alert("Failed to delete quote.");
    }
  };

  const handleStatusChange = async (quoteId: string, newStatus: Quote["status"]) => {
    try {
      await updateQuote(quoteId, { status: newStatus });
      setQuotes(
        quotes.map((q) => (q.id === quoteId ? { ...q, status: newStatus } : q))
      );
    } catch (error) {
      console.error("Error updating quote status:", error);
      alert("Failed to update quote status.");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout error:", error);
    }
    router.push("/quote-builder");
  };

  const handleDuplicateQuote = async (quote: Quote) => {
    try {
      // Navigate to quote builder with quote data
      const quoteData = encodeURIComponent(JSON.stringify({
        customer: quote.customer,
        services: quote.services,
        discount: quote.discount,
        discountType: quote.discountType,
        notes: quote.notes,
      }));
      router.push(`/quote-builder?duplicate=${quoteData}`);
    } catch (error) {
      console.error("Error duplicating quote:", error);
      alert("Failed to duplicate quote.");
    }
  };

  const handleExportCSV = () => {
    try {
      // Prepare CSV data
      const headers = [
        "Quote Number",
        "Date",
        "Valid Until",
        "Customer Name",
        "Customer Email",
        "Customer Phone",
        "Customer Address",
        "Customer Postcode",
        "Status",
        "Subtotal",
        "Discount",
        "Total",
        "Services Count",
        "Notes",
      ];

      const rows = filteredQuotes.map((quote) => {
        const servicesList = quote.services.map((s) => `${s.name} (${s.quantity}x)`).join("; ");
        return [
          quote.quoteNumber,
          quote.date,
          quote.validUntil,
          quote.customer.name,
          quote.customer.email,
          quote.customer.phone,
          quote.customer.address,
          quote.customer.postcode,
          quote.status,
          quote.subtotal.toFixed(2),
          quote.discount.toFixed(2),
          quote.total.toFixed(2),
          quote.services.length.toString(),
          quote.notes.replace(/,/g, ";").replace(/\n/g, " "),
        ];
      });

      // Create CSV content
      const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
      ].join("\n");

      // Create and download file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `quotes_export_${new Date().toISOString().split("T")[0]}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting CSV:", error);
      alert("Failed to export CSV.");
    }
  };

  const getStatusColor = (status: Quote["status"]) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "sent":
        return "bg-blue-100 text-blue-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "expired":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Calculate analytics from quotes
  const analytics = useMemo(() => {
    if (quotes.length === 0) {
      return {
        totalQuotes: 0,
        totalValue: 0,
        acceptedQuotes: 0,
        rejectedQuotes: 0,
        pendingQuotes: 0,
        conversionRate: 0,
        averageQuoteValue: 0,
        quotesByStatus: {},
        quotesByService: {},
        quotesByMonth: [],
      };
    }

    const totalValue = quotes.reduce((sum, q) => sum + q.total, 0);
    const acceptedQuotes = quotes.filter((q) => q.status === "accepted").length;
    const rejectedQuotes = quotes.filter((q) => q.status === "rejected").length;
    const pendingQuotes = quotes.filter((q) => q.status === "sent" || q.status === "draft").length;

    const quotesByStatus: Record<string, number> = {};
    quotes.forEach((q) => {
      quotesByStatus[q.status] = (quotesByStatus[q.status] || 0) + 1;
    });

    const quotesByService: Record<string, number> = {};
    quotes.forEach((q) => {
      if (q.services) {
        q.services.forEach((service: any) => {
          const serviceName = service.name.split(" - ")[0]; // Get main service name
          quotesByService[serviceName] = (quotesByService[serviceName] || 0) + 1;
        });
      }
    });

    // Group by month
    const quotesByMonthMap = new Map<string, { count: number; value: number; label: string }>();
    quotes.forEach((q) => {
      const date = new Date(q.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const monthLabel = date.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
      const existing = quotesByMonthMap.get(monthKey) || { count: 0, value: 0, label: monthLabel };
      quotesByMonthMap.set(monthKey, {
        count: existing.count + 1,
        value: existing.value + q.total,
        label: monthLabel,
      });
    });

    const quotesByMonth = Array.from(quotesByMonthMap.entries())
      .map(([month, data]) => ({ month, ...data }))
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-6); // Last 6 months

    return {
      totalQuotes: quotes.length,
      totalValue,
      acceptedQuotes,
      rejectedQuotes,
      pendingQuotes,
      conversionRate: quotes.length > 0 ? (acceptedQuotes / quotes.length) * 100 : 0,
      averageQuoteValue: quotes.length > 0 ? totalValue / quotes.length : 0,
      quotesByStatus,
      quotesByService,
      quotesByMonth,
    };
  }, [quotes]);

  // Chart colors
  const STATUS_COLORS = {
    draft: "#9CA3AF",
    sent: "#3B82F6",
    accepted: "#10B981",
    rejected: "#EF4444",
    expired: "#F59E0B",
  };

  // Prepare data for charts
  const statusChartData = Object.entries(analytics.quotesByStatus).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: count,
    color: STATUS_COLORS[status as keyof typeof STATUS_COLORS] || "#9CA3AF",
  }));

  const serviceChartData = Object.entries(analytics.quotesByService)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, count]) => ({
      name: name.length > 20 ? name.substring(0, 20) + "..." : name,
      count,
    }));

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#202845] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Quotes Management</h1>
              <p className="text-gray-600">View and manage all your customer quotes</p>
            </div>
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              <Link
                href="/quote-builder"
                className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-3 bg-[#202845] text-white rounded-lg hover:bg-[#1a1f36] transition-colors shadow-md hover:shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span>New Quote</span>
              </Link>
              <Link
                href="/clients"
                className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-3 bg-white border-2 border-[#202845] text-[#202845] rounded-lg hover:bg-[#202845] hover:text-white transition-colors shadow-md hover:shadow-lg"
              >
                <User className="w-5 h-5" />
                <span>Clients</span>
              </Link>
              {filteredQuotes.length > 0 && (
                <button
                  onClick={handleExportCSV}
                  className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-3 bg-white border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-colors shadow-md hover:shadow-lg"
                >
                  <FileDown className="w-5 h-5" />
                  <span>Export CSV</span>
                </button>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>

          {/* Summary Stats - Moved to top */}
          {!isLoading && quotes.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#202845]">
                <div className="text-sm font-medium text-gray-600 mb-1">Total Quotes</div>
                <div className="text-3xl font-bold text-gray-900">{quotes.length}</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                <div className="text-sm font-medium text-gray-600 mb-1">Total Value</div>
                <div className="text-3xl font-bold text-gray-900">
                  £{quotes.reduce((sum, q) => sum + q.total, 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                <div className="text-sm font-medium text-gray-600 mb-1">Accepted</div>
                <div className="text-3xl font-bold text-green-600">
                  {quotes.filter((q) => q.status === "accepted").length}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
                <div className="text-sm font-medium text-gray-600 mb-1">Pending</div>
                <div className="text-3xl font-bold text-yellow-600">
                  {quotes.filter((q) => q.status === "sent" || q.status === "draft").length}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Analytics Section */}
        {!isLoading && quotes.length > 0 && showAnalytics && (
          <div className="mb-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-[#202845]" />
                Analytics & Insights
              </h2>
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                {showAnalytics ? "Hide" : "Show"} Analytics
              </button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                <div className="text-sm font-medium text-gray-600 mb-1">Conversion Rate</div>
                <div className="text-3xl font-bold text-blue-600">
                  {analytics.conversionRate.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {analytics.acceptedQuotes} of {analytics.totalQuotes} quotes accepted
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                <div className="text-sm font-medium text-gray-600 mb-1">Average Quote Value</div>
                <div className="text-3xl font-bold text-green-600">
                  £{analytics.averageQuoteValue.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
                <div className="text-xs text-gray-500 mt-1">Per quote</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
                <div className="text-sm font-medium text-gray-600 mb-1">Rejected Quotes</div>
                <div className="text-3xl font-bold text-red-600">{analytics.rejectedQuotes}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {analytics.totalQuotes > 0 ? ((analytics.rejectedQuotes / analytics.totalQuotes) * 100).toFixed(1) : 0}% of total
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
                <div className="text-sm font-medium text-gray-600 mb-1">Pending Quotes</div>
                <div className="text-3xl font-bold text-yellow-600">{analytics.pendingQuotes}</div>
                <div className="text-xs text-gray-500 mt-1">Awaiting response</div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Status Distribution Pie Chart */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-[#202845]" />
                  Quotes by Status
                </h3>
                {statusChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={statusChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }: any) => {
                          if (!name || percent === undefined) return '';
                          return `${name}: ${(percent * 100).toFixed(0)}%`;
                        }}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statusChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-gray-500">
                    No data available
                  </div>
                )}
              </div>

              {/* Quotes & Revenue Over Time */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#202845]" />
                  Quotes & Revenue Trend (Last 6 Months)
                </h3>
                {analytics.quotesByMonth.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={analytics.quotesByMonth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="label" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip
                        formatter={(value: any, name: string) => {
                          if (name === "value") return `£${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                          return value;
                        }}
                      />
                      <Legend />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="count"
                        stroke="#3B82F6"
                        fill="#3B82F6"
                        fillOpacity={0.6}
                        name="Quotes"
                      />
                      <Area
                        yAxisId="right"
                        type="monotone"
                        dataKey="value"
                        stroke="#10B981"
                        fill="#10B981"
                        fillOpacity={0.6}
                        name="Revenue (£)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-gray-500">
                    No data available
                  </div>
                )}
              </div>

              {/* Monthly Revenue Bar Chart */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#202845]" />
                  Monthly Revenue
                </h3>
                {analytics.quotesByMonth.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analytics.quotesByMonth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="label" />
                      <YAxis />
                      <Tooltip
                        formatter={(value: any) => `£${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                      />
                      <Legend />
                      <Bar dataKey="value" fill="#202845" name="Revenue (£)" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-gray-500">
                    No data available
                  </div>
                )}
              </div>

              {/* Popular Services */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#202845]" />
                  Most Popular Services
                </h3>
                {serviceChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={serviceChartData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={120} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#202845" name="Number of Quotes" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-gray-500">
                    No service data available
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            {quotes.length > 0 && (
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="text-sm text-[#202845] hover:text-[#1a1f36] font-medium flex items-center gap-2"
              >
                {showAnalytics ? (
                  <>
                    <BarChart3 className="w-4 h-4" />
                    Hide Analytics
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-4 h-4" />
                    Show Analytics
                  </>
                )}
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by quote number, customer name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845] focus:border-[#202845] transition-colors"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845] focus:border-[#202845] transition-colors bg-white"
              >
                <option value="all">All Statuses</option>
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quotes List */}
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#202845] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading quotes...</p>
          </div>
        ) : filteredQuotes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto opacity-50" />
            </div>
            <p className="text-xl font-medium text-gray-900 mb-2">No quotes found</p>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== "all" 
                ? "Try adjusting your search or filters" 
                : "Get started by creating your first quote"}
            </p>
            <Link
              href="/quote-builder"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#202845] text-white rounded-lg hover:bg-[#1a1f36] transition-colors shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>Create Your First Quote</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gradient-to-r from-[#202845] to-[#1a1f36]">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                          Quote #
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                          Notes
                        </th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-white uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredQuotes.map((quote) => (
                      <tr key={quote.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-[#202845]">
                            {quote.quoteNumber}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {quote.customer.name}
                          </div>
                          <div className="text-sm text-gray-500">{quote.customer.email}</div>
                          {quote.customer.phone && (
                            <div className="text-xs text-gray-400">{quote.customer.phone}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(quote.date).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </div>
                          <div className="text-xs text-gray-500">
                            Valid until: {new Date(quote.validUntil).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-lg font-bold text-gray-900">
                            £{quote.total.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={quote.status}
                            onChange={(e) =>
                              handleStatusChange(quote.id!, e.target.value as Quote["status"])
                            }
                            className={`text-xs font-semibold px-4 py-2 rounded-full border-0 cursor-pointer transition-all ${getStatusColor(
                              quote.status
                            )} hover:opacity-80`}
                          >
                            <option value="draft">Draft</option>
                            <option value="sent">Sent</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                            <option value="expired">Expired</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <div className="max-w-xs">
                            {quote.internalNotes && (
                              <div className="text-xs text-gray-600 mb-1 truncate" title={quote.internalNotes}>
                                📝 {quote.internalNotes}
                              </div>
                            )}
                            {quote.reminderDate && new Date(quote.reminderDate) > new Date() && (
                              <div className="text-xs text-yellow-600">
                                ⏰ {new Date(quote.reminderDate).toLocaleDateString("en-GB")}
                              </div>
                            )}
                            {quote.reminderDate && new Date(quote.reminderDate) <= new Date() && (
                              <div className="text-xs text-red-600">
                                ⚠️ Overdue: {new Date(quote.reminderDate).toLocaleDateString("en-GB")}
                              </div>
                            )}
                            {!quote.internalNotes && !quote.reminderDate && (
                              <span className="text-xs text-gray-400">-</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => handleDuplicateQuote(quote)}
                              className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                              title="Duplicate Quote"
                            >
                              <Copy className="w-5 h-5" />
                            </button>
                            <a
                              href={`mailto:${quote.customer.email}?subject=Quote ${quote.quoteNumber} - AK Home Renovation`}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Email Customer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Mail className="w-5 h-5" />
                            </a>
                            <button
                              onClick={() => handleDelete(quote.id!)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Quote"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {filteredQuotes.map((quote) => (
                <div
                  key={quote.id}
                  className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#202845]"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-lg font-bold text-[#202845] mb-1">
                        {quote.quoteNumber}
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(quote.date).toLocaleDateString("en-GB")}
                      </div>
                    </div>
                    <select
                      value={quote.status}
                      onChange={(e) =>
                        handleStatusChange(quote.id!, e.target.value as Quote["status"])
                      }
                      className={`text-xs font-semibold px-3 py-1 rounded-full border-0 ${getStatusColor(
                        quote.status
                      )}`}
                    >
                      <option value="draft">Draft</option>
                      <option value="sent">Sent</option>
                      <option value="accepted">Accepted</option>
                      <option value="rejected">Rejected</option>
                      <option value="expired">Expired</option>
                    </select>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-base font-semibold text-gray-900 mb-1">
                      {quote.customer.name}
                    </div>
                    <div className="text-sm text-gray-600">{quote.customer.email}</div>
                    {quote.customer.phone && (
                      <div className="text-sm text-gray-500">{quote.customer.phone}</div>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Total</div>
                      <div className="text-2xl font-bold text-gray-900">
                        £{quote.total.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <a
                        href={`mailto:${quote.customer.email}?subject=Quote ${quote.quoteNumber} - AK Home Renovation`}
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        title="Email"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                      <button
                        onClick={() => handleDelete(quote.id!)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

