"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter, Eye, Trash2, Mail, Plus, LogOut, CheckCircle2, Clock, User, FileText } from "lucide-react";
import { getQuoteRequests, updateQuoteRequestStatus, deleteQuoteRequest, type QuoteRequest } from "@/lib/firebase-quotes";
import Link from "next/link";

export default function QuoteRequestsPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<QuoteRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<QuoteRequest | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check");
        const data = await response.json();
        
        if (data.authenticated) {
          setIsAuthenticated(true);
          loadRequests();
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

  const loadRequests = async () => {
    try {
      setIsLoading(true);
      console.log("Loading quote requests...");
      const allRequests = await getQuoteRequests();
      console.log("Quote requests loaded:", allRequests.length, allRequests);
      setRequests(allRequests);
      setFilteredRequests(allRequests);
      
      if (allRequests.length === 0) {
        console.warn("No quote requests found. Check Firebase Console to verify data exists.");
      }
    } catch (error: any) {
      console.error("Error loading quote requests:", error);
      const errorMessage = error?.message || "Unknown error";
      alert(`Failed to load quote requests: ${errorMessage}\n\nCheck:\n1. Firebase is configured\n2. You're logged in\n3. Firestore security rules allow reads\n4. Check browser console for details`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let filtered = requests;

    if (searchTerm) {
      filtered = filtered.filter(
        (req) =>
          req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          req.service.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((req) => req.status === statusFilter);
    }

    if (sourceFilter !== "all") {
      filtered = filtered.filter((req) => req.source === sourceFilter);
    }

    setFilteredRequests(filtered);
  }, [searchTerm, statusFilter, sourceFilter, requests]);

  const handleStatusChange = async (requestId: string, newStatus: QuoteRequest["status"]) => {
    try {
      await updateQuoteRequestStatus(requestId, newStatus);
      await loadRequests();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };

  const handleDelete = async (requestId: string) => {
    if (!confirm("Are you sure you want to delete this quote request?")) return;

    try {
      await deleteQuoteRequest(requestId);
      await loadRequests();
    } catch (error) {
      console.error("Error deleting request:", error);
      alert("Failed to delete quote request.");
    }
  };

  const handleConvertToQuote = (request: QuoteRequest) => {
    // Navigate to quote builder with pre-filled data
    const params = new URLSearchParams({
      name: request.name,
      email: request.email,
      phone: request.phone,
      address: request.address || "",
      postcode: request.postcode || "",
      notes: `Quote Request: ${request.service}\n\n${request.description}`,
    });
    router.push(`/quote-builder?${params.toString()}`);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout error:", error);
    }
    setIsAuthenticated(false);
    router.push("/quote-builder");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    new: "bg-blue-100 text-blue-800",
    contacted: "bg-yellow-100 text-yellow-800",
    quoted: "bg-purple-100 text-purple-800",
    converted: "bg-green-100 text-green-800",
    closed: "bg-gray-100 text-gray-800",
  };

  const sourceLabels: Record<string, string> = {
    contact: "Contact Form",
    booking: "Booking Form",
    other: "Other",
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quote Requests</h1>
            <p className="text-gray-600 mt-1">Customer quote requests from website forms</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/quote-builder"
              className="bg-[#202845] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#1a1f36] transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Quote
            </Link>
            <Link
              href="/quotes"
              className="bg-white border-2 border-[#202845] text-[#202845] px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              View Quotes
            </Link>
            <button
              onClick={handleLogout}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, email, or service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845] focus:border-transparent"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="quoted">Quoted</option>
                <option value="converted">Converted</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#202845] focus:border-transparent"
              >
                <option value="all">All Sources</option>
                <option value="contact">Contact Form</option>
                <option value="booking">Booking Form</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-blue-600">{requests.filter(r => r.status === "new").length}</div>
            <div className="text-sm text-gray-600">New Requests</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-yellow-600">{requests.filter(r => r.status === "contacted").length}</div>
            <div className="text-sm text-gray-600">Contacted</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-purple-600">{requests.filter(r => r.status === "quoted").length}</div>
            <div className="text-sm text-gray-600">Quoted</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-2xl font-bold text-green-600">{requests.filter(r => r.status === "converted").length}</div>
            <div className="text-sm text-gray-600">Converted</div>
          </div>
        </div>

        {/* Requests List */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading quote requests...</p>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Quote Requests Found</h3>
            <p className="text-gray-600">No quote requests match your filters.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{request.name}</div>
                        <div className="text-sm text-gray-500">{request.email}</div>
                        {request.phone && <div className="text-sm text-gray-500">{request.phone}</div>}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{request.service}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{request.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">{sourceLabels[request.source] || request.source}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={request.status}
                          onChange={(e) => handleStatusChange(request.id!, e.target.value as QuoteRequest["status"])}
                          className={`text-xs font-semibold px-2 py-1 rounded-full border-0 ${statusColors[request.status] || "bg-gray-100 text-gray-800"}`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="quoted">Quoted</option>
                          <option value="converted">Converted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(request.createdAt).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setSelectedRequest(request)}
                            className="text-[#202845] hover:text-[#1a1f36]"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleConvertToQuote(request)}
                            className="text-green-600 hover:text-green-800"
                            title="Convert to Quote"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(request.id!)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
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
        )}

        {/* Request Detail Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Quote Request Details</h2>
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Customer Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <p><span className="font-medium">Name:</span> {selectedRequest.name}</p>
                      <p><span className="font-medium">Email:</span> {selectedRequest.email}</p>
                      <p><span className="font-medium">Phone:</span> {selectedRequest.phone}</p>
                      {selectedRequest.address && <p><span className="font-medium">Address:</span> {selectedRequest.address}</p>}
                      {selectedRequest.postcode && <p><span className="font-medium">Postcode:</span> {selectedRequest.postcode}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Service Request</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium mb-2">{selectedRequest.service}</p>
                      <p className="text-gray-700">{selectedRequest.description}</p>
                    </div>
                  </div>
                  
                  {selectedRequest.preferredDate && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Preferred Date & Time</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p><span className="font-medium">Date:</span> {new Date(selectedRequest.preferredDate).toLocaleDateString("en-GB")}</p>
                        {selectedRequest.preferredTime && <p><span className="font-medium">Time:</span> {selectedRequest.preferredTime}</p>}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Request Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <p><span className="font-medium">Source:</span> {sourceLabels[selectedRequest.source] || selectedRequest.source}</p>
                      <p><span className="font-medium">Status:</span> 
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${statusColors[selectedRequest.status] || "bg-gray-100 text-gray-800"}`}>
                          {selectedRequest.status}
                        </span>
                      </p>
                      <p><span className="font-medium">Submitted:</span> {new Date(selectedRequest.createdAt).toLocaleString("en-GB")}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => {
                        handleConvertToQuote(selectedRequest);
                        setSelectedRequest(null);
                      }}
                      className="flex-1 bg-[#202845] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#1a1f36] transition-colors"
                    >
                      Convert to Quote
                    </button>
                    <a
                      href={`mailto:${selectedRequest.email}?subject=Re: Your Quote Request for ${selectedRequest.service}`}
                      className="flex-1 bg-white border-2 border-[#202845] text-[#202845] px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-center"
                    >
                      Send Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

