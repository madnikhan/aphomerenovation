"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Mail, Phone, MapPin, Plus, LogOut, FileText, TrendingUp, User, ArrowLeft } from "lucide-react";
import { getClients, getQuotes, type Client, type Quote } from "@/lib/firebase-quotes";
import Link from "next/link";
import { useAppManifest } from "@/hooks/useAppManifest";

export default function ClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clientQuotes, setClientQuotes] = useState<Quote[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load app manifest for PWA
  useAppManifest();

  useEffect(() => {
    // Check authentication via API
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check");
        const data = await response.json();
        
        if (data.authenticated) {
          setIsAuthenticated(true);
          loadData();
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

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [allClients, allQuotes] = await Promise.all([
        getClients(),
        getQuotes(),
      ]);
      setClients(allClients);
      setFilteredClients(allClients);
      setQuotes(allQuotes);
      
      // Calculate client statistics
      const clientsWithStats = allClients.map((client) => {
        const clientQuotes = allQuotes.filter((q) => q.customer.email === client.email);
        const acceptedQuotes = clientQuotes.filter((q) => q.status === "accepted");
        const totalValue = clientQuotes.reduce((sum, q) => sum + q.total, 0);
        
        return {
          ...client,
          totalQuotes: clientQuotes.length,
          acceptedQuotes: acceptedQuotes.length,
          totalValue,
        };
      });
      
      setClients(clientsWithStats);
      setFilteredClients(clientsWithStats);
    } catch (error) {
      console.error("Error loading data:", error);
      alert("Failed to load clients. Please check your Firebase configuration.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let filtered = clients;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (client) =>
          client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredClients(filtered);
  }, [searchTerm, clients]);

  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    const clientQuotesList = quotes.filter((q) => q.customer.email === client.email);
    setClientQuotes(clientQuotesList);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout error:", error);
    }
    router.push("/quote-builder");
  };

  const totalClients = clients.length;
  const totalQuotes = quotes.length;
  const totalValue = quotes.reduce((sum, q) => sum + q.total, 0);
  const averageQuotesPerClient = totalClients > 0 ? (totalQuotes / totalClients).toFixed(1) : "0";

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

  if (selectedClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => setSelectedClient(null)}
            className="mb-6 flex items-center text-[#202845] hover:text-[#1a1f36] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Clients
          </button>

          {/* Client Details */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedClient.name}</h1>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {selectedClient.email}
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {selectedClient.phone}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {selectedClient.address}, {selectedClient.postcode}
                  </div>
                </div>
              </div>
              <Link
                href={`/quote-builder?client=${encodeURIComponent(selectedClient.email)}`}
                className="mt-4 md:mt-0 flex items-center space-x-2 px-6 py-3 bg-[#202845] text-white rounded-lg hover:bg-[#1a1f36] transition-colors shadow-md hover:shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span>Create New Quote</span>
              </Link>
            </div>

            {/* Client Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Total Quotes</div>
                <div className="text-2xl font-bold text-gray-900">{clientQuotes.length}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Accepted</div>
                <div className="text-2xl font-bold text-green-600">
                  {clientQuotes.filter((q) => q.status === "accepted").length}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Total Value</div>
                <div className="text-2xl font-bold text-gray-900">
                  £{clientQuotes.reduce((sum, q) => sum + q.total, 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600 mb-1">Conversion Rate</div>
                <div className="text-2xl font-bold text-blue-600">
                  {clientQuotes.length > 0
                    ? ((clientQuotes.filter((q) => q.status === "accepted").length / clientQuotes.length) * 100).toFixed(0)
                    : 0}%
                </div>
              </div>
            </div>

            {/* Client Quotes */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quote History</h2>
              {clientQuotes.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No quotes found for this client.
                </div>
              ) : (
                <div className="space-y-3">
                  {clientQuotes
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((quote) => (
                      <Link
                        key={quote.id}
                        href="/quotes"
                        className="block bg-gray-50 hover:bg-gray-100 rounded-lg p-4 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-semibold text-gray-900">{quote.quoteNumber}</div>
                            <div className="text-sm text-gray-600">
                              {new Date(quote.date).toLocaleDateString("en-GB")} • £{quote.total.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              quote.status === "accepted"
                                ? "bg-green-100 text-green-800"
                                : quote.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : quote.status === "sent"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                          </span>
                        </div>
                      </Link>
                    ))}
                </div>
              )}
            </div>
          </div>
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
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Client Management</h1>
              <p className="text-gray-600">Manage and track all your customers</p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Link
                href="/quote-builder"
                className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-3 bg-[#202845] text-white rounded-lg hover:bg-[#1a1f36] transition-colors shadow-md hover:shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span>New Quote</span>
              </Link>
              <Link
                href="/quotes"
                className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-3 bg-white border-2 border-[#202845] text-[#202845] rounded-lg hover:bg-[#202845] hover:text-white transition-colors shadow-md hover:shadow-lg"
              >
                <FileText className="w-5 h-5" />
                <span>View Quotes</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>

          {/* Summary Stats */}
          {!isLoading && clients.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#202845]">
                <div className="text-sm font-medium text-gray-600 mb-1">Total Clients</div>
                <div className="text-3xl font-bold text-gray-900">{totalClients}</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                <div className="text-sm font-medium text-gray-600 mb-1">Total Quotes</div>
                <div className="text-3xl font-bold text-gray-900">{totalQuotes}</div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                <div className="text-sm font-medium text-gray-600 mb-1">Total Value</div>
                <div className="text-3xl font-bold text-gray-900">
                  £{totalValue.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
                <div className="text-sm font-medium text-gray-600 mb-1">Avg Quotes/Client</div>
                <div className="text-3xl font-bold text-gray-900">{averageQuotesPerClient}</div>
              </div>
            </div>
          )}
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, phone, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845] focus:border-[#202845] transition-colors"
            />
          </div>
        </div>

        {/* Clients List */}
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#202845] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading clients...</p>
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-gray-400 mb-4">
              <User className="w-16 h-16 mx-auto opacity-50" />
            </div>
            <p className="text-xl font-medium text-gray-900 mb-2">No clients found</p>
            <p className="text-gray-600 mb-6">
              {searchTerm ? "Try adjusting your search" : "Clients will appear here when you create quotes"}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                onClick={() => handleViewClient(client)}
                className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#202845] hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{client.name}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{client.email}</span>
                      </div>
                      {client.phone && (
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>{client.phone}</span>
                        </div>
                      )}
                      {client.address && (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span className="truncate">{client.address}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{client.totalQuotes || 0}</div>
                    <div className="text-xs text-gray-500">Quotes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{client.acceptedQuotes || 0}</div>
                    <div className="text-xs text-gray-500">Accepted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-[#202845]">
                      £{((client.totalValue || 0) / 1000).toFixed(1)}k
                    </div>
                    <div className="text-xs text-gray-500">Value</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

