import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Grid, List } from 'lucide-react';
import { RootState } from '../store';
import { fetchServices, setFilters, setCurrentPage } from '../store/slices/servicesSlice';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ServiceCard from '../components/Services/ServiceCard';
import Pagination from '../components/UI/Pagination';

const ServicesPage: React.FC = () => {
  const dispatch = useDispatch();
  const { 
    services, 
    isLoading, 
    filters, 
    pagination 
  } = useSelector((state: RootState) => state.services);
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    dispatch(fetchServices() as any);
  }, [dispatch]);

  // Filter services based on current filters
  const filteredServices = services.filter(service => {
    const matchesCategory = filters.category === 'all' || service.category === filters.category;
    const matchesSearch = !filters.search || 
      service.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      service.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      service.tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Paginate filtered services
  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIndex = startIndex + pagination.itemsPerPage;
  const paginatedServices = filteredServices.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredServices.length / pagination.itemsPerPage);

  const handleSearchChange = (value: string) => {
    dispatch(setFilters({ search: value }));
  };

  const handleCategoryChange = (category: string) => {
    dispatch(setFilters({ category }));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading services..." />;
  }

  const categories = ['all', ...Array.from(new Set(services.map(s => s.category)))];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            Discover my comprehensive range of professional services designed to help 
            your business grow and succeed in the digital landscape.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search services..."
                value={filters.search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-4">
              <select
                value={filters.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : 
                     category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {paginatedServices.length} of {filteredServices.length} services
            {filters.search && ` for "${filters.search}"`}
            {filters.category !== 'all' && ` in ${filters.category}`}
          </p>
        </div>

        {/* Services Grid/List */}
        {paginatedServices.length > 0 ? (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8'
              : 'space-y-6 mb-8'
          }>
            {paginatedServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              No services found matching your criteria
            </div>
            <button
              onClick={() => {
                dispatch(setFilters({ search: '', category: 'all' }));
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default ServicesPage;